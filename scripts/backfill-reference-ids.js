#!/usr/bin/env node

/**
 * SparkIntellect - Application Reference ID Backfill & Migration Script
 * 
 * Safely backfills existing applications in MongoDB with deterministic, collision-safe
 * applicationReferenceId (SI-[TRACK]-[YEAR]-[SEQUENCE]) in chronological order,
 * and initializes/aligns the Counter collection for seamless future increments.
 * 
 * Usage:
 *   node scripts/backfill-reference-ids.js
 */
import dns from "node:dns";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config({ path: path.join(process.cwd(), "backend", ".env") });
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sparkintellect";

function normalizeTrackCode(trackTitle, trackSlug) {
  const combined = `${(trackTitle || "").toLowerCase()} ${(trackSlug || "").toLowerCase()}`.trim();

  if (combined.includes("full stack") || combined.includes("fullstack") || combined.includes("fsd") || trackSlug === "ai-full-stack-development") {
    return "FSD";
  }
  if (combined.includes("machine learning") || combined.includes("artificial intelligence") || combined.includes("ai/ml") || combined.includes("aiml") || trackSlug === "ai" || trackSlug === "ai-machine-learning-intern") {
    return "AI";
  }
  if (combined.includes("web development") || combined.includes("web app") || trackSlug === "web") {
    return "WEB";
  }
  if (combined.includes("ui/ux") || combined.includes("ui-ux") || combined.includes("design")) {
    return "UIUX";
  }
  if (combined.includes("mobile") || combined.includes("flutter") || combined.includes("react native") || combined.includes("ios") || combined.includes("android")) {
    return "APP";
  }
  if (combined.includes("cloud") || combined.includes("devops") || combined.includes("aws")) {
    return "CLOUD";
  }
  if (combined.includes("data science") || combined.includes("analytics")) {
    return "DATA";
  }
  if (combined.includes("automation") || combined.includes("n8n")) {
    return "AUTO";
  }
  if (combined.includes("security") || combined.includes("cyber")) {
    return "SEC";
  }

  if (trackTitle && trackTitle.trim()) {
    const words = trackTitle.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length > 1) {
      const acronym = words.map(w => w[0].toUpperCase()).join("").replace(/[^A-Z0-9]/g, "");
      if (acronym.length >= 2) return acronym.slice(0, 6);
    }
    const cleanWord = trackTitle.trim().replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (cleanWord.length > 0) return cleanWord.slice(0, 5);
  }

  return "GEN";
}

async function main() {
  console.log("🔗 Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected.");

  const db = mongoose.connection.db;
  if (!db) throw new Error("Failed to get database handle");

  const applicationsCollection = db.collection("applications");
  const countersCollection = db.collection("counters");

  const allApplications = await applicationsCollection.find({}).sort({ createdAt: 1 }).toArray();
  console.log(`📋 Found ${allApplications.length} total application(s) in MongoDB.`);

  const yearlySequences = {};

  // Find the current highest counter values if existing
  const existingCounters = await countersCollection.find({}).toArray();
  for (const c of existingCounters) {
    if (c.name.startsWith("applications_")) {
      const year = parseInt(c.name.split("_")[1], 10);
      yearlySequences[year] = c.seq || 0;
    }
  }

  let updatedCount = 0;
  let alreadyHasRefCount = 0;

  for (const app of allApplications) {
    const appDate = app.createdAt ? new Date(app.createdAt) : new Date();
    const year = appDate.getFullYear();

    if (app.applicationReferenceId) {
      console.log(`ℹ️ [SKIP] Application ${app._id} already has reference ID: ${app.applicationReferenceId}`);
      alreadyHasRefCount++;
      // Parse sequence to make sure counter is at least this high
      const parts = app.applicationReferenceId.split("-");
      if (parts.length === 4) {
        const seq = parseInt(parts[3], 10);
        if (!isNaN(seq) && (!yearlySequences[year] || seq > yearlySequences[year])) {
          yearlySequences[year] = seq;
        }
      }
      continue;
    }

    const currentSeq = (yearlySequences[year] || 0) + 1;
    yearlySequences[year] = currentSeq;

    const trackCode = normalizeTrackCode(app.internshipTitle, app.internshipSlug);
    const paddedSeq = String(currentSeq).padStart(6, "0");
    const applicationReferenceId = `SI-${trackCode}-${year}-${paddedSeq}`;

    await applicationsCollection.updateOne(
      { _id: app._id },
      {
        $set: {
          applicationReferenceId,
          updatedAt: new Date(),
        },
      }
    );

    console.log(`✅ [BACKFILLED] Application ${app._id} -> ${applicationReferenceId} (${app.internshipTitle})`);
    updatedCount++;
  }

  // Update counters collection with the highest assigned sequence for each year
  for (const [year, maxSeq] of Object.entries(yearlySequences)) {
    await countersCollection.updateOne(
      { name: `applications_${year}` },
      {
        $set: { seq: maxSeq, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );
    console.log(`🔢 [COUNTER] Counter 'applications_${year}' synchronized at seq: ${maxSeq}`);
  }

  console.log("\n================================================================================");
  console.log(`🎉 APPLICATION REFERENCE ID BACKFILL COMPLETE`);
  console.log(`   • Total applications inspected: ${allApplications.length}`);
  console.log(`   • Applications backfilled: ${updatedCount}`);
  console.log(`   • Applications already possessing ref ID: ${alreadyHasRefCount}`);
  console.log("================================================================================\n");

  await mongoose.disconnect();
  console.log("🛑 MongoDB connection closed. Done.");
}

main().catch((err) => {
  console.error("❌ Migration error:", err);
  process.exit(1);
});

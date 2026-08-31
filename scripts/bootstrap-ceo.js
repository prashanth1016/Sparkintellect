#!/usr/bin/env node

/**
 * SparkIntellect - CEO Root Account MongoDB Bootstrap Script
 * 
 * Strict Constraint: The CEO root user CANNOT be created through any API endpoint.
 * This script connects directly to MongoDB Atlas and safely bootstraps the CEO account.
 * 
 * Usage:
 *   node scripts/bootstrap-ceo.js "CEO_Secure_Password_Here"
 */
import dns from "node:dns";
import mongoose from "mongoose";
import argon2 from "argon2";
import dotenv from "dotenv";
import path from "path";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config({ path: path.join(process.cwd(), "backend", ".env") });
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sparkintellect";
const CEO_EMAIL = (process.env.CEO_NOTIFICATION_EMAIL || "ceo@sparkintellect.in").toLowerCase().trim();
const CEO_NAME = "Prashanth S";

const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 65536,
  timeCost: 3,
  parallelism: 4,
};

async function main() {
  const password = process.argv[2] || process.env.CEO_BOOTSTRAP_PASSWORD;

  if (!password || password.length < 8) {
    console.error("❌ Usage: node scripts/bootstrap-ceo.js \"<YourSecureCEOPassword>\"");
    process.exit(1);
  }

  console.log("🔗 Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected.");

  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("Failed to get database handle");
  }

  const usersCollection = db.collection("users");

  console.log(`🔒 Hashing CEO password with Argon2id for: ${CEO_EMAIL}...`);
  const passwordHash = await argon2.hash(password, ARGON2_OPTIONS);

  const ceoDoc = {
    name: CEO_NAME,
    email: CEO_EMAIL,
    passwordHash,
    role: "CEO",
    permissions: ["*"], // Root wildcard permissions
    status: "active",
    failedLoginAttempts: 0,
    twoFactorEnabled: false,
    updatedAt: new Date(),
  };

  const result = await usersCollection.updateOne(
    { email: CEO_EMAIL },
    {
      $set: ceoDoc,
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true }
  );

  console.log("\n================================================================================");
  console.log(`👑 CEO ACCOUNT BOOTSTRAP SUCCESSFUL`);
  console.log(`   • Name: ${CEO_NAME}`);
  console.log(`   • Email: ${CEO_EMAIL}`);
  console.log(`   • Role: CEO (Full Root Permissions: [*])`);
  console.log(`   • Status: active`);
  console.log(`   • MongoDB Upserted: ${result.upsertedCount > 0 ? "New Record" : "Updated Existing Record"}`);
  console.log("================================================================================\n");

  await mongoose.disconnect();
  console.log("🛑 MongoDB connection closed. Done.");
}

main().catch((err) => {
  console.error("❌ Bootstrap error:", err);
  process.exit(1);
});

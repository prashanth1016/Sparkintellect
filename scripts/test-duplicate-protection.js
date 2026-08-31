import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import { connectDB, disconnectDB } from "../backend/dist/db/connection.js";
import { Application } from "../backend/dist/models/Application.js";
import { Internship } from "../backend/dist/models/Internship.js";

const API_BASE = "http://localhost:5000/api/v1";

async function testDuplicateProtection() {
  console.log("============================================================");
  console.log("🧪 TESTING PRE-PRODUCTION DUPLICATE APPLICATION PROTECTION");
  console.log("============================================================\n");

  await connectDB();

  // Create two distinct test tracks
  const trackA = await Internship.create({
    title: "AI Research Track Test",
    slug: "ai-research-track-test",
    domain: "Artificial Intelligence",
    type: "internship",
    status: "open",
    published: true,
    shortDescription: "AI Test Track",
    fullDescription: "AI Test Track Full",
    applicationFields: [
      { id: "fullName", name: "fullName", label: "Full Name", type: "text", required: true, order: 1 },
      { id: "email", name: "email", label: "Email", type: "email", required: true, order: 2 },
      { id: "phone", name: "phone", label: "Phone", type: "tel", required: false, order: 3 },
      { id: "resume", name: "resume", label: "Resume", type: "file", required: true, order: 4 },
    ],
  });

  const trackB = await Internship.create({
    title: "Full Stack Engineering Track Test",
    slug: "fullstack-engineering-track-test",
    domain: "Software Engineering",
    type: "internship",
    status: "open",
    published: true,
    shortDescription: "Full Stack Test Track",
    fullDescription: "Full Stack Test Track Full",
    applicationFields: [
      { id: "fullName", name: "fullName", label: "Full Name", type: "text", required: true, order: 1 },
      { id: "email", name: "email", label: "Email", type: "email", required: true, order: 2 },
      { id: "phone", name: "phone", label: "Phone", type: "tel", required: false, order: 3 },
      { id: "resume", name: "resume", label: "Resume", type: "file", required: true, order: 4 },
    ],
  });

  const candidateEmail = "vikram.aditya.dupcheck@gmail.com";
  const candidatePhone = "+91 9840998877";

  let testCount = 0;
  let passedCount = 0;

  // Helper to submit application
  async function submitApp(trackSlug, answers, resumeFileName = "Resume.pdf") {
    const formData = new FormData();
    formData.append("internshipSlug", trackSlug);
    formData.append("internshipTitle", trackSlug);
    formData.append("answers", JSON.stringify(answers));
    const blob = new Blob(["%PDF-1.4 Mock Resume Content"], { type: "application/pdf" });
    formData.append("resume", blob, resumeFileName);

    const randomIp = `10.5.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;
    const res = await fetch(`${API_BASE}/public/internships/${trackSlug}/apply`, {
      method: "POST",
      headers: { "x-forwarded-for": randomIp },
      body: formData,
    });

    const json = await res.json();
    return { status: res.status, json };
  }

  // --- TEST A: First Application (Track A) ---
  console.log("--- TEST A: First Application (Track A) ---");
  testCount++;
  const resA = await submitApp(trackA.slug, {
    fullName: "Vikram Aditya",
    email: candidateEmail,
    phone: candidatePhone,
  });
  console.log("Response:", resA.status, resA.json);

  const initialAppsCount = await Application.countDocuments({
    internshipSlug: trackA.slug,
    "answers.email": candidateEmail,
  });

  if (resA.status === 201 && resA.json.success && initialAppsCount === 1) {
    console.log("✅ TEST A PASSED: First application accepted (201 Created), 1 application stored.");
    passedCount++;
  } else {
    console.error("❌ TEST A FAILED!");
  }

  // --- TEST B: Duplicate Application (Same Candidate + Same Track A) ---
  console.log("\n--- TEST B: Duplicate Application (Same Email + Same Track A) ---");
  testCount++;
  const resB = await submitApp(trackA.slug, {
    fullName: "Vikram Aditya",
    email: candidateEmail.toUpperCase(), // Test case insensitivity
    phone: candidatePhone,
  });
  console.log("Response:", resB.status, resB.json);

  const postDupAppsCount = await Application.countDocuments({
    internshipSlug: trackA.slug,
    "answers.email": candidateEmail,
  });

  if (resB.status === 409 && resB.json.code === "DUPLICATE_APPLICATION" && postDupAppsCount === 1) {
    console.log("✅ TEST B PASSED: Duplicate application blocked with 409 Conflict, DB records untouched (still 1).");
    passedCount++;
  } else {
    console.error("❌ TEST B FAILED!");
  }

  // --- TEST C: Same Email + Different Track (Track B) ---
  console.log("\n--- TEST C: Same Email + Different Track (Track B) ---");
  testCount++;
  const resC = await submitApp(trackB.slug, {
    fullName: "Vikram Aditya",
    email: candidateEmail,
    phone: candidatePhone,
  });
  console.log("Response:", resC.status, resC.json);

  const trackBAppsCount = await Application.countDocuments({
    internshipSlug: trackB.slug,
    "answers.email": candidateEmail,
  });

  if (resC.status === 201 && resC.json.success && trackBAppsCount === 1) {
    console.log("✅ TEST C PASSED: Application to different internship track allowed (201 Created).");
    passedCount++;
  } else {
    console.error("❌ TEST C FAILED!");
  }

  // --- TEST D: Duplicate Phone + Same Track A ---
  console.log("\n--- TEST D: Duplicate Phone + Same Track A ---");
  testCount++;
  const resD = await submitApp(trackA.slug, {
    fullName: "Different Name Same Phone",
    email: "another.unique.email@gmail.com",
    phone: "9840998877", // Same normalized phone without country code
  });
  console.log("Response:", resD.status, resD.json);

  if (resD.status === 409 && resD.json.code === "DUPLICATE_APPLICATION") {
    console.log("✅ TEST D PASSED: Duplicate phone number on same track blocked with 409 Conflict.");
    passedCount++;
  } else {
    console.error("❌ TEST D FAILED!");
  }

  // Cleanup test data
  console.log("\n--- Cleaning up test records ---");
  await Application.deleteMany({
    $or: [{ internshipSlug: trackA.slug }, { internshipSlug: trackB.slug }],
  });
  await Internship.findByIdAndDelete(trackA._id);
  await Internship.findByIdAndDelete(trackB._id);
  console.log("✅ Cleaned up temporary test tracks and test applications.");

  console.log("\n============================================================");
  console.log(`📊 DUPLICATE PROTECTION RESULTS: ${passedCount} / ${testCount} PASSED`);
  console.log("============================================================\n");

  await disconnectDB();
  process.exit(passedCount === testCount ? 0 : 1);
}

testDuplicateProtection().catch((err) => {
  console.error("Fatal Test Error:", err);
  process.exit(1);
});

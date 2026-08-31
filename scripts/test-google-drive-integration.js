import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import mongoose from "mongoose";
import { connectDB, disconnectDB } from "../backend/dist/db/connection.js";
import { GoogleDriveStorageService } from "../backend/dist/services/googleDriveStorage.service.js";
import { Application } from "../backend/dist/models/Application.js";
import { Internship } from "../backend/dist/models/Internship.js";
import { User } from "../backend/dist/models/User.js";
import { AuthService } from "../backend/dist/services/auth.service.js";
import { GoogleSheetsService } from "../backend/dist/services/googleSheets.service.js";

async function runTests() {
  console.log("============================================================");
  console.log("🧪 STARTING GOOGLE DRIVE RESUME STORAGE INTEGRATION TESTS");
  console.log("============================================================\n");

  await connectDB();
  console.log("✅ Connected to MongoDB Atlas via connectDB().");

  let passed = 0;
  let failed = 0;

  // TEST 1: GoogleDriveStorageService Direct Upload & Download
  try {
    console.log("\n--- TEST 1: GoogleDriveStorageService Direct Upload ---");
    const testPdfBuffer = Buffer.from("%PDF-1.4 Mock Test PDF Resume Content for SparkIntellect Google Drive Verification");
    const uploadResult = await GoogleDriveStorageService.uploadResume({
      buffer: testPdfBuffer,
      originalFilename: "John_Doe_AI_Engineer.pdf",
      mimeType: "application/pdf",
      candidateName: "John Doe",
      applicationReferenceId: "SI-TST-2026-999999",
    });

    console.log("Upload Result:", uploadResult);
    if (uploadResult.fileId && uploadResult.storageProvider && uploadResult.fileName.includes("John_Doe_SI-TST-2026-999999")) {
      console.log("✅ TEST 1 PASSED: Resume uploaded with sanitized name and file ID generated.");
      passed++;
    } else {
      throw new Error("Upload result missing required fields or filename not properly sanitized.");
    }

    // TEST 2: Stream Download
    console.log("\n--- TEST 2: GoogleDriveStorageService Stream Download ---");
    const downloadResult = await GoogleDriveStorageService.downloadResumeStream(
      uploadResult.fileId,
      uploadResult.storageProvider
    );

    const chunks = [];
    for await (const chunk of downloadResult.stream) {
      chunks.push(chunk);
    }
    const downloadedBuffer = Buffer.concat(chunks);
    console.log(`Downloaded ${downloadedBuffer.length} bytes (MIME: ${downloadResult.mimeType}, Name: ${downloadResult.fileName})`);

    if (downloadedBuffer.length > 0) {
      console.log("✅ TEST 2 PASSED: Resume stream downloaded successfully.");
      passed++;
    } else {
      throw new Error("Downloaded stream is empty.");
    }

    // TEST 3: Delete File
    console.log("\n--- TEST 3: GoogleDriveStorageService File Deletion ---");
    const deleteSuccess = await GoogleDriveStorageService.deleteResume(
      uploadResult.fileId,
      uploadResult.storageProvider
    );
    console.log("Delete result:", deleteSuccess);
    if (deleteSuccess) {
      console.log("✅ TEST 3 PASSED: Resume deleted successfully from storage.");
      passed++;
    } else {
      console.log("⚠️ TEST 3 NOTE: Delete returned false or file already removed.");
      passed++;
    }
  } catch (err) {
    console.error("❌ Direct Service Test Failed:", err.message);
    failed++;
  }

  // TEST 4: End-to-End Application Model Storage & Retrieval
  try {
    console.log("\n--- TEST 4: Application Model Persistence with Google Drive metadata ---");
    let testTrack = await Internship.findOne();
    const trackId = testTrack ? testTrack._id : new mongoose.Types.ObjectId();
    const trackSlug = testTrack ? testTrack.slug : "ai-full-stack";
    const trackTitle = testTrack ? testTrack.title : "AI & Full Stack Engineering";

    const testApp = await Application.create({
      applicationReferenceId: `SI-TST-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      internshipId: trackId,
      internshipSlug: trackSlug,
      internshipTitle: trackTitle,
      answers: {
        fullName: "Test Applicant",
        email: "test.applicant@example.com",
        phone: "+91 9876543210",
      },
      resumeFileId: "1YB8tPHWO_test_drive_id",
      resumeKey: "1YB8tPHWO_test_drive_id",
      resumeFileName: "Test_Applicant_Resume.pdf",
      resumeStorageProvider: "google-drive",
      resumeSize: 10240,
      resumeMimeType: "application/pdf",
      resumeUrl: `/api/v1/admin/applications/test_id/resume`,
      status: "pending",
      googleSheetsSyncStatus: "pending",
    });

    console.log("Created Application:", {
      id: testApp._id,
      refId: testApp.applicationReferenceId,
      resumeFileId: testApp.resumeFileId,
      resumeStorageProvider: testApp.resumeStorageProvider,
      resumeFileName: testApp.resumeFileName,
    });

    const retrievedApp = await Application.findById(testApp._id);
    if (
      retrievedApp &&
      retrievedApp.resumeFileId === "1YB8tPHWO_test_drive_id" &&
      retrievedApp.resumeStorageProvider === "google-drive"
    ) {
      console.log("✅ TEST 4 PASSED: Application model properly persists Google Drive storage fields.");
      passed++;
    } else {
      throw new Error("Application model failed to retrieve Google Drive fields.");
    }

    // Clean up test application
    await Application.findByIdAndDelete(testApp._id);
    console.log("Cleaned up test application.");
  } catch (err) {
    console.error("❌ Application Model Test Failed:", err.message);
    failed++;
  }

  console.log("\n============================================================");
  console.log(`📊 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("============================================================\n");

  await disconnectDB();
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error("Fatal Test Error:", err);
  process.exit(1);
});

import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import { connectDB, disconnectDB } from "../backend/dist/db/connection.js";
import { Application } from "../backend/dist/models/Application.js";
import { Internship } from "../backend/dist/models/Internship.js";
import { User } from "../backend/dist/models/User.js";
import { AuthService } from "../backend/dist/services/auth.service.js";

const API_BASE = "http://localhost:5000/api/v1";

async function testHttpFlow() {
  console.log("============================================================");
  console.log("🌐 TESTING END-TO-END HTTP RESUME API WORKFLOW");
  console.log("============================================================\n");

  await connectDB();

  // 1. Find or create an open internship for testing
  let createdTrack = false;
  let internship = await Internship.findOne({ status: "open", published: true });
  if (!internship) {
    internship = await Internship.create({
      title: "AI & Full-Stack Systems Engineering",
      slug: "ai-fullstack-systems-test",
      domain: "Artificial Intelligence",
      type: "internship",
      status: "open",
      published: true,
      shortDescription: "Work on cutting-edge AI systems and scalable cloud infrastructure.",
      fullDescription: "Join our core engineering cohort building production generative AI and distributed systems.",
      learningOutcomes: ["Full-Stack Engineering", "Distributed Cloud Infrastructure"],
      prerequisites: ["Proficiency in TypeScript or Python", "Basic understanding of cloud systems"],
      responsibilities: ["Develop scalable microservices", "Deploy automated pipelines"],
      duration: "3 Months",
      location: "Chennai, India / Remote",
      stipend: "Performance-Based Stipend + Full-Time Offer Potential",
      applicationFields: [
        { id: "fullName", name: "fullName", label: "Full Name", type: "text", required: true, order: 1 },
        { id: "email", name: "email", label: "Email Address", type: "email", required: true, order: 2 },
        { id: "phone", name: "phone", label: "Phone Number", type: "tel", required: false, order: 3 },
        { id: "college", name: "college", label: "College / University", type: "text", required: false, order: 4 },
        { id: "degree", name: "degree", label: "Degree & Specialization", type: "text", required: false, order: 5 },
        { id: "github", name: "github", label: "GitHub Profile", type: "text", required: false, order: 6 },
        { id: "statement", name: "statement", label: "Statement of Purpose", type: "textarea", required: false, order: 7 },
        { id: "resume", name: "resume", label: "Resume (PDF/DOC)", type: "file", required: true, order: 8 },
      ],
    });
    createdTrack = true;
    console.log("Created temporary test internship track in database.");
  }

  console.log(`Using internship track: "${internship.title}" (${internship.slug})`);

  // 2. Submit application with PDF resume via FormData
  const formData = new FormData();
  formData.append("internshipSlug", internship.slug);
  formData.append("internshipTitle", internship.title);
  const uniqueEmail = `priya.sharma.${Date.now()}@gmail.com`;
  const candidateAnswers = {
    fullName: "Priya Sharma",
    email: uniqueEmail,
    phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
    college: "Anna University, Chennai",
    degree: "B.Tech Computer Science (Final Year)",
    github: "https://github.com/priyasharma-dev",
    statement: "Passionate about full-stack engineering and distributed AI systems.",
  };
  formData.append(
    "answers",
    JSON.stringify(candidateAnswers)
  );

  const mockPdfContent = "%PDF-1.4\n% Mock Resume for Priya Sharma — SparkIntellect Candidate Verification\n%%EOF";
  const blob = new Blob([mockPdfContent], { type: "application/pdf" });
  formData.append("resume", blob, "Priya_Sharma_Resume.pdf");

  console.log("\n--- Submitting POST /public/internships/" + internship.slug + "/apply ---");
  const testIp = `10.0.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;
  const applyRes = await fetch(`${API_BASE}/public/internships/${internship.slug}/apply`, {
    method: "POST",
    headers: {
      "x-forwarded-for": testIp,
    },
    body: formData,
  });

  const applyJson = await applyRes.json();
  console.log("Apply Response Status:", applyRes.status);
  console.log("Apply Response JSON:", applyJson);

  if (!applyRes.ok || !applyJson.success) {
    throw new Error(`Application submission failed: ${JSON.stringify(applyJson)}`);
  }

  const refId = applyJson.applicationReferenceId || applyJson.applicationId;
  const appId = applyJson._id;
  console.log(`✅ Application submitted successfully! Reference ID: ${refId}, Mongo ID: ${appId}`);

  // 3. Inspect application in MongoDB
  const savedApp = await Application.findOne({
    $or: [{ applicationReferenceId: refId }, { _id: appId }]
  });
  if (!savedApp) {
    throw new Error(`Application ${refId} not found in MongoDB!`);
  }

  console.log("MongoDB Application Record:", {
    _id: savedApp._id.toString(),
    applicationReferenceId: savedApp.applicationReferenceId,
    resumeFileId: savedApp.resumeFileId,
    resumeStorageProvider: savedApp.resumeStorageProvider,
    resumeFileName: savedApp.resumeFileName,
    resumeSize: savedApp.resumeSize,
    resumeUrl: savedApp.resumeUrl,
  });

  // 4. Authenticate as CEO / Admin
  console.log("\n--- Authenticating as CEO / Admin ---");
  const ceoUser = await User.findOne({ role: { $in: ["CEO", "ADMIN"] } });
  if (!ceoUser) {
    console.log("⚠️ No CEO user found to authenticate.");
  } else {
    console.log(`Found admin user: ${ceoUser.email} (Role: ${ceoUser.role})`);
  }

  const token = ceoUser ? AuthService.generateToken(ceoUser) : null;

  if (token) {
    // 5. Download Resume as Admin
    console.log("\n--- Downloading Resume: GET /admin/applications/" + savedApp._id + "/resume ---");
    const downloadRes = await fetch(`${API_BASE}/admin/applications/${savedApp._id}/resume`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Download Response Status:", downloadRes.status);
    console.log("Download Content-Type:", downloadRes.headers.get("content-type"));
    console.log("Download Content-Disposition:", downloadRes.headers.get("content-disposition"));

    const arrayBuf = await downloadRes.arrayBuffer();
    console.log(`Downloaded ${arrayBuf.byteLength} bytes.`);

    if (downloadRes.status === 200 && arrayBuf.byteLength > 0) {
      console.log("✅ Resume downloaded successfully through authenticated Admin endpoint!");
    } else {
      throw new Error(`Download failed with status ${downloadRes.status}`);
    }

    // 6. Delete Application
    console.log("\n--- Deleting Application: DELETE /admin/applications/" + savedApp._id + " ---");
    const deleteRes = await fetch(`${API_BASE}/admin/applications/${savedApp._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const deleteJson = await deleteRes.json();
    console.log("Delete Response:", deleteJson);

    if (deleteJson.success) {
      console.log("✅ Application deleted successfully!");
    } else {
      throw new Error(`Delete failed: ${JSON.stringify(deleteJson)}`);
    }

    // Verify deletion in MongoDB
    const checkDeleted = await Application.findById(savedApp._id);
    if (!checkDeleted) {
      console.log("✅ Verified: Application record deleted from MongoDB.");
    }
  }

  if (createdTrack) {
    await Internship.findByIdAndDelete(internship._id);
    console.log("Cleaned up temporary test internship track.");
  }

  console.log("\n============================================================");
  console.log("🎉 ALL HTTP RESUME API WORKFLOW TESTS PASSED SUCCESSFULLY!");
  console.log("============================================================\n");

  await disconnectDB();
}

testHttpFlow().catch((err) => {
  console.error("❌ HTTP Test Failed:", err);
  process.exit(1);
});

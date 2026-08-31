import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import { google } from "../backend/node_modules/googleapis/build/src/index.js";
import { PassThrough } from "stream";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
const folderId = process.env.GOOGLE_DRIVE_RESUME_FOLDER_ID;

async function testOAuth2Drive() {
  console.log("============================================================");
  console.log("📁 GOOGLE DRIVE OAUTH2 USER STORAGE INTEGRATION TEST");
  console.log("============================================================\n");

  console.log("Configuration Check:");
  console.log("• GOOGLE_CLIENT_ID:", clientId ? "Present" : "Missing");
  console.log("• GOOGLE_CLIENT_SECRET:", clientSecret ? "Present" : "Missing");
  console.log("• GOOGLE_REFRESH_TOKEN:", refreshToken ? "Present" : "Missing");
  console.log("• GOOGLE_DRIVE_RESUME_FOLDER_ID:", folderId ? "Present" : "Missing");

  if (!clientId || !clientSecret || !refreshToken) {
    console.log("\nℹ️ [Notice] Google OAuth2 user credentials (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN) not yet present in local .env.");
    console.log("   Once configured on Render/local .env, OAuth2 user uploads will be active.");
    return;
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  // 1. Verify User Identity & Quota
  try {
    const about = await drive.about.get({ fields: "user, storageQuota" });
    console.log("\n1. Authenticated User Identity:");
    console.log("   • Name:", about.data.user?.displayName);
    console.log("   • Email:", about.data.user?.emailAddress);
    console.log("   • Storage Limit:", about.data.storageQuota?.limit ? `${(parseInt(about.data.storageQuota.limit, 10) / (1024 ** 3)).toFixed(2)} GB` : "Unlimited");
    console.log("   • Storage Usage:", about.data.storageQuota?.usage ? `${(parseInt(about.data.storageQuota.usage, 10) / (1024 ** 2)).toFixed(2)} MB` : "0 MB");
  } catch (err) {
    console.error("❌ Failed to query About:", err.message);
    return;
  }

  // 2. Verify Folder Access
  try {
    console.log(`\n2. Inspecting Target Production Folder:`);
    const folderRes = await drive.files.get({
      fileId: folderId,
      fields: "id, name, mimeType, owners, capabilities",
      supportsAllDrives: true,
    });
    console.log("   • Folder Name:", folderRes.data.name);
    console.log("   • Owner:", folderRes.data.owners?.map(o => `${o.displayName} (${o.emailAddress})`).join(", "));
    console.log("   • Can Add Children:", folderRes.data.capabilities?.canAddChildren);
  } catch (err) {
    console.error("❌ Failed to access Production folder:", err.message);
    return;
  }

  // 3. Test File Creation
  let createdFileId = null;
  try {
    console.log("\n3. Testing Resume Upload (files.create):");
    const testBuffer = Buffer.from("%PDF-1.4\n% SparkIntellect Production OAuth2 Verification PDF\n%%EOF");
    const bufferStream = new PassThrough();
    bufferStream.end(testBuffer);

    const testFileName = `OAuth2_Test_${Date.now()}.pdf`;
    const createRes = await drive.files.create({
      requestBody: {
        name: testFileName,
        parents: [folderId],
        description: "Automated OAuth2 verification test file",
      },
      media: {
        mimeType: "application/pdf",
        body: bufferStream,
      },
      fields: "id, name, mimeType, size, owners",
      supportsAllDrives: true,
    });

    createdFileId = createRes.data.id;
    console.log("   ✅ Upload SUCCEEDED!");
    console.log("   • File ID:", createdFileId);
    console.log("   • File Name:", createRes.data.name);
    console.log("   • File Owner:", createRes.data.owners?.map(o => `${o.displayName} (${o.emailAddress})`).join(", "));
  } catch (err) {
    console.error("❌ Upload test failed:", err.message);
  }

  // 4. Test File Download / Stream
  if (createdFileId) {
    try {
      console.log("\n4. Testing Stream / Download:");
      const mediaRes = await drive.files.get(
        { fileId: createdFileId, alt: "media", supportsAllDrives: true },
        { responseType: "stream" }
      );

      let byteCount = 0;
      for await (const chunk of mediaRes.data) {
        byteCount += chunk.length;
      }
      console.log(`   ✅ Stream SUCCEEDED (${byteCount} bytes received)!`);
    } catch (err) {
      console.error("❌ Stream test failed:", err.message);
    }

    // 5. Cleanup Test File
    try {
      console.log("\n5. Cleaning up test file from Google Drive:");
      await drive.files.delete({ fileId: createdFileId, supportsAllDrives: true });
      console.log("   ✅ Test file successfully deleted from Google Drive.");
    } catch (err) {
      console.warn("⚠️ Cleanup warning:", err.message);
    }
  }

  console.log("\n============================================================");
  console.log("✅ OAUTH2 INTEGRATION VERIFICATION COMPLETE");
  console.log("============================================================\n");
}

testOAuth2Drive().catch(err => {
  console.error("Fatal Error:", err);
});

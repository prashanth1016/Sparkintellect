import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import { google } from "../backend/node_modules/googleapis/build/src/index.js";

const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
const prodFolderId = process.env.GOOGLE_DRIVE_RESUME_FOLDER_ID;

async function checkMyDrive() {
  console.log("============================================================");
  console.log("📁 GOOGLE DRIVE MY DRIVE ARCHITECTURE VERIFICATION");
  console.log("============================================================\n");

  console.log("Service Account:", email);
  console.log("Target Production Folder ID:", prodFolderId || "Not configured");

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/spreadsheets"],
  });

  const drive = google.drive({ version: "v3", auth });

  // 1. Check About Service Account
  try {
    const about = await drive.about.get({ fields: "user, storageQuota" });
    console.log("\n1. Service Account Identity & Quota:");
    console.log("   • Name:", about.data.user?.displayName);
    console.log("   • Email:", about.data.user?.emailAddress);
    console.log("   • Storage Quota Limit:", about.data.storageQuota?.limit, "bytes");
    console.log("   • Storage Quota Usage:", about.data.storageQuota?.usage, "bytes");
  } catch (err) {
    console.error("❌ Failed to query About:", err.message);
  }

  // 2. Check Visible Folders in My Drive
  try {
    console.log("\n2. Visible Folders & Files:");
    const fileList = await drive.files.list({
      pageSize: 15,
      fields: "files(id, name, mimeType, parents, owners, capabilities)",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    console.log(`   Found ${fileList.data.files?.length || 0} items:`);
    for (const f of fileList.data.files || []) {
      console.log(`   • [${f.mimeType === "application/vnd.google-apps.folder" ? "FOLDER" : "FILE"}] "${f.name}" (ID: ${f.id})`);
      if (f.owners) {
        console.log(`     Owner: ${f.owners.map(o => `${o.displayName} (${o.emailAddress})`).join(", ")}`);
      }
      if (f.capabilities) {
        console.log(`     Can Add Children: ${f.capabilities.canAddChildren}, Can Edit: ${f.capabilities.canEdit}, Can Delete: ${f.capabilities.canDelete}`);
      }
    }
  } catch (err) {
    console.error("❌ Failed to list files:", err.message);
  }

  // 3. Inspect target Production Folder if configured
  if (prodFolderId) {
    try {
      console.log(`\n3. Inspecting Production Folder (${prodFolderId}):`);
      const folderInfo = await drive.files.get({
        fileId: prodFolderId,
        fields: "id, name, mimeType, owners, capabilities, permissions",
        supportsAllDrives: true,
      });
      console.log("   • Name:", folderInfo.data.name);
      console.log("   • Owners:", folderInfo.data.owners?.map(o => `${o.displayName} (${o.emailAddress})`).join(", "));
      console.log("   • Capabilities:", {
        canAddChildren: folderInfo.data.capabilities?.canAddChildren,
        canDownload: folderInfo.data.capabilities?.canDownload,
        canEdit: folderInfo.data.capabilities?.canEdit,
        canDelete: folderInfo.data.capabilities?.canDelete,
      });
    } catch (err) {
      console.error(`❌ Failed to get folder ${prodFolderId}:`, err.message);
    }
  }

  console.log("\n============================================================");
  console.log("✅ GOOGLE DRIVE AUDIT COMPLETED");
  console.log("============================================================\n");
}

checkMyDrive().catch(err => {
  console.error("Fatal Error:", err);
});

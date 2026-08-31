import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import http from "node:http";
import url from "node:url";
import readline from "node:readline";
import { PassThrough } from "node:stream";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });
dotenv.config();

import { google } from "../backend/node_modules/googleapis/build/src/index.js";

const PORT = 5000;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2/callback`;
const SCOPES = ["https://www.googleapis.com/auth/drive"];

async function promptInput(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    });
  });
}

async function main() {
  console.log("============================================================");
  console.log("🔐 SPARKINTELLECT GOOGLE DRIVE OAUTH 2.0 AUTHORIZATION");
  console.log("============================================================\n");

  let clientId = process.env.GOOGLE_CLIENT_ID;
  let clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  let folderId = process.env.GOOGLE_DRIVE_RESUME_FOLDER_ID || "1YB8tPHWO_ioDKqOrI6HWL5viT1Z6IdfM";

  if (!clientId) {
    clientId = await promptInput("Enter GOOGLE_CLIENT_ID: ");
  }

  if (!clientSecret) {
    clientSecret = await promptInput("Enter GOOGLE_CLIENT_SECRET: ");
  }

  if (!clientId || !clientSecret) {
    console.error("❌ Error: Both GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required.");
    process.exit(1);
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, REDIRECT_URI);

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });

  console.log("\n------------------------------------------------------------");
  console.log("👉 STEP 1: OPEN THIS AUTHORIZATION URL IN YOUR BROWSER:");
  console.log("------------------------------------------------------------\n");
  console.log(authUrl);
  console.log("\n------------------------------------------------------------");
  console.log("• Sign in with the Google Account that owns the Production folder:");
  console.log("  prashanthsekhar838@gmail.com");
  console.log("• Click 'Allow' on the consent screen.");
  console.log(`• Google will redirect to: ${REDIRECT_URI}`);
  console.log("• Waiting for OAuth callback on port 5000...\n");

  const server = http.createServer(async (req, res) => {
    try {
      const parsedUrl = url.parse(req.url, true);

      if (parsedUrl.pathname === "/oauth2/callback") {
        const authCode = parsedUrl.query.code;
        const authError = parsedUrl.query.error;

        if (authError) {
          res.writeHead(400, { "Content-Type": "text/html" });
          res.end(`
            <html>
              <body style="font-family:sans-serif;padding:40px;text-align:center;background:#fff1f2;">
                <h1 style="color:#be123c;">OAuth Authorization Failed</h1>
                <p>Error: ${authError}</p>
                <p>You can close this window and retry in the terminal.</p>
              </body>
            </html>
          `);
          console.error(`\n❌ Authorization error from Google: ${authError}`);
          server.close();
          process.exit(1);
          return;
        }

        if (!authCode) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Missing authorization code.");
          return;
        }

        // Exchange authorization code for tokens
        const { tokens } = await oauth2Client.getToken(authCode);
        oauth2Client.setCredentials(tokens);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
          <html>
            <body style="font-family:sans-serif;padding:40px;text-align:center;background:#f0fdf4;">
              <h1 style="color:#15803d;">✅ SparkIntellect OAuth Authorization Successful!</h1>
              <p style="color:#334155;font-size:16px;">The refresh token has been received. You can now close this tab and return to the terminal.</p>
            </body>
          </html>
        `);

        console.log("============================================================");
        console.log("✅ OAUTH AUTHORIZATION SUCCESSFUL");
        console.log("============================================================\n");

        if (tokens.refresh_token) {
          console.log("🔑 GOOGLE_REFRESH_TOKEN:\n");
          console.log(tokens.refresh_token);
          console.log("\n------------------------------------------------------------");
          console.log("Copy the GOOGLE_REFRESH_TOKEN above and set it in your Render Dashboard.");
          console.log("------------------------------------------------------------\n");
        } else {
          console.warn("⚠️ Warning: Google did not return a new refresh_token.");
          console.warn("   If you have previously authorized this app, go to your Google Account permissions, revoke access, and re-run this script with prompt: 'consent'.");
        }

        // Step 2: Verification of Google Drive folder access and file operations
        console.log("--- RUNNING VERIFICATION TEST AGAINST GOOGLE DRIVE ---");
        const drive = google.drive({ version: "v3", auth: oauth2Client });

        try {
          // 1. Inspect user identity and quota
          const about = await drive.about.get({ fields: "user, storageQuota" });
          console.log("1. Authenticated User Identity:");
          console.log("   • Name:", about.data.user?.displayName);
          console.log("   • Email:", about.data.user?.emailAddress);
          if (about.data.storageQuota?.limit) {
            const limitGb = (parseInt(about.data.storageQuota.limit, 10) / (1024 ** 3)).toFixed(2);
            console.log(`   • Storage Quota: ${limitGb} GB`);
          }

          // 2. Inspect Production folder
          console.log("\n2. Inspecting Target Production Folder:");
          const folderInfo = await drive.files.get({
            fileId: folderId,
            fields: "id, name, owners, capabilities",
            supportsAllDrives: true,
          });
          console.log("   • Folder Name:", folderInfo.data.name);
          console.log("   • Can Add Children:", folderInfo.data.capabilities?.canAddChildren);

          // 3. Create small test PDF file
          console.log("\n3. Testing Resume File Upload (files.create):");
          const testBuffer = Buffer.from("%PDF-1.4\n% SparkIntellect OAuth2 Production Verification Test\n%%EOF");
          const bufferStream = new PassThrough();
          bufferStream.end(testBuffer);

          const testFileName = `OAuth2_Verification_${Date.now()}.pdf`;
          const createRes = await drive.files.create({
            requestBody: {
              name: testFileName,
              parents: [folderId],
              description: "OAuth2 Refresh Token Verification Test File",
            },
            media: {
              mimeType: "application/pdf",
              body: bufferStream,
            },
            fields: "id, name, mimeType, size, owners",
            supportsAllDrives: true,
          });

          const createdFileId = createRes.data.id;
          console.log("   ✅ File Creation SUCCEEDED!");
          console.log("   • File ID:", createdFileId);
          console.log("   • File Name:", createRes.data.name);

          // 4. Download/stream test
          console.log("\n4. Testing File Download / Media Stream:");
          const mediaRes = await drive.files.get(
            { fileId: createdFileId, alt: "media", supportsAllDrives: true },
            { responseType: "stream" }
          );

          let byteCount = 0;
          for await (const chunk of mediaRes.data) {
            byteCount += chunk.length;
          }
          console.log(`   ✅ Stream SUCCEEDED (${byteCount} bytes verified).`);

          // 5. Delete test file
          console.log("\n5. Cleaning up test file from Google Drive:");
          await drive.files.delete({ fileId: createdFileId, supportsAllDrives: true });
          console.log("   ✅ Test file permanently deleted.");

          console.log("\n============================================================");
          console.log("🎉 ALL GOOGLE DRIVE OAUTH2 VERIFICATION TESTS PASSED!");
          console.log("============================================================\n");
        } catch (testErr) {
          console.error("❌ Google Drive Verification Test Failed:", testErr.message);
        }

        // Close server and terminate
        setTimeout(() => {
          server.close(() => {
            console.log("Temporary OAuth server closed. Done.");
            process.exit(0);
          });
        }, 1000);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
    } catch (err) {
      console.error("❌ Error handling request:", err.message);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  });

  server.listen(PORT, "localhost", () => {
    console.log(`Temporary OAuth receiver listening on ${REDIRECT_URI}`);
  });
}

main().catch((err) => {
  console.error("Fatal Error:", err);
  process.exit(1);
});

import { google, drive_v3 } from "googleapis";
import { Readable, PassThrough } from "stream";
import path from "path";
import fs from "fs";
import { config } from "../config/index.js";

export interface UploadResumeParams {
  buffer: Buffer;
  originalFilename: string;
  mimeType: string;
  candidateName?: string;
  applicationReferenceId?: string;
}

export interface UploadResumeResult {
  fileId: string;
  fileName: string;
  mimeType: string;
  size: number;
  storageProvider: "google-drive" | "local";
}

export interface DownloadResumeResult {
  stream: NodeJS.ReadableStream;
  fileName: string;
  mimeType: string;
  size?: number;
}

export class GoogleDriveStorageService {
  private static driveClient: drive_v3.Drive | null = null;

  /**
   * Initializes and returns the authenticated Google Drive API client
   * reusing the existing Google Service Account credentials.
   */
  private static getDriveClient(): drive_v3.Drive | null {
    if (this.driveClient) {
      return this.driveClient;
    }

    if (!config.GOOGLE_SERVICE_ACCOUNT_EMAIL || !config.GOOGLE_PRIVATE_KEY) {
      return null;
    }

    try {
      const privateKey = config.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
      const auth = new google.auth.JWT({
        email: config.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: privateKey,
        scopes: [
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/spreadsheets",
        ],
      });

      this.driveClient = google.drive({ version: "v3", auth });
      return this.driveClient;
    } catch (err: any) {
      console.error("❌ [GoogleDriveStorage] Failed to initialize Google Drive client:", err.message);
      return null;
    }
  }

  /**
   * Generates a safe, sanitized filename based on candidate name and application reference.
   */
  private static sanitizeFilename(candidateName?: string, referenceId?: string, originalName?: string): string {
    const rawExt = originalName ? path.extname(originalName).toLowerCase() : ".pdf";
    const ext = [".pdf", ".doc", ".docx"].includes(rawExt) ? rawExt : ".pdf";

    const cleanName = (candidateName || "Candidate")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "")
      .slice(0, 35) || "Candidate";

    const cleanRef = (referenceId || "APP")
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .slice(0, 30);

    return `${cleanName}_${cleanRef}${ext}`;
  }

  /**
   * Uploads candidate resume to Google Drive (Private Folder) with automatic fallback.
   */
  static async uploadResume(params: UploadResumeParams): Promise<UploadResumeResult> {
    const { buffer, originalFilename, mimeType, candidateName, applicationReferenceId } = params;
    const sanitizedFileName = this.sanitizeFilename(candidateName, applicationReferenceId, originalFilename);
    const fileSize = buffer.length;

    const drive = this.getDriveClient();
    const folderId = config.GOOGLE_DRIVE_RESUME_FOLDER_ID;

    // Attempt upload to Google Drive if configured
    if (drive && folderId) {
      try {
        const bufferStream = new PassThrough();
        bufferStream.end(buffer);

        const response = await drive.files.create({
          requestBody: {
            name: sanitizedFileName,
            parents: [folderId],
            description: `Candidate Resume for ${candidateName || "Applicant"} (Ref: ${applicationReferenceId || "N/A"})`,
          },
          media: {
            mimeType: mimeType || "application/pdf",
            body: bufferStream,
          },
          fields: "id, name, mimeType, size",
          supportsAllDrives: true,
        });

        if (response.data && response.data.id) {
          console.log(`✅ [GoogleDriveStorage] Resume uploaded to Drive: "${sanitizedFileName}" (ID: ${response.data.id}, Size: ${fileSize} bytes)`);
          return {
            fileId: response.data.id,
            fileName: response.data.name || sanitizedFileName,
            mimeType: response.data.mimeType || mimeType,
            size: response.data.size ? parseInt(response.data.size, 10) : fileSize,
            storageProvider: "google-drive",
          };
        }
      } catch (driveErr: any) {
        console.warn(`⚠️ [GoogleDriveStorage] Google Drive upload failed (${driveErr.message}). Falling back to local storage engine.`);
      }
    }

    // Local Storage Fallback Engine
    const localDir = path.join(config.UPLOAD_DIR, "resumes");
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }

    const localKey = `${Date.now()}_${sanitizedFileName}`;
    const localFilePath = path.join(localDir, localKey);
    fs.writeFileSync(localFilePath, buffer);

    console.log(`ℹ️ [GoogleDriveStorage] Resume saved locally: "${localKey}" (${fileSize} bytes)`);

    return {
      fileId: localKey,
      fileName: sanitizedFileName,
      mimeType: mimeType || "application/pdf",
      size: fileSize,
      storageProvider: "local",
    };
  }

  /**
   * Securely streams resume binary from Google Drive or Local Storage for authenticated Admin review.
   */
  static async downloadResumeStream(fileId: string, storageProvider: "google-drive" | "local" = "google-drive"): Promise<DownloadResumeResult> {
    const drive = this.getDriveClient();

    // 1. If stored in Google Drive, stream directly from Google Drive API
    if (storageProvider === "google-drive" && drive) {
      try {
        // Fetch file metadata
        const metaRes = await drive.files.get({
          fileId,
          fields: "id, name, mimeType, size",
          supportsAllDrives: true,
        });

        // Fetch file media stream
        const mediaRes = await drive.files.get(
          {
            fileId,
            alt: "media",
            supportsAllDrives: true,
          },
          { responseType: "stream" }
        );

        return {
          stream: mediaRes.data as NodeJS.ReadableStream,
          fileName: metaRes.data.name || "Resume.pdf",
          mimeType: metaRes.data.mimeType || "application/pdf",
          size: metaRes.data.size ? parseInt(metaRes.data.size, 10) : undefined,
        };
      } catch (driveErr: any) {
        console.warn(`⚠️ [GoogleDriveStorage] Stream from Drive failed (${driveErr.message}). Checking local fallback...`);
      }
    }

    // 2. Local file stream check
    const localDir = path.join(config.UPLOAD_DIR, "resumes");
    const localFilePath = path.join(localDir, fileId);

    if (fs.existsSync(localFilePath)) {
      const stat = fs.statSync(localFilePath);
      return {
        stream: fs.createReadStream(localFilePath),
        fileName: fileId.replace(/^\d+_/, ""),
        mimeType: "application/pdf",
        size: stat.size,
      };
    }

    // Check if filename without prefix exists
    const legacyPath = path.join(localDir, path.basename(fileId));
    if (fs.existsSync(legacyPath)) {
      const stat = fs.statSync(legacyPath);
      return {
        stream: fs.createReadStream(legacyPath),
        fileName: path.basename(fileId),
        mimeType: "application/pdf",
        size: stat.size,
      };
    }

    throw new Error(`Resume file not found in Google Drive (ID: ${fileId}) or local disk.`);
  }

  /**
   * Permanently deletes resume file from Google Drive and local storage.
   */
  static async deleteResume(fileId: string, storageProvider: "google-drive" | "local" = "google-drive"): Promise<boolean> {
    let deletedFromDrive = false;
    let deletedFromLocal = false;

    // 1. Delete from Google Drive if applicable
    if (storageProvider === "google-drive") {
      const drive = this.getDriveClient();
      if (drive) {
        try {
          await drive.files.delete({
            fileId,
            supportsAllDrives: true,
          });
          console.log(`✅ [GoogleDriveStorage] Deleted file from Google Drive (ID: ${fileId})`);
          deletedFromDrive = true;
        } catch (err: any) {
          console.warn(`⚠️ [GoogleDriveStorage] Could not delete file from Drive (${fileId}):`, err.message);
        }
      }
    }

    // 2. Delete from local storage if present
    const localFilePath = path.join(config.UPLOAD_DIR, "resumes", fileId);
    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
        console.log(`✅ [GoogleDriveStorage] Deleted local resume file: "${fileId}"`);
        deletedFromLocal = true;
      } catch (err: any) {
        console.warn(`⚠️ [GoogleDriveStorage] Failed to unlink local file (${fileId}):`, err.message);
      }
    }

    return deletedFromDrive || deletedFromLocal;
  }
}

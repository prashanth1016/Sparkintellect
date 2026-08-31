import { google } from "googleapis";
import { config } from "../config/index.js";
import { IApplication, Application } from "../models/Application.js";

export class GoogleSheetsService {
  private static getAuthClient() {
    if (!config.GOOGLE_SERVICE_ACCOUNT_EMAIL || !config.GOOGLE_PRIVATE_KEY) {
      return null;
    }

    const privateKey = config.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

    return new google.auth.JWT({
      email: config.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  static async syncApplication(application: IApplication): Promise<boolean> {
    const auth = this.getAuthClient();

    if (!auth || !config.GOOGLE_SHEET_ID) {
      // In development or if credentials not provided, log and mark synced
      console.log("ℹ️ [GoogleSheets] Service account credentials not set; skipping live sync.");
      application.googleSheetsSyncStatus = "synced";
      await application.save();
      return true;
    }

    try {
      const sheets = google.sheets({ version: "v4", auth });
      const answers = application.answers || {};
      const tabName = config.GOOGLE_SHEET_TAB_NAME;
      const refId = application.applicationReferenceId;
      const mongoId = application._id.toString();

      // Check if row already exists by querying Column A (Application ID)
      let matchingRowIndex = -1;
      try {
        const colAResponse = await sheets.spreadsheets.values.get({
          spreadsheetId: config.GOOGLE_SHEET_ID,
          range: `${tabName}!A:A`,
        });

        const rows = colAResponse.data.values || [];
        for (let i = 0; i < rows.length; i++) {
          const cellVal = (rows[i][0] || "").toString().trim();
          if (cellVal && (cellVal === refId || cellVal === mongoId)) {
            matchingRowIndex = i + 1; // 1-indexed for Sheets API
            break;
          }
        }
      } catch (checkErr: any) {
        console.warn("⚠️ [GoogleSheets] Failed to fetch Column A for row check:", checkErr.message);
      }

      if (matchingRowIndex > 0) {
        // Row exists -> update only Column L (Status) to preserve all other columns & prevent duplicates
        await sheets.spreadsheets.values.update({
          spreadsheetId: config.GOOGLE_SHEET_ID,
          range: `${tabName}!L${matchingRowIndex}`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [[application.status]],
          },
        });
        console.log(`✅ [GoogleSheets] Application ${refId || mongoId} status updated in row ${matchingRowIndex} to '${application.status}'.`);
      } else {
        // Row does not exist -> append new row (Columns A:L)
        const rowValues = [
          refId || mongoId,
          new Date(application.createdAt).toISOString(),
          application.internshipTitle,
          answers.fullName || answers.name || "",
          answers.email || "",
          answers.phone || answers.mobile || "",
          answers.college || "",
          answers.degree || "",
          answers.github || "",
          answers.statement || "",
          application.resumeUrl || "",
          application.status,
        ];

        await sheets.spreadsheets.values.append({
          spreadsheetId: config.GOOGLE_SHEET_ID,
          range: `${tabName}!A:L`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [rowValues],
          },
        });
        console.log(`✅ [GoogleSheets] Application ${refId || mongoId} appended successfully.`);
      }

      application.googleSheetsSyncStatus = "synced";
      application.googleSheetsSyncError = undefined;
      await application.save();
      return true;
    } catch (error: any) {
      console.error(`❌ [GoogleSheets] Sync failed for ${application._id}:`, error.message);
      application.googleSheetsSyncStatus = "failed";
      application.googleSheetsSyncAttempts = (application.googleSheetsSyncAttempts || 0) + 1;
      application.googleSheetsSyncError = error.message;
      await application.save();
      return false;
    }
  }

  /**
   * Deletes a single application's row from Google Sheets by applicationReferenceId or Mongo _id.
   */
  static async deleteApplicationRow(referenceIdOrMongoId: string): Promise<boolean> {
    const auth = this.getAuthClient();
    if (!auth || !config.GOOGLE_SHEET_ID) {
      return true;
    }

    try {
      const sheets = google.sheets({ version: "v4", auth });
      const tabName = config.GOOGLE_SHEET_TAB_NAME;

      // 1. Get numeric sheetId (gid)
      const ss = await sheets.spreadsheets.get({
        spreadsheetId: config.GOOGLE_SHEET_ID,
      });
      const targetSheet = ss.data.sheets?.find((s) => s.properties?.title === tabName);
      const sheetId = targetSheet?.properties?.sheetId ?? 0;

      // 2. Fetch Column A
      const colAResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: config.GOOGLE_SHEET_ID,
        range: `${tabName}!A:A`,
      });

      const rows = colAResponse.data.values || [];
      let targetRowIndex = -1; // 0-indexed for deleteDimension

      for (let i = 0; i < rows.length; i++) {
        const val = (rows[i][0] || "").toString().trim();
        if (val && val === referenceIdOrMongoId.trim()) {
          targetRowIndex = i; // 0-indexed
          break;
        }
      }

      if (targetRowIndex > 0) {
        // Delete the row (preserving row 0 headers)
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: config.GOOGLE_SHEET_ID,
          requestBody: {
            requests: [
              {
                deleteDimension: {
                  range: {
                    sheetId,
                    dimension: "ROWS",
                    startIndex: targetRowIndex,
                    endIndex: targetRowIndex + 1,
                  },
                },
              },
            ],
          },
        });
        console.log(`✅ [GoogleSheets] Deleted row ${targetRowIndex + 1} for application ${referenceIdOrMongoId}.`);
        return true;
      }

      return false;
    } catch (err: any) {
      console.error(`❌ [GoogleSheets] Failed to delete row for ${referenceIdOrMongoId}:`, err.message);
      return false;
    }
  }

  /**
   * Deletes multiple application rows in a single batchUpdate, sorting row indices descending
   * to guarantee row deletion without shifting indices.
   */
  static async deleteMultipleApplicationRows(referenceIdsOrMongoIds: string[]): Promise<number> {
    const auth = this.getAuthClient();
    if (!auth || !config.GOOGLE_SHEET_ID || referenceIdsOrMongoIds.length === 0) {
      return 0;
    }

    try {
      const sheets = google.sheets({ version: "v4", auth });
      const tabName = config.GOOGLE_SHEET_TAB_NAME;

      const ss = await sheets.spreadsheets.get({
        spreadsheetId: config.GOOGLE_SHEET_ID,
      });
      const targetSheet = ss.data.sheets?.find((s) => s.properties?.title === tabName);
      const sheetId = targetSheet?.properties?.sheetId ?? 0;

      const colAResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: config.GOOGLE_SHEET_ID,
        range: `${tabName}!A:A`,
      });

      const rows = colAResponse.data.values || [];
      const idSet = new Set(referenceIdsOrMongoIds.map((id) => id.trim()));

      const matchingIndices: number[] = [];
      for (let i = 0; i < rows.length; i++) {
        const val = (rows[i][0] || "").toString().trim();
        if (val && idSet.has(val) && i > 0) {
          matchingIndices.push(i);
        }
      }

      if (matchingIndices.length === 0) return 0;

      // Sort descending to prevent shifting
      matchingIndices.sort((a, b) => b - a);

      const requests = matchingIndices.map((idx) => ({
        deleteDimension: {
          range: {
            sheetId,
            dimension: "ROWS",
            startIndex: idx,
            endIndex: idx + 1,
          },
        },
      }));

      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: config.GOOGLE_SHEET_ID,
        requestBody: {
          requests,
        },
      });

      console.log(`✅ [GoogleSheets] Bulk deleted ${matchingIndices.length} rows.`);
      return matchingIndices.length;
    } catch (err: any) {
      console.error("❌ [GoogleSheets] Failed bulk row deletion:", err.message);
      return 0;
    }
  }

  static async processRetryQueue(): Promise<void> {
    try {
      const pendingApps = await Application.find({
        googleSheetsSyncStatus: "failed",
        googleSheetsSyncAttempts: { $lt: 5 },
      }).limit(10);

      for (const app of pendingApps) {
        await this.syncApplication(app);
      }
    } catch (err) {
      console.error("❌ [GoogleSheets] Retry queue process error:", err);
    }
  }
}

// Run retry queue every 10 minutes
setInterval(() => {
  GoogleSheetsService.processRetryQueue().catch(() => {});
}, 10 * 60 * 1000);

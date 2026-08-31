import path from "path";
import fs from "fs";
import { config } from "../config/index.js";

export class StorageService {
  static getFilePath(filename: string): string {
    return path.join(config.UPLOAD_DIR, "resumes", filename);
  }

  static fileExists(filename: string): boolean {
    const filePath = this.getFilePath(filename);
    return fs.existsSync(filePath);
  }

  static deleteFile(filename: string): void {
    const filePath = this.getFilePath(filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

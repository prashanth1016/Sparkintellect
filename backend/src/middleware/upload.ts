import multer from "multer";
import path from "path";
import { Request } from "express";
import { config } from "../config/index.js";

// Use memoryStorage so file buffer is directly available for Google Drive streaming
const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext) && (allowedMimeTypes.includes(file.mimetype) || file.mimetype === "application/octet-stream")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format. Only PDF, DOC, and DOCX files under 5MB are permitted."));
  }
};

export const resumeUpload = multer({
  storage,
  limits: {
    fileSize: config.MAX_FILE_SIZE_BYTES, // 5MB
    files: 1,
  },
  fileFilter,
});

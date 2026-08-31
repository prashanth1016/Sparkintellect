import mongoose, { Schema, Document } from "mongoose";

export interface EmailCommunicationRecord {
  sent: boolean;
  sentAt?: Date;
  sentBy?: string;
  messageId?: string;
  subject?: string;
}

export interface IApplication extends Document {
  applicationReferenceId: string;
  internshipId: mongoose.Types.ObjectId | string;
  internshipSlug: string;
  internshipTitle: string;
  answers: Record<string, any>;
  resumeUrl?: string;
  resumeFileName?: string;
  resumeKey?: string;
  resumeFileId?: string;
  resumeStorageProvider?: "google-drive" | "local";
  resumeSize?: number;
  resumeMimeType?: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "accepted";
  notes?: string;
  googleSheetsSyncStatus: "pending" | "synced" | "failed";
  googleSheetsSyncAttempts: number;
  googleSheetsSyncError?: string;
  emailStatus?: "pending" | "sent" | "failed";
  emailMessageId?: string;
  emailSentAt?: Date;
  emailError?: string;
  communication?: {
    shortlisted?: EmailCommunicationRecord;
    accepted?: EmailCommunicationRecord;
    rejected?: EmailCommunicationRecord;
  };
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    applicationReferenceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      immutable: true,
      trim: true,
    },
    internshipId: { type: Schema.Types.Mixed, required: true, index: true },
    internshipSlug: { type: String, required: true, index: true },
    internshipTitle: { type: String, required: true },
    answers: { type: Schema.Types.Mixed, default: {} },
    resumeUrl: { type: String },
    resumeFileName: { type: String },
    resumeKey: { type: String },
    resumeFileId: { type: String, index: true },
    resumeStorageProvider: {
      type: String,
      enum: ["google-drive", "local"],
      default: "google-drive",
    },
    resumeSize: { type: Number },
    resumeMimeType: { type: String },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected", "accepted"],
      default: "pending",
      index: true,
    },
    notes: { type: String },
    googleSheetsSyncStatus: {
      type: String,
      enum: ["pending", "synced", "failed"],
      default: "pending",
      index: true,
    },
    googleSheetsSyncAttempts: { type: Number, default: 0 },
    googleSheetsSyncError: { type: String },
    emailStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
      index: true,
    },
    emailMessageId: { type: String },
    emailSentAt: { type: Date },
    emailError: { type: String },
    communication: {
      shortlisted: {
        sent: { type: Boolean, default: false },
        sentAt: { type: Date },
        sentBy: { type: String },
        messageId: { type: String },
        subject: { type: String },
      },
      accepted: {
        sent: { type: Boolean, default: false },
        sentAt: { type: Date },
        sentBy: { type: String },
        messageId: { type: String },
        subject: { type: String },
      },
      rejected: {
        sent: { type: Boolean, default: false },
        sentAt: { type: Date },
        sentBy: { type: String },
        messageId: { type: String },
        subject: { type: String },
      },
    },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

ApplicationSchema.index({ internshipId: 1, "answers.email": 1 });
ApplicationSchema.index({ internshipSlug: 1, "answers.email": 1 });

export const Application = mongoose.model<IApplication>("Application", ApplicationSchema);

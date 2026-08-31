import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  actorId?: string;
  actorName?: string;
  actorEmail?: string;
  actorRole?: string;
  action: string;
  targetResource?: string;
  ipAddress?: string;
  userAgent?: string;
  status: "success" | "failure";
  metadata?: Record<string, any>;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    actorId: { type: String, index: true },
    actorName: { type: String },
    actorEmail: { type: String, index: true },
    actorRole: { type: String },
    action: { type: String, required: true, index: true },
    targetResource: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
    status: { type: String, enum: ["success", "failure"], default: "success" },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Append-only immutable
  }
);

export const AuditLog = mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);

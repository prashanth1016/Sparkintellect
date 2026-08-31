import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "closed";
  notes?: string;
  notificationEmailStatus?: "pending" | "sent" | "failed";
  acknowledgementEmailStatus?: "pending" | "sent" | "failed";
  emailMessageId?: string;
  emailSentAt?: Date;
  emailError?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    service: { type: String, default: "General Scope" },
    budget: { type: String },
    timeline: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "closed"],
      default: "new",
      index: true,
    },
    notes: { type: String },
    notificationEmailStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    acknowledgementEmailStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    emailMessageId: { type: String },
    emailSentAt: { type: Date },
    emailError: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);

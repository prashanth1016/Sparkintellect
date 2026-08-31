import mongoose, { Schema, Document } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  link?: string;
  type: "info" | "success" | "warning";
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    link: { type: String },
    type: {
      type: String,
      enum: ["info", "success", "warning"],
      default: "info",
    },
    active: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const Announcement = mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);

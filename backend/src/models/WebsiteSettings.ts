import mongoose, { Schema, Document } from "mongoose";

export interface IWebsiteSettings extends Document {
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  workingHours: string;
  maintenanceMode: boolean;
  googleSheetsAutoSync: boolean;
  customData: Record<string, any>;
  updatedAt: Date;
}

const WebsiteSettingsSchema = new Schema<IWebsiteSettings>(
  {
    siteName: { type: String, default: "SparkIntellect" },
    tagline: { type: String, default: "AI • Software • Automation" },
    contactEmail: { type: String, default: "info@sparkintellect.in" },
    contactPhone: { type: String, default: "+91 8977177634" },
    officeAddress: { type: String, default: "Guindy Tech Corridor, Chennai, Tamil Nadu - 600032, India" },
    workingHours: { type: String, default: "Monday – Saturday: 9:00 AM – 7:00 PM IST" },
    maintenanceMode: { type: Boolean, default: false },
    googleSheetsAutoSync: { type: Boolean, default: true },
    customData: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
  }
);

export const WebsiteSettings = mongoose.model<IWebsiteSettings>("WebsiteSettings", WebsiteSettingsSchema);

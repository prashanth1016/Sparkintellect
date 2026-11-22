import mongoose, { Schema, Document } from "mongoose";

export interface ICareerApplication extends Document {
  applicationReferenceId: string;
  careerId: mongoose.Types.ObjectId | string;
  careerSlug: string;
  careerTitle: string;
  personalInfo: {
    fullName: string;
    email: string;
    mobile: string;
    location: string;
  };
  academicInfo: {
    highestQualification: string;
    institution: string;
    department: string;
    graduationYear: string;
  };
  professionalInfo: {
    position: string;
    experienceLevel: string;
    skills: string[];
    portfolioUrl?: string;
    linkedinUrl?: string;
    githubUrl?: string;
  };
  resumeUrl?: string;
  resumeFileName?: string;
  resumeFileId?: string;
  resumeStorageProvider?: "google-drive" | "local";
  resumeSize?: number;
  resumeMimeType?: string;
  status: "new" | "under_review" | "shortlisted" | "interview_scheduled" | "selected" | "rejected";
  notes?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CareerApplicationSchema = new Schema<ICareerApplication>(
  {
    applicationReferenceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      immutable: true,
      trim: true,
    },
    careerId: { type: Schema.Types.Mixed, required: true, index: true },
    careerSlug: { type: String, required: true, index: true },
    careerTitle: { type: String, required: true },
    personalInfo: {
      fullName: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true, index: true },
      mobile: { type: String, required: true, trim: true },
      location: { type: String, required: true, trim: true },
    },
    academicInfo: {
      highestQualification: { type: String, required: true },
      institution: { type: String, required: true },
      department: { type: String, required: true },
      graduationYear: { type: String, required: true },
    },
    professionalInfo: {
      position: { type: String, required: true },
      experienceLevel: { type: String, required: true },
      skills: { type: [String], default: [] },
      portfolioUrl: { type: String },
      linkedinUrl: { type: String },
      githubUrl: { type: String },
    },
    resumeUrl: { type: String },
    resumeFileName: { type: String },
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
      enum: [
        "new",
        "under_review",
        "shortlisted",
        "interview_scheduled",
        "selected",
        "rejected",
      ],
      default: "new",
      index: true,
    },
    notes: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

CareerApplicationSchema.index({ careerSlug: 1, "personalInfo.email": 1 });

export const CareerApplication = mongoose.model<ICareerApplication>(
  "CareerApplication",
  CareerApplicationSchema
);

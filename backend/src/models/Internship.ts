import mongoose, { Schema, Document } from "mongoose";

export interface IApplicationField {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "file";
  required: boolean;
  placeholder?: string;
  options?: string[];
  order: number;
}

export interface IInternship extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  mode: string;
  stipend: string;
  location: string;
  eligibility: string;
  skills: string[];
  technologies: string[];
  benefits: string[];
  status: "open" | "closed" | "draft" | "archived";
  published: boolean;
  applicationFields: IApplicationField[];
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationFieldSchema = new Schema<IApplicationField>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    label: { type: String, required: true },
    type: {
      type: String,
      enum: ["text", "email", "tel", "textarea", "select", "file"],
      required: true,
    },
    required: { type: Boolean, default: true },
    placeholder: { type: String },
    options: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const InternshipSchema = new Schema<IInternship>(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    duration: { type: String, default: "3 Months" },
    mode: { type: String, default: "Hybrid (Chennai / Remote)" },
    stipend: { type: String, default: "Performance-Based / Competitive" },
    location: { type: String, default: "Guindy Tech Corridor, Chennai" },
    eligibility: { type: String, default: "B.E / B.Tech / MCA / BCA / M.Sc Students & Fresh Graduates" },
    skills: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["open", "closed", "draft", "archived"],
      default: "open",
      index: true,
    },
    published: { type: Boolean, default: true, index: true },
    applicationFields: {
      type: [ApplicationFieldSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Internship = mongoose.model<IInternship>("Internship", InternshipSchema);

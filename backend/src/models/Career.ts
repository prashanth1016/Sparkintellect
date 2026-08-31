import mongoose, { Schema, Document } from "mongoose";

export interface ICareer extends Document {
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  shortDesc: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status: "active" | "closed" | "draft";
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema = new Schema<ICareer>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    department: { type: String, default: "Engineering" },
    location: { type: String, default: "Guindy, Chennai (Hybrid)" },
    type: { type: String, default: "Full-Time" },
    experience: { type: String, default: "2–4 Years" },
    shortDesc: { type: String, required: true },
    description: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Career = mongoose.model<ICareer>("Career", CareerSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface ICaseStudy extends Document {
  title: string;
  slug: string;
  client: string;
  industry: string;
  service: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  metrics: Array<{ label: string; value: string }>;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    client: { type: String, required: true },
    industry: { type: String, required: true, index: true },
    service: { type: String, required: true },
    summary: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    results: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    metrics: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const CaseStudy = mongoose.model<ICaseStudy>("CaseStudy", CaseStudySchema);

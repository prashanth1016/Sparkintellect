import { Counter } from "../models/Counter.js";

/**
 * Normalizes an internship track title or slug into a standard concise uppercase track code.
 */
export function normalizeTrackCode(trackTitle?: string, trackSlug?: string): string {
  const normalizedTitle = (trackTitle || "").toLowerCase().trim();
  const normalizedSlug = (trackSlug || "").toLowerCase().trim();
  const combined = `${normalizedTitle} ${normalizedSlug}`;

  // 1. Full-Stack / Full Stack Development -> FSD
  if (
    combined.includes("full stack") ||
    combined.includes("fullstack") ||
    combined.includes("fsd") ||
    normalizedSlug === "ai-full-stack-development"
  ) {
    return "FSD";
  }

  // 2. AI / Machine Learning (when not primarily fullstack) -> AI
  if (
    combined.includes("machine learning") ||
    combined.includes("artificial intelligence") ||
    combined.includes("ai/ml") ||
    combined.includes("aiml") ||
    normalizedSlug === "ai" ||
    normalizedSlug === "ai-machine-learning-intern"
  ) {
    return "AI";
  }

  // 3. Web Development -> WEB
  if (combined.includes("web development") || combined.includes("web app") || normalizedSlug === "web") {
    return "WEB";
  }

  // 4. UI / UX Design -> UIUX
  if (combined.includes("ui/ux") || combined.includes("ui-ux") || combined.includes("design")) {
    return "UIUX";
  }

  // 5. Mobile App Development -> APP
  if (combined.includes("mobile") || combined.includes("flutter") || combined.includes("react native") || combined.includes("ios") || combined.includes("android")) {
    return "APP";
  }

  // 6. Cloud & DevOps -> CLOUD
  if (combined.includes("cloud") || combined.includes("devops") || combined.includes("aws")) {
    return "CLOUD";
  }

  // 7. Data Science -> DATA
  if (combined.includes("data science") || combined.includes("analytics")) {
    return "DATA";
  }

  // 8. Automation -> AUTO
  if (combined.includes("automation") || combined.includes("n8n")) {
    return "AUTO";
  }

  // 9. Cyber Security -> SEC
  if (combined.includes("security") || combined.includes("cyber")) {
    return "SEC";
  }

  // Dynamic fallback: acronym of significant words or clean uppercase code
  if (trackTitle && trackTitle.trim()) {
    const words = trackTitle.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length > 1) {
      const acronym = words.map(w => w[0].toUpperCase()).join("").replace(/[^A-Z0-9]/g, "");
      if (acronym.length >= 2) return acronym.slice(0, 6);
    }
    const cleanWord = trackTitle.trim().replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (cleanWord.length > 0) return cleanWord.slice(0, 5);
  }

  return "GEN";
}

/**
 * Service to generate atomic, concurrency-safe application reference IDs (SI-[TRACK]-[YEAR]-[SEQUENCE]).
 */
export class ReferenceIdService {
  /**
   * Generates the next sequential Application Reference ID for a given year.
   * Concurrency-safe via atomic MongoDB Counter.findOneAndUpdate with $inc.
   */
  static async generateApplicationReferenceId(
    trackTitle: string,
    trackSlug?: string,
    applicationDate: Date = new Date()
  ): Promise<string> {
    const year = applicationDate.getFullYear();
    const counterName = `applications_${year}`;

    // Atomic increment
    const counter = await Counter.findOneAndUpdate(
      { name: counterName },
      { $inc: { seq: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const seqNumber = counter.seq;
    const paddedSeq = String(seqNumber).padStart(6, "0");
    const trackCode = normalizeTrackCode(trackTitle, trackSlug);

    return `SI-${trackCode}-${year}-${paddedSeq}`;
  }

  /**
   * Generates the next sequential Career Application Reference ID for a given year (SI-CAR-YYYY-NNNN).
   */
  static async generateCareerApplicationReferenceId(applicationDate: Date = new Date()): Promise<string> {
    const year = applicationDate.getFullYear();
    const counterName = `career_applications_${year}`;

    const counter = await Counter.findOneAndUpdate(
      { name: counterName },
      { $inc: { seq: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const seqNumber = counter.seq;
    const paddedSeq = String(seqNumber).padStart(4, "0");

    return `SI-CAR-${year}-${paddedSeq}`;
  }

  /**
   * Generates the next sequential Contact / Inquiry Reference ID for a given year (SI-INQ-YYYY-NNNN).
   * Concurrency-safe via atomic MongoDB Counter.findOneAndUpdate with $inc.
   */
  static async generateContactReferenceId(contactDate: Date = new Date()): Promise<string> {
    const year = contactDate.getFullYear();
    const counterName = `contacts_${year}`;

    const counter = await Counter.findOneAndUpdate(
      { name: counterName },
      { $inc: { seq: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const seqNumber = counter.seq;
    const paddedSeq = String(seqNumber).padStart(4, "0");

    return `SI-INQ-${year}-${paddedSeq}`;
  }

  /**
   * Formats a reference ID deterministically from components.
   */
  static formatReferenceId(trackCode: string, year: number, seq: number): string {
    const paddedSeq = String(seq).padStart(6, "0");
    return `SI-${trackCode.toUpperCase()}-${year}-${paddedSeq}`;
  }
}

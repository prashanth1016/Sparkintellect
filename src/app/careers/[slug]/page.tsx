import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { ApplyButtonModalTrigger } from "@/components/careers/ApplyButtonModalTrigger";
import { publicApi, CareerItem } from "@/lib/api";
import { COMPANY_INFO } from "@/data/companyData";
import { 
  Briefcase, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Award, 
  IndianRupee, 
  GraduationCap, 
  Building, 
  Mail, 
  FileText, 
  PhoneCall, 
  Check 
} from "lucide-react";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;
  if (!slug) {
    return { title: "Position Not Found | SparkIntellect" };
  }

  const career = await publicApi.getCareerBySlug(slug);
  if (!career || career.status !== "active") {
    return { title: "Position Not Found | SparkIntellect" };
  }

  return {
    title: `${career.title} | SparkIntellect Careers`,
    description: career.shortDesc?.slice(0, 160) || `Apply for the ${career.title} position at SparkIntellect in Chennai.`,
  };
}

interface ParsedJobDescription {
  overviewParagraphs: string[];
  responsibilities: string[];
  skills: string[];
  eligibility: string[];
  benefits: string[];
  whoShouldApply: string[];
  howToApply: string[];
  detectedSalary?: string;
  detectedExperience?: string;
}

function parseJobDescription(text: string = ""): ParsedJobDescription {
  const result: ParsedJobDescription = {
    overviewParagraphs: [],
    responsibilities: [],
    skills: [],
    eligibility: [],
    benefits: [],
    whoShouldApply: [],
    howToApply: [],
  };

  if (!text) return result;

  const lines = text.split("\n");
  let currentSection = "overview";

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const salaryMatch = line.match(/(?:Salary|Annual CTC|Compensation)\s*:\s*(₹?[0-9.]+\s*LPA)/i);
    if (salaryMatch && !result.detectedSalary) {
      result.detectedSalary = salaryMatch[1];
    }

    const expMatch = line.match(/(?:Experience)\s*:\s*([^,\n]+)/i);
    if (expMatch && !result.detectedExperience) {
      result.detectedExperience = expMatch[1].trim();
    }

    if (/^(?:###?\s*|\*\*\s*)?(Key Responsibilities|Responsibilities)\s*:?\*?\*?$/i.test(line)) {
      currentSection = "responsibilities";
    } else if (/^(?:###?\s*|\*\*\s*)?(Required Skills|Qualifications & Skills|Skills Required)\s*:?\*?\*?$/i.test(line)) {
      currentSection = "skills";
    } else if (/^(?:###?\s*|\*\*\s*)?(Eligibility Criteria|Eligibility)\s*:?\*?\*?$/i.test(line)) {
      currentSection = "eligibility";
    } else if (/^(?:###?\s*|\*\*\s*)?(Salary and Benefits|Benefits & Perks|Benefits|What We Offer)\s*:?\*?\*?$/i.test(line)) {
      currentSection = "benefits";
    } else if (/^(?:###?\s*|\*\*\s*)?(Who Should Apply\??)\s*:?\*?\*?$/i.test(line)) {
      currentSection = "whoShouldApply";
    } else if (/^(?:###?\s*|\*\*\s*)?(How to Apply|Application Process|Application Instructions)\s*:?\*?\*?$/i.test(line)) {
      currentSection = "howToApply";
    } else if (/^(?:###?\s*|\*\*\s*)?(Job Overview|Overview|About SparkIntellect)\s*:?\*?\*?$/i.test(line)) {
      currentSection = "overview";
    } else {
      const cleanBullet = line.replace(/^[-*•]\s*/, "");
      if (/^(?:Job Description:|Company:|Job Title:|Employment Type:|Job Level:)/i.test(line)) {
        continue;
      }

      switch (currentSection) {
        case "responsibilities":
          if (line.startsWith("-") || line.startsWith("*") || line.startsWith("•") || cleanBullet.length > 10) {
            result.responsibilities.push(cleanBullet);
          }
          break;
        case "skills":
          if (line.startsWith("-") || line.startsWith("*") || line.startsWith("•") || cleanBullet.length > 5) {
            result.skills.push(cleanBullet);
          }
          break;
        case "eligibility":
          if (line.startsWith("-") || line.startsWith("*") || line.startsWith("•") || cleanBullet.length > 10) {
            result.eligibility.push(cleanBullet);
          }
          break;
        case "benefits":
          if (line.startsWith("-") || line.startsWith("*") || line.startsWith("•") || cleanBullet.length > 5) {
            result.benefits.push(cleanBullet);
          }
          break;
        case "whoShouldApply":
          result.whoShouldApply.push(cleanBullet);
          break;
        case "howToApply":
          result.howToApply.push(cleanBullet);
          break;
        default:
          result.overviewParagraphs.push(line);
          break;
      }
    }
  }

  return result;
}

export default async function CareerDetailPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const career: CareerItem | null = await publicApi.getCareerBySlug(slug);

  if (!career || career.status !== "active") {
    notFound();
  }

  const parsed = parseJobDescription(career.description);

  const displayResponsibilities = parsed.responsibilities.length > 0 
    ? parsed.responsibilities 
    : (career.responsibilities || []);

  const displaySkills = parsed.skills.length > 0
    ? parsed.skills
    : (career.requirements || []);

  const displayBenefits = parsed.benefits.length > 0
    ? parsed.benefits
    : (career.benefits || []);

  const departmentLabel = career.slug === "dna" 
    ? "Data Analytics / Engineering" 
    : career.department || "Engineering";

  const experienceLabel = parsed.detectedExperience || career.experience || "Fresher to 2 Years";
  const salaryLabel = parsed.detectedSalary || "₹3.2 LPA";

  const isHybrid = /hybrid/i.test(career.location || "");
  const baseLocation = career.location?.replace(/Guindy,?\s*/i, "").replace(/\s*\(Hybrid\)/i, "").trim() || "Chennai, India";

  const techPills = career.slug === "dna" 
    ? ["Microsoft Excel", "SQL", "Power BI", "Data Modeling", "Business Analytics"]
    : ["TypeScript", "Python", "SQL", "Cloud Architecture"];

  return (
    <div className="relative min-h-screen bg-[#EEEAF8] text-[#2B2A6B] selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-36 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#2B2A6B]/70 mb-8">
            <Link href="/" className="hover:text-[#2B2A6B] transition-colors">Home</Link>
            <span className="text-[#2B2A6B]/30">/</span>
            <Link href="/careers" className="hover:text-[#2B2A6B] transition-colors">Careers</Link>
            <span className="text-[#2B2A6B]/30">/</span>
            <span className="text-[#2B2A6B] font-semibold">{career.title}</span>
          </nav>

          {/* Hero Spotlight Card */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] shadow-2xl mb-10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4a373]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center gap-3 relative z-10">
              <span className="px-3.5 py-1 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[#EEEAF8] font-mono font-bold text-xs uppercase tracking-wide">
                {departmentLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1E1D4E] text-[#d4a373] border border-[#EEEAF8]/20 font-mono font-semibold text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#d4a373] animate-pulse" />
                <span>Actively Hiring</span>
              </span>
              <span className="text-xs font-mono text-[#EEEAF8]/70">
                Role Code: <strong className="text-white">{career.slug.toUpperCase()}</strong>
              </span>
            </div>

            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#EEEAF8] leading-tight mb-3">
                {career.title}
              </h1>
              <p className="text-base sm:text-lg text-[#EEEAF8]/85 leading-relaxed">
                Join our engineering team in Chennai to build intelligent software platforms and actionable analytics systems.
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#EEEAF8]/15 relative z-10">
              <div className="p-3.5 rounded-2xl bg-[#1E1D4E] border border-[#EEEAF8]/20">
                <div className="text-[10px] font-mono uppercase text-[#EEEAF8]/70 flex items-center gap-1">
                  <IndianRupee className="w-3 h-3 text-[#d4a373]" />
                  <span>Salary (CTC)</span>
                </div>
                <div className="text-sm font-bold text-[#d4a373] mt-0.5">{salaryLabel}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1E1D4E] border border-[#EEEAF8]/20">
                <div className="text-[10px] font-mono uppercase text-[#EEEAF8]/70 flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-[#d4a373]" />
                  <span>Experience</span>
                </div>
                <div className="text-sm font-bold text-[#EEEAF8] mt-0.5">{experienceLabel}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1E1D4E] border border-[#EEEAF8]/20">
                <div className="text-[10px] font-mono uppercase text-[#EEEAF8]/70 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#d4a373]" />
                  <span>Location</span>
                </div>
                <div className="text-sm font-bold text-[#EEEAF8] mt-0.5">{baseLocation}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1E1D4E] border border-[#EEEAF8]/20">
                <div className="text-[10px] font-mono uppercase text-[#EEEAF8]/70 flex items-center gap-1">
                  <Building className="w-3 h-3 text-[#d4a373]" />
                  <span>Work Mode</span>
                </div>
                <div className="text-sm font-bold text-[#EEEAF8] mt-0.5">
                  {career.type} {isHybrid ? "• Hybrid" : ""}
                </div>
              </div>
            </div>

            {/* Apply Action */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 relative z-10">
              <ApplyButtonModalTrigger career={career} />
            </div>
          </div>

          {/* Core Tools & Competencies */}
          <div className="glass-card p-6 rounded-3xl border border-[#EEEAF8]/20 bg-[#2B2A6B]/95 text-[#EEEAF8] shadow-sm mb-8 space-y-3">
            <div className="text-xs font-mono font-bold uppercase text-[#EEEAF8]/80 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4a373]" />
              <span>Core Tools & Core Competencies:</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {techPills.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 text-xs font-mono font-semibold text-[#EEEAF8]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Responsibilities */}
          {displayResponsibilities.length > 0 && (
            <div className="glass-card p-8 sm:p-10 rounded-3xl bg-[#2B2A6B]/95 text-[#EEEAF8] border border-[#EEEAF8]/20 shadow-sm space-y-5 mb-8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[#d4a373] flex items-center justify-center font-bold">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h2 className="text-2xl font-display font-bold text-[#EEEAF8]">
                  Key Responsibilities
                </h2>
              </div>

              <div className="space-y-3.5 pt-2">
                {displayResponsibilities.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#EEEAF8]/85 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#d4a373] shrink-0 mt-1" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Qualifications & Required Skills */}
          {displaySkills.length > 0 && (
            <div className="glass-card p-8 sm:p-10 rounded-3xl bg-[#2B2A6B]/95 text-[#EEEAF8] border border-[#EEEAF8]/20 shadow-sm space-y-5 mb-8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[#d4a373] flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-2xl font-display font-bold text-[#EEEAF8]">
                  Required Skills & Qualifications
                </h2>
              </div>

              <div className="space-y-3.5 pt-2">
                {displaySkills.map((req, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#EEEAF8]/85 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#d4a373] shrink-0 mt-1" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {displayBenefits.length > 0 && (
            <div className="glass-card p-8 sm:p-10 rounded-3xl bg-[#2B2A6B]/95 text-[#EEEAF8] border border-[#EEEAF8]/20 shadow-sm space-y-5 mb-8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[#d4a373] flex items-center justify-center font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <h2 className="text-2xl font-display font-bold text-[#EEEAF8]">
                  Compensation & What We Offer
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {displayBenefits.map((b, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#1E1D4E] border border-[#EEEAF8]/15 text-xs sm:text-sm text-[#EEEAF8]/85 flex items-start gap-2.5 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#d4a373] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Apply CTA Card */}
          <div className="glass-panel p-10 sm:p-12 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] text-center shadow-2xl space-y-6 relative overflow-hidden">
            <div className="max-w-xl mx-auto space-y-2 relative z-10">
              <span className="px-3.5 py-1 rounded-full bg-[#1E1D4E] text-[#d4a373] border border-[#EEEAF8]/20 font-mono text-xs font-bold uppercase tracking-wide">
                Candidate Pipeline
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-[#EEEAF8]">
                Apply for {career.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#EEEAF8]/80 leading-relaxed">
                Submit your candidate information and resume through our secure multi-step portal.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <ApplyButtonModalTrigger career={career} />

              <Link
                href="/careers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-xs glass-btn-secondary"
              >
                <span>Browse Other Positions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

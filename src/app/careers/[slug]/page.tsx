import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { publicApi, CareerItem } from "@/lib/api";
import { COMPANY_INFO } from "@/data/companyData";
import { 
  Briefcase, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Send,
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
    description: career.shortDesc?.slice(0, 160) || `Apply for the ${career.title} position at SparkIntellect in Guindy, Chennai.`,
  };
}

/**
 * Helper to parse structured sections from markdown job descriptions
 */
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

    // Detect salary mention
    const salaryMatch = line.match(/(?:Salary|Annual CTC|Compensation)\s*:\s*(₹?[0-9.]+\s*LPA)/i);
    if (salaryMatch && !result.detectedSalary) {
      result.detectedSalary = salaryMatch[1];
    }

    // Detect experience mention
    const expMatch = line.match(/(?:Experience)\s*:\s*([^,\n]+)/i);
    if (expMatch && !result.detectedExperience) {
      result.detectedExperience = expMatch[1].trim();
    }

    // Section headings detection
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
      // Clean bullet points
      const cleanBullet = line.replace(/^[-*•]\s*/, "");
      
      // Skip meta headers like "Job Title: Data Analyst", "Company: SparkIntellect" inside body
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

  // Parse structured data from stored description
  const parsed = parseJobDescription(career.description);

  // Fallbacks from DB fields if not found in parsed sections
  const displayResponsibilities = parsed.responsibilities.length > 0 
    ? parsed.responsibilities 
    : (career.responsibilities || []);

  const displaySkills = parsed.skills.length > 0
    ? parsed.skills
    : (career.requirements || []);

  const displayBenefits = parsed.benefits.length > 0
    ? parsed.benefits
    : (career.benefits || []);

  // Department display
  const departmentLabel = career.slug === "dna" 
    ? "Data Analytics / Engineering" 
    : career.department || "Engineering";

  // Experience display
  const experienceLabel = parsed.detectedExperience || career.experience || "Fresher to 2 Years";

  // Salary display
  const salaryLabel = parsed.detectedSalary || "₹3.2 LPA";

  // Work arrangement
  const isHybrid = /hybrid/i.test(career.location || "");
  const baseLocation = career.location?.replace(/\s*\(Hybrid\)/i, "").trim() || "Guindy, Chennai";

  // Key required tech tags (especially for Data Analyst role)
  const techPills = career.slug === "dna" 
    ? ["Microsoft Excel", "SQL", "Power BI", "Data Modeling", "Business Analytics"]
    : ["TypeScript", "Python", "SQL", "Cloud Architecture"];

  // Email apply subject & body
  const applySubject = `Application for ${career.title} (Ref: ${career.slug.toUpperCase()}) - SparkIntellect`;
  const applyBody = `Hi SparkIntellect Recruitment Team,%0D%0A%0D%0AI would like to apply for the position of ${encodeURIComponent(career.title)} (${encodeURIComponent(departmentLabel)}) in ${encodeURIComponent(baseLocation)}.%0D%0A%0D%0AMy Details:%0D%0A- Full Name:%0D%0A- Mobile Number:%0D%0A- Current Location:%0D%0A- Relevant Experience / Graduation Year:%0D%0A- Key Skills (Excel, SQL, Power BI):%0D%0A- LinkedIn / Portfolio / GitHub Link:%0D%0A%0D%0APlease find my resume attached for your consideration.%0D%0A%0D%0AThank you,%0D%0A`;

  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#334155] mb-8">
            <Link href="/" className="hover:text-[#0B1220] transition-colors">Home</Link>
            <span className="text-slate-400">/</span>
            <Link href="/careers" className="hover:text-[#0B1220] transition-colors">Careers</Link>
            <span className="text-slate-400">/</span>
            <span className="text-[#0284c7] font-semibold">{career.title}</span>
          </nav>

          {/* Hero Spotlight Card */}
          <div className="luxury-card p-8 sm:p-12 rounded-3xl border border-[#BEE0FF] bg-gradient-to-br from-white via-[#F2F9FF] to-white shadow-xl mb-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-[#D6EBFF] text-[#0284c7] font-mono font-bold text-xs uppercase tracking-wide">
                {departmentLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-semibold text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Actively Hiring</span>
              </span>
              <span className="text-xs font-mono text-[#334155]">
                Role Code: <strong className="text-[#0B1220]">{career.slug.toUpperCase()}</strong>
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B1220] leading-tight mb-3">
                {career.title}
              </h1>
              <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
                Join our engineering team in Guindy, Chennai to build intelligent data pipelines, automated dashboards, and actionable analytics systems.
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#BEE0FF]">
              <div className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF] shadow-sm">
                <div className="text-[10px] font-mono uppercase text-[#334155] flex items-center gap-1">
                  <IndianRupee className="w-3 h-3 text-[#0284c7]" />
                  <span>Salary (CTC)</span>
                </div>
                <div className="text-sm font-bold text-[#0284c7] mt-0.5">{salaryLabel}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF] shadow-sm">
                <div className="text-[10px] font-mono uppercase text-[#334155] flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-[#0284c7]" />
                  <span>Experience</span>
                </div>
                <div className="text-sm font-bold text-[#0B1220] mt-0.5">{experienceLabel}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF] shadow-sm">
                <div className="text-[10px] font-mono uppercase text-[#334155] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#0284c7]" />
                  <span>Location</span>
                </div>
                <div className="text-sm font-bold text-[#0B1220] mt-0.5">{baseLocation}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF] shadow-sm">
                <div className="text-[10px] font-mono uppercase text-[#334155] flex items-center gap-1">
                  <Building className="w-3 h-3 text-[#0284c7]" />
                  <span>Work Mode</span>
                </div>
                <div className="text-sm font-bold text-[#0B1220] mt-0.5">
                  {career.type} {isHybrid ? "• Hybrid" : ""}
                </div>
              </div>
            </div>

            {/* Top Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${COMPANY_INFO.careersEmail}?subject=${encodeURIComponent(applySubject)}&body=${applyBody}`}
                className="px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-lg shadow-[#9FCFFB]/40 transition-all flex items-center justify-center gap-2 group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                <span>Apply for this Role via Email</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="px-8 py-4 rounded-full font-semibold text-sm bg-white text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-all flex items-center justify-center gap-2 text-center"
              >
                <PhoneCall className="w-4 h-4 text-[#0284c7]" />
                <span>Call Recruitment Desk</span>
              </a>
            </div>
          </div>

          {/* Core Tools & Competencies */}
          <div className="luxury-card p-6 rounded-3xl border border-[#BEE0FF] bg-white shadow-sm mb-8 space-y-3">
            <div className="text-xs font-mono font-bold uppercase text-[#0B1220] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0284c7]" />
              <span>Core Tools & Core Competencies:</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {techPills.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs font-mono font-semibold text-[#0B1220]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Overview & About Company */}
          <div className="luxury-card p-8 sm:p-10 rounded-3xl border border-[#BEE0FF] bg-white shadow-sm space-y-6 mb-8">
            <h2 className="text-2xl font-serif font-bold text-[#0B1220]">
              About the Position
            </h2>
            
            <div className="space-y-4 text-sm text-[#334155] leading-relaxed">
              {parsed.overviewParagraphs.length > 0 ? (
                parsed.overviewParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))
              ) : (
                <p>{career.shortDesc || career.description}</p>
              )}
            </div>
          </div>

          {/* Key Responsibilities */}
          {displayResponsibilities.length > 0 && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#BEE0FF] shadow-sm space-y-5 mb-8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#D6EBFF] text-[#0284c7] flex items-center justify-center font-bold">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#0B1220]">
                  Key Responsibilities
                </h2>
              </div>

              <div className="space-y-3.5 pt-2">
                {displayResponsibilities.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#334155] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-1" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Qualifications & Required Skills */}
          {displaySkills.length > 0 && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#BEE0FF] shadow-sm space-y-5 mb-8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#D6EBFF] text-[#0284c7] flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#0B1220]">
                  Required Skills & Qualifications
                </h2>
              </div>

              <div className="space-y-3.5 pt-2">
                {displaySkills.map((req, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#334155] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-1" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Eligibility Criteria (if available) */}
          {parsed.eligibility.length > 0 && (
            <div className="p-8 sm:p-10 rounded-3xl bg-[#F2F9FF] border border-[#BEE0FF] shadow-sm space-y-5 mb-8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#BEE0FF] text-[#0284c7] flex items-center justify-center font-bold">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#0B1220]">
                  Eligibility Criteria
                </h2>
              </div>

              <div className="space-y-3 pt-2">
                {parsed.eligibility.map((crit, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#334155] leading-relaxed">
                    <Check className="w-4 h-4 text-[#0284c7] shrink-0 mt-1" />
                    <span>{crit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Salary, Benefits & Growth */}
          {displayBenefits.length > 0 && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#BEE0FF] shadow-sm space-y-5 mb-8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#D6EBFF] text-[#0284c7] flex items-center justify-center font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#0B1220]">
                  Compensation & What We Offer
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {displayBenefits.map((b, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs sm:text-sm text-[#0B1220] flex items-start gap-2.5 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How to Apply & Guidelines */}
          {parsed.howToApply.length > 0 && (
            <div className="p-7 rounded-3xl bg-white border border-[#BEE0FF] shadow-sm space-y-3 mb-10">
              <div className="text-xs font-mono font-bold uppercase text-[#0B1220] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0284c7]" />
                <span>Application Instructions:</span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-[#334155] leading-relaxed">
                {parsed.howToApply.map((ins, i) => (
                  <p key={i}>{ins}</p>
                ))}
              </div>
            </div>
          )}

          {/* Apply CTA Card */}
          <div className="luxury-card p-10 sm:p-12 rounded-3xl border border-[#BEE0FF] bg-gradient-to-br from-[#D6EBFF] via-[#BEE0FF] to-[#9FCFFB] text-center shadow-xl space-y-6">
            <div className="max-w-xl mx-auto space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-white/80 text-[#0B1220] font-mono text-xs font-bold uppercase tracking-wide">
                Direct Hiring Channel
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1220]">
                Apply for {career.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#0B1220]/80 leading-relaxed">
                Send your updated resume along with any GitHub repositories, Power BI dashboards, or project portfolios directly to our technical talent team in Chennai.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${COMPANY_INFO.careersEmail}?subject=${encodeURIComponent(applySubject)}&body=${applyBody}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm bg-[#0B1220] text-white hover:bg-slate-800 shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                <span>Send Application Email</span>
              </a>

              <Link
                href="/careers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-xs bg-white text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-all"
              >
                <span>Browse Other Positions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="text-xs text-[#0B1220]/70 pt-2">
              Official Recruitment Email:{" "}
              <a
                href={`mailto:${COMPANY_INFO.careersEmail}`}
                className="font-bold underline text-[#0B1220] hover:text-[#0284c7]"
              >
                {COMPANY_INFO.careersEmail}
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { publicApi } from "@/lib/api";
import { COMPANY_INFO } from "@/data/companyData";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Send,
  Award
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const careers = await publicApi.getCareers();
    return careers.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const career = await publicApi.getCareerBySlug(slug);
  if (!career || career.status !== "active") {
    return { title: "Position Not Found | SparkIntellect" };
  }

  return {
    title: `${career.title} | SparkIntellect Careers`,
    description: career.shortDesc,
  };
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const career = await publicApi.getCareerBySlug(slug);

  if (!career || career.status !== "active") {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#334155] mb-8">
            <Link href="/" className="hover:text-[#0B1220]">Home</Link>
            <span>/</span>
            <Link href="/careers" className="hover:text-[#0B1220]">Careers</Link>
            <span>/</span>
            <span className="text-[#0284c7] font-semibold">{career.title}</span>
          </div>

          {/* Hero Role Card */}
          <div className="luxury-card p-8 sm:p-12 rounded-3xl border border-[#BEE0FF] bg-gradient-to-br from-white via-[#F2F9FF] to-white shadow-xl mb-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#D6EBFF] text-[#0284c7] font-mono font-bold text-xs">
                {career.department}
              </span>
              <span className="text-xs font-mono text-[#334155]">
                {career.type} • {career.experience}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B1220] leading-tight">
              {career.title}
            </h1>

            <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
              {career.description}
            </p>

            <div className="flex items-center gap-6 text-xs text-[#334155] pt-2 border-t border-[#BEE0FF]">
              <div className="flex items-center gap-1.5 font-semibold text-[#0B1220]">
                <MapPin className="w-4 h-4 text-[#0284c7]" />
                <span>{career.location}</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-[#0B1220]">
                <Clock className="w-4 h-4 text-[#0284c7]" />
                <span>Full-Time Role</span>
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          {career.responsibilities && career.responsibilities.length > 0 && (
            <div className="p-8 rounded-3xl bg-white border border-[#BEE0FF] shadow-sm space-y-4 mb-8">
              <h2 className="text-xl font-serif font-bold text-[#0B1220]">
                Key Responsibilities
              </h2>
              <div className="space-y-3">
                {career.responsibilities.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#334155] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {career.requirements && career.requirements.length > 0 && (
            <div className="p-8 rounded-3xl bg-white border border-[#BEE0FF] shadow-sm space-y-4 mb-8">
              <h2 className="text-xl font-serif font-bold text-[#0B1220]">
                Qualifications & Skills
              </h2>
              <div className="space-y-3">
                {career.requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#334155] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {career.benefits && career.benefits.length > 0 && (
            <div className="p-8 rounded-3xl bg-[#F2F9FF] border border-[#BEE0FF] shadow-sm space-y-4 mb-12">
              <h2 className="text-xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#0284c7]" />
                <span>What We Offer</span>
              </h2>
              <div className="space-y-3">
                {career.benefits.map((b, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220] flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Apply CTA Card */}
          <div className="luxury-card p-10 rounded-3xl border border-[#BEE0FF] bg-gradient-to-r from-[#D6EBFF] to-[#9FCFFB] text-center shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220] mb-3">
              Apply for {career.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#0B1220]/80 max-w-lg mx-auto mb-6">
              Send your resume, GitHub profile, and notable projects directly to our recruitment team in Chennai.
            </p>
            <a
              href={`mailto:${COMPANY_INFO.careersEmail}?subject=Application for ${encodeURIComponent(career.title)}&body=Hi SparkIntellect Team,%0D%0A%0D%0AI would like to apply for the position of ${encodeURIComponent(career.title)}.%0D%0A%0D%0APlease find my resume attached.%0D%0AGitHub/Portfolio:%0D%0APhone Number:`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-[#0B1220] text-white hover:bg-slate-800 shadow-xl transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Email Application to {COMPANY_INFO.careersEmail}</span>
            </a>
          </div>

        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

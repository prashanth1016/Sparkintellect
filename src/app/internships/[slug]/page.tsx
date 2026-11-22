import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { publicApi } from "@/lib/api";
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles
} from "lucide-react";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const internship = await publicApi.getInternshipBySlug(slug);
  if (!internship) {
    return { title: "Internship Not Found | SparkIntellect" };
  }

  return {
    title: `${internship.title} Internship | SparkIntellect`,
    description: internship.shortDescription,
  };
}

export default async function InternshipDetailPage({ params }: Props) {
  const { slug } = await params;
  const internship = await publicApi.getInternshipBySlug(slug);

  if (!internship) {
    notFound();
  }

  const isClosed = !internship.published || internship.status !== "open";

  return (
    <div className="relative min-h-screen bg-[#EEEAF8] text-[#2B2A6B] selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-36 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#2B2A6B]/70 mb-8">
            <Link href="/" className="hover:text-[#2B2A6B] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/internships" className="hover:text-[#2B2A6B] transition-colors">Internships</Link>
            <span>/</span>
            <span className="text-[#2B2A6B] font-medium">{internship.title}</span>
          </div>

          {/* Hero Spotlight Card */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] shadow-2xl mb-10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4a373]/15 blur-3xl rounded-full pointer-events-none" />

            <div className="flex flex-wrap items-center gap-3 relative z-10">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${
                isClosed
                  ? "bg-rose-950/60 text-rose-400 border-rose-800"
                  : "bg-[#1E1D4E] text-[#d4a373] border-[#EEEAF8]/20"
              }`}>
                {isClosed ? "APPLICATIONS CLOSED" : "APPLICATIONS OPEN"}
              </span>
              <span className="text-xs font-mono text-[#EEEAF8]/70">
                Track ID: {internship.slug}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#EEEAF8] leading-tight relative z-10">
              {internship.title}
            </h1>

            <p className="text-base sm:text-lg text-[#EEEAF8]/85 leading-relaxed relative z-10">
              {internship.shortDescription}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#EEEAF8]/15 relative z-10">
              <div className="p-3.5 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20">
                <div className="text-[10px] font-mono uppercase text-[#EEEAF8]/70">Duration</div>
                <div className="text-sm font-bold text-[#EEEAF8] mt-0.5">{internship.duration}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20">
                <div className="text-[10px] font-mono uppercase text-[#EEEAF8]/70">Mode</div>
                <div className="text-sm font-bold text-[#EEEAF8] mt-0.5">{internship.mode}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20">
                <div className="text-[10px] font-mono uppercase text-[#EEEAF8]/70">Location</div>
                <div className="text-sm font-bold text-[#EEEAF8] mt-0.5">{internship.location}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20">
                <div className="text-[10px] font-mono uppercase text-[#d4a373]">Stipend</div>
                <div className="text-sm font-bold text-[#d4a373] mt-0.5">{internship.stipend}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 relative z-10">
              {isClosed ? (
                <div className="p-4 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[#EEEAF8] text-sm font-semibold text-center w-full">
                  Applications for this internship cohort are currently closed. Check back soon for the next cycle.
                </div>
              ) : (
                <>
                  <Link
                    href={`/internships/${internship.slug}/apply`}
                    className="px-8 py-3.5 rounded-full font-bold text-sm glass-btn-primary flex items-center justify-center gap-2 group shadow-xl transition-all"
                  >
                    <span>Proceed to Application</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="tel:+918977177634"
                    className="px-8 py-3.5 rounded-full font-medium text-sm glass-card text-[#EEEAF8] hover:border-[#d4a373]/50 text-center transition-all"
                  >
                    Call Internship Desk
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Full Description & Overview */}
          <div className="glass-card p-8 rounded-2xl bg-[#2B2A6B]/95 text-[#EEEAF8] border border-[#EEEAF8]/20 shadow-xl space-y-6 mb-8">
            <h2 className="text-2xl font-display font-bold text-[#EEEAF8]">
              About the Internship Program
            </h2>
            <p className="text-sm text-[#EEEAF8]/80 leading-relaxed">
              {internship.fullDescription}
            </p>

            <div className="p-4 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20">
              <div className="text-xs font-mono font-bold text-[#d4a373] uppercase mb-1">
                Eligibility:
              </div>
              <p className="text-xs text-[#EEEAF8]/80">{internship.eligibility}</p>
            </div>
          </div>

          {/* Skills & Technologies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-7 rounded-2xl bg-[#2B2A6B]/95 text-[#EEEAF8] border border-[#EEEAF8]/20 shadow-xl space-y-4">
              <h3 className="text-lg font-display font-bold text-[#EEEAF8]">
                What You Will Master:
              </h3>
              <div className="space-y-2">
                {internship.skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#EEEAF8]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#d4a373] shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-7 rounded-2xl bg-[#2B2A6B]/95 text-[#EEEAF8] border border-[#EEEAF8]/20 shadow-xl space-y-4">
              <h3 className="text-lg font-display font-bold text-[#EEEAF8]">
                Technologies & Tools:
              </h3>
              <div className="flex flex-wrap gap-2">
                {internship.technologies.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 text-xs font-mono font-medium text-[#EEEAF8]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits & Certification */}
          <div className="glass-card p-8 rounded-2xl bg-[#2B2A6B]/95 text-[#EEEAF8] border border-[#EEEAF8]/20 shadow-xl space-y-5 mb-12">
            <h3 className="text-xl font-display font-bold text-[#EEEAF8] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#d4a373]" />
              <span>Program Benefits & Certification</span>
            </h3>
            <div className="space-y-3">
              {internship.benefits.map((b, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/15 text-xs text-[#EEEAF8]/90 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#d4a373] shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Apply CTA */}
          {!isClosed && (
            <div className="glass-panel p-10 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] text-center shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#EEEAF8] mb-3">
                Ready to Join the {internship.title} Cohort?
              </h3>
              <p className="text-xs sm:text-sm text-[#EEEAF8]/80 max-w-lg mx-auto mb-6">
                Fill out the online application form. Our technical team in Chennai will review your profile.
              </p>
              <Link
                href={`/internships/${internship.slug}/apply`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm glass-btn-primary shadow-xl transition-all"
              >
                <span>Apply Now For This Track</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

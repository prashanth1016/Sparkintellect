import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { publicApi } from "@/lib/api";
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Building,
  ShieldCheck,
  Clock
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const internships = await publicApi.getInternships();
    return internships.map((i) => ({ slug: i.slug }));
  } catch {
    return [];
  }
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
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#334155] mb-8">
            <Link href="/" className="hover:text-[#0B1220]">Home</Link>
            <span>/</span>
            <Link href="/internships" className="hover:text-[#0B1220]">Internships</Link>
            <span>/</span>
            <span className="text-[#0284c7] font-semibold">{internship.title}</span>
          </div>

          {/* Hero Spotlight Card */}
          <div className="luxury-card p-8 sm:p-12 rounded-3xl border border-[#BEE0FF] bg-gradient-to-br from-white via-[#F2F9FF] to-white shadow-xl mb-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${
                isClosed
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}>
                {isClosed ? "APPLICATIONS CLOSED" : "APPLICATIONS OPEN"}
              </span>
              <span className="text-xs font-mono text-[#334155]">
                Track ID: {internship.slug}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B1220] leading-tight">
              {internship.title}
            </h1>

            <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
              {internship.shortDescription}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#BEE0FF]">
              <div className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF]">
                <div className="text-[10px] font-mono uppercase text-[#334155]">Duration</div>
                <div className="text-sm font-bold text-[#0B1220] mt-0.5">{internship.duration}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF]">
                <div className="text-[10px] font-mono uppercase text-[#334155]">Mode</div>
                <div className="text-sm font-bold text-[#0B1220] mt-0.5">{internship.mode}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF]">
                <div className="text-[10px] font-mono uppercase text-[#334155]">Location</div>
                <div className="text-sm font-bold text-[#0B1220] mt-0.5">{internship.location}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF]">
                <div className="text-[10px] font-mono uppercase text-[#334155]">Stipend</div>
                <div className="text-sm font-bold text-[#0284c7] mt-0.5">{internship.stipend}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              {isClosed ? (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold text-center w-full">
                  Applications for this internship cohort are currently closed. Check back soon for the next cycle.
                </div>
              ) : (
                <>
                  <Link
                    href={`/internships/${internship.slug}/apply`}
                    className="px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-lg shadow-[#9FCFFB]/40 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Online Application</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="tel:+918977177634"
                    className="px-8 py-4 rounded-full font-semibold text-sm bg-white text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-all text-center"
                  >
                    Call Internship Desk
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Full Description & Overview */}
          <div className="luxury-card p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-sm space-y-6 mb-8">
            <h2 className="text-2xl font-serif font-bold text-[#0B1220]">
              About the Internship Program
            </h2>
            <p className="text-sm text-[#334155] leading-relaxed">
              {internship.fullDescription}
            </p>

            <div className="p-4 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF]">
              <div className="text-xs font-mono font-bold text-[#0B1220] uppercase mb-1">
                Eligibility:
              </div>
              <p className="text-xs text-[#334155]">{internship.eligibility}</p>
            </div>
          </div>

          {/* Skills & Technologies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-7 rounded-3xl bg-white border border-[#BEE0FF] shadow-sm space-y-4">
              <h3 className="text-lg font-serif font-bold text-[#0B1220]">
                What You Will Master:
              </h3>
              <div className="space-y-2">
                {internship.skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#0B1220]">
                    <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-[#BEE0FF] shadow-sm space-y-4">
              <h3 className="text-lg font-serif font-bold text-[#0B1220]">
                Technologies & Tools:
              </h3>
              <div className="flex flex-wrap gap-2">
                {internship.technologies.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs font-mono font-semibold text-[#0B1220]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits & Certification */}
          <div className="p-8 rounded-3xl bg-[#F2F9FF] border border-[#BEE0FF] shadow-sm space-y-5 mb-12">
            <h3 className="text-xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#0284c7]" />
              <span>Program Benefits & Certification</span>
            </h3>
            <div className="space-y-3">
              {internship.benefits.map((b, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220] flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Apply CTA */}
          {!isClosed && (
            <div className="luxury-card p-10 rounded-3xl border border-[#BEE0FF] bg-gradient-to-r from-[#D6EBFF] to-[#9FCFFB] text-center shadow-lg">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220] mb-3">
                Ready to Join the {internship.title} Cohort?
              </h3>
              <p className="text-xs sm:text-sm text-[#0B1220]/80 max-w-lg mx-auto mb-6">
                Fill out the 2-minute online application form. Our recruitment desk in Guindy, Chennai will review your profile.
              </p>
              <Link
                href={`/internships/${internship.slug}/apply`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-[#0B1220] text-white hover:bg-slate-800 shadow-xl transition-all"
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

import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { CASE_STUDIES } from "@/data/companyData";
import { publicApi } from "@/lib/api";
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, Layers } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) {
    try {
      const allStudies = await publicApi.getCaseStudies();
      study = allStudies.find((s) => s.slug === slug);
    } catch {
      // fallback
    }
  }

  if (!study) {
    return { title: "Case Study Not Found | SparkIntellect" };
  }

  return {
    title: `${study.title} | SparkIntellect Case Study`,
    description: study.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  let study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) {
    try {
      const allStudies = await publicApi.getCaseStudies();
      study = allStudies.find((s) => s.slug === slug);
    } catch {
      // fallback
    }
  }

  if (!study) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-[#EEEAF8] text-[#2B2A6B] selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-36 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#2B2A6B]/70 mb-8">
            <Link href="/" className="hover:text-[#2B2A6B] transition-colors">Home</Link>
            <span className="text-[#2B2A6B]/30">/</span>
            <Link href="/case-studies" className="hover:text-[#2B2A6B] transition-colors">Case Studies</Link>
            <span className="text-[#2B2A6B]/30">/</span>
            <span className="text-[#2B2A6B] font-semibold">{study.client}</span>
          </div>

          {/* Hero Card */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] shadow-2xl mb-12 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4a373]/15 blur-3xl rounded-full pointer-events-none" />

            <div className="flex flex-wrap items-center gap-3 relative z-10">
              <span className="px-3.5 py-1 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/20 text-xs font-mono font-bold text-[#d4a373]">
                {study.industry}
              </span>
              <span className="text-xs font-mono text-[#EEEAF8]/70">
                {study.service}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#EEEAF8] leading-tight relative z-10">
              {study.title}
            </h1>

            <p className="text-base sm:text-lg text-[#EEEAF8]/85 leading-relaxed relative z-10">
              {study.summary}
            </p>

            {/* Metrics */}
            {study.metrics && study.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08] relative z-10">
                {study.metrics.map((m, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#1E1D4E] border border-[#EEEAF8]/15 text-center">
                    <div className="text-2xl font-display font-bold text-[#d4a373]">{m.value}</div>
                    <div className="text-xs text-[#EEEAF8]/75 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Challenge & Solution */}
          <div className="space-y-8 mb-12">
            <div className="glass-card p-8 rounded-3xl bg-[#2B2A6B]/95 text-[#EEEAF8] border border-[#EEEAF8]/20 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-[#EEEAF8] font-bold text-lg font-display">
                <AlertCircle className="w-5 h-5 text-[#d4a373]" />
                <span>The Operational Challenge</span>
              </div>
              <p className="text-sm text-[#EEEAF8]/85 leading-relaxed">
                {study.challenge}
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl bg-[#2B2A6B]/95 text-[#EEEAF8] border border-[#EEEAF8]/20 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-[#EEEAF8] font-bold text-lg font-display">
                <Sparkles className="w-5 h-5 text-[#d4a373]" />
                <span>The Engineering Solution</span>
              </div>
              <p className="text-sm text-[#EEEAF8]/85 leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Results */}
          {study.results && study.results.length > 0 && (
            <div className="glass-panel p-8 rounded-3xl border border-[#EEEAF8]/20 bg-[#2B2A6B]/95 text-[#EEEAF8] space-y-6 mb-12 shadow-xl">
              <h2 className="text-2xl font-display font-bold text-[#EEEAF8] flex items-center gap-2">
                <Layers className="w-6 h-6 text-[#d4a373]" />
                <span>Verified Commercial Results</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {study.results.map((res, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-[#1E1D4E] border border-[#EEEAF8]/15">
                    <CheckCircle2 className="w-5 h-5 text-[#d4a373] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#EEEAF8]/85 leading-relaxed">{res}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {study.techStack && study.techStack.length > 0 && (
            <div className="glass-card p-8 rounded-3xl border border-[#EEEAF8]/20 bg-[#2B2A6B]/95 text-[#EEEAF8] space-y-4 mb-16 shadow-xl">
              <h3 className="text-sm font-mono font-bold uppercase text-[#EEEAF8]/70 tracking-wider">
                Production Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech) => (
                  <span key={tech} className="px-3.5 py-1.5 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 text-xs font-mono font-semibold text-[#EEEAF8]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Card */}
          <div className="glass-panel p-10 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] text-center shadow-2xl space-y-6">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#EEEAF8]">
              Ready to engineer similar results for your business?
            </h3>
            <p className="text-xs sm:text-sm text-[#EEEAF8]/85 max-w-lg mx-auto">
              Schedule a technical discovery session with our architects. We will evaluate your current workflow and scope a customized implementation.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs glass-btn-primary shadow-xl"
              >
                <span>Schedule Architecture Call</span>
                <ArrowRight className="w-4 h-4" />
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

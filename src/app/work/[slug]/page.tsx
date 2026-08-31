import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CASE_STUDIES } from "@/data/companyData";
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, Building, Layers } from "lucide-react";

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
  const study = CASE_STUDIES.find((s) => s.slug === slug);
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
  const study = CASE_STUDIES.find((s) => s.slug === slug);

  if (!study) {
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
            <Link href="/work" className="hover:text-[#0B1220]">Work</Link>
            <span>/</span>
            <span className="text-[#0284c7] font-semibold">{study.client}</span>
          </div>

          {/* Hero Card */}
          <div className="luxury-card p-8 sm:p-12 rounded-3xl border border-[#BEE0FF] bg-gradient-to-br from-white via-[#F2F9FF] to-white shadow-xl mb-12 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#D6EBFF] border border-[#BEE0FF] text-xs font-mono font-bold text-[#0284c7]">
                {study.industry}
              </span>
              <span className="text-xs font-mono text-[#334155]">
                {study.service}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B1220] leading-tight">
              {study.title}
            </h1>

            <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
              {study.summary}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#BEE0FF]">
              {study.metrics.map((m, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-[#BEE0FF] text-center">
                  <div className="text-2xl font-serif font-bold text-[#0B1220]">{m.value}</div>
                  <div className="text-xs text-[#334155] mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="space-y-8 mb-12">
            <div className="p-8 rounded-3xl bg-[#FFF5F5] border border-rose-200 space-y-4">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-lg font-serif">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <span>The Operational Challenge</span>
              </div>
              <p className="text-sm text-[#0B1220] leading-relaxed">
                {study.challenge}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F0FDF4] border border-emerald-200 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg font-serif">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>The SparkIntellect Solution</span>
              </div>
              <p className="text-sm text-[#0B1220] leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Key Results */}
          <div className="p-8 rounded-3xl bg-white border border-[#BEE0FF] shadow-sm space-y-4 mb-12">
            <h3 className="text-lg font-serif font-bold text-[#0B1220] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#0284c7]" />
              <span>Key Measured Outcomes</span>
            </h3>
            <div className="space-y-3">
              {study.results.map((res, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs font-medium text-[#0B1220] flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] mb-12 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#0B1220] mr-2">Technologies Used:</span>
            {study.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full bg-white border border-[#BEE0FF] text-xs font-mono font-semibold text-[#0B1220]">
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="luxury-card p-10 rounded-3xl border border-[#BEE0FF] bg-gradient-to-r from-[#D6EBFF] to-[#9FCFFB] text-center shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220] mb-3">
              Looking for Similar Results for Your Business?
            </h3>
            <p className="text-xs sm:text-sm text-[#0B1220]/80 max-w-lg mx-auto mb-6">
              Let&apos;s discuss how custom AI models or tailored enterprise software can streamline your operations.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-[#0B1220] text-white hover:bg-slate-800 shadow-xl transition-all"
            >
              <span>Start a Project Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

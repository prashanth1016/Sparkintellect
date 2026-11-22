import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { Spotlight, SpotLightItem } from "@/components/ui/Spotlight";
import { publicApi, CaseStudyItem } from "@/lib/api";
import { CASE_STUDIES } from "@/data/companyData";
import { ArrowRight, Sparkles, TrendingUp, Cpu, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies & Client Systems | SparkIntellect",
  description:
    "Explore enterprise software platforms, AI copilots, construction ERPs, and automation systems delivered by SparkIntellect.",
};

export default async function CaseStudiesPage() {
  let caseStudies: CaseStudyItem[] = [];
  try {
    const data = await publicApi.getCaseStudies();
    if (data && data.length > 0) {
      caseStudies = data;
    } else {
      caseStudies = CASE_STUDIES;
    }
  } catch {
    caseStudies = CASE_STUDIES;
  }

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#EEEAF8] text-[#2B2A6B] selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 sm:pb-24 w-full max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Verified Commercial Impact"
            title="Proof in"
            highlightTitle="Production"
            subtitle="Explore how our engineering teams partner with businesses to solve complex operational bottlenecks and deliver quantifiable commercial ROI."
          />

          <Spotlight className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {caseStudies.map((study, idx) => (
              <GridStaggerItem key={study.slug || idx} index={idx}>
                <SpotLightItem className="h-full">
                  <div className="p-8 h-full flex flex-col justify-between">
                    <div className="space-y-5">
                      {/* Top Meta */}
                      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#d4a373] px-3 py-1 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/20">
                          {study.industry}
                        </span>
                        <span className="text-xs font-mono text-[#EEEAF8]/70">
                          {study.service}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-display font-bold text-[#EEEAF8] leading-snug group-hover:text-white transition-colors">
                        {study.title}
                      </h2>

                      {/* Summary */}
                      <p className="text-xs text-[#EEEAF8]/80 leading-relaxed line-clamp-3">
                        {study.summary}
                      </p>

                      {/* Metrics Badges */}
                      {study.metrics && study.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-2.5 pt-2">
                          {study.metrics.slice(0, 2).map((m, i) => (
                            <div key={i} className="p-3.5 rounded-2xl bg-[#1E1D4E] border border-[#EEEAF8]/15">
                              <div className="text-xl font-bold font-display text-[#d4a373]">{m.value}</div>
                              <div className="text-[10px] text-[#EEEAF8]/70 truncate mt-0.5">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack Pills */}
                      {study.techStack && study.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {study.techStack.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2.5 py-0.5 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/15 text-[10px] font-mono text-[#EEEAF8]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Read More Link */}
                    <div className="pt-6 mt-6 border-t border-white/[0.08]">
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="text-xs font-bold text-[#EEEAF8] hover:text-[#d4a373] flex items-center gap-1.5 transition-colors group/link"
                      >
                        <span>Read Detailed Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform text-[#d4a373]" />
                      </Link>
                    </div>
                  </div>
                </SpotLightItem>
              </GridStaggerItem>
            ))}
          </Spotlight>

          {/* Bottom Enterprise Banner */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[11px] font-mono font-bold text-[#d4a373] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4a373]" />
                <span>Enterprise Delivery Guarantee</span>
              </span>
              <h4 className="text-lg sm:text-xl font-display font-bold text-[#EEEAF8]">
                Ready to deploy measurable technology in your enterprise?
              </h4>
              <p className="text-xs text-[#EEEAF8]/80 max-w-xl">
                Every software system includes end-to-end automated testing, zero-downtime CI/CD deployment, and 100% intellectual property transfer.
              </p>
            </div>

            <Link
              href="/contact"
              className="glass-btn-primary px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-[#2B2A6B] inline-flex items-center gap-2 shrink-0 shadow-lg hover:scale-105 transition-all"
            >
              <span>Schedule Architecture Call</span>
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

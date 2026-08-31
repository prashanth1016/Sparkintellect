import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { CASE_STUDIES } from "@/data/companyData";
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies & Client Work | SparkIntellect",
  description:
    "Explore real-world software platforms, AI copilots, construction ERPs, and automation systems delivered by SparkIntellect.",
};

export default function WorkPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Case Studies & Results"
            title="Software Platforms Built for"
            highlightTitle="Real-World Impact"
            subtitle="Explore how our engineering teams partner with businesses to solve complex operational challenges and deliver verifiable commercial ROI."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {CASE_STUDIES.map((study, idx) => (
              <GridStaggerItem key={study.id} index={idx}>
                <div className="luxury-card luxury-card-hover rounded-3xl border border-[#BEE0FF] p-8 h-full flex flex-col justify-between bg-white">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-3">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#0284c7] px-2.5 py-0.5 rounded-full bg-[#D6EBFF]">
                        {study.industry}
                      </span>
                      <span className="text-xs font-mono text-[#334155]">
                        {study.service}
                      </span>
                    </div>

                    <h2 className="text-2xl font-serif font-bold text-[#0B1220] leading-snug">
                      {study.title}
                    </h2>

                    <p className="text-xs text-[#334155] leading-relaxed">
                      {study.summary}
                    </p>

                    {/* Metrics Badges */}
                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      {study.metrics.slice(0, 2).map((m, i) => (
                        <div key={i} className="p-3 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF]">
                          <div className="text-base font-bold font-serif text-[#0B1220]">{m.value}</div>
                          <div className="text-[10px] text-[#334155]">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {study.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded-full bg-[#F2F9FF] border border-[#BEE0FF] text-[10px] font-mono text-[#334155]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#BEE0FF]">
                    <Link
                      href={`/work/${study.slug}`}
                      className="text-xs font-bold text-[#0B1220] hover:text-[#0284c7] flex items-center gap-1.5 transition-colors group"
                    >
                      <span>Read Detailed Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#0284c7]" />
                    </Link>
                  </div>
                </div>
              </GridStaggerItem>
            ))}
          </div>

        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

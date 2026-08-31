"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Cpu, ShieldCheck } from "lucide-react";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CASE_STUDIES } from "@/data/companyData";

export const CaseStudiesSection: React.FC = () => {
  return (
    <SectionWrapper id="work" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Proven Track Record"
          title="Engineered for"
          highlightTitle="Real-World Impact"
          subtitle="Discover how SparkIntellect partners with businesses to eliminate operational bottlenecks with intelligent software."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {CASE_STUDIES.map((study, idx) => (
            <GridStaggerItem key={study.id} index={idx}>
              <div className="luxury-card luxury-card-hover rounded-3xl border border-[#BEE0FF] p-8 h-full flex flex-col justify-between bg-white">
                <div className="space-y-5">
                  {/* Category & Client Header */}
                  <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-3">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#0284c7] px-2.5 py-0.5 rounded-full bg-[#D6EBFF]">
                      {study.industry}
                    </span>
                    <span className="text-xs font-mono text-[#334155]">
                      {study.service}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#0B1220] leading-snug">
                    {study.title}
                  </h3>

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

                  {/* Tech stack */}
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
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#0284c7]" />
                  </Link>
                </div>
              </div>
            </GridStaggerItem>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md transition-all"
          >
            <span>Explore All Client Work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </SectionWrapper>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Bot, 
  Cpu, 
  Zap, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Activity
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Spotlight, SpotLightItem } from "@/components/ui/Spotlight";
import { publicApi, CaseStudyItem } from "@/lib/api";
import { CASE_STUDIES } from "@/data/companyData";

const CATEGORIES = [
  { id: "all", label: "All Production Case Studies" },
  { id: "ai", label: "AI & Neural Copilots" },
  { id: "erp", label: "Enterprise ERP Systems" },
  { id: "automation", label: "Workflow Automation" },
];

export const CaseStudiesSection: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await publicApi.getCaseStudies();
        if (data && data.length > 0) {
          setCaseStudies(data.slice(0, 3));
        } else {
          setCaseStudies(CASE_STUDIES.slice(0, 3));
        }
      } catch {
        setCaseStudies(CASE_STUDIES.slice(0, 3));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const featuredStudy = caseStudies[0] || CASE_STUDIES[0];
  const secondaryStudies = caseStudies.slice(1);

  return (
    <SectionWrapper id="case-studies" className="py-24 sm:py-32 bg-[#EEEAF8] border-t border-[#2B2A6B]/15 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[500px] bg-[#2B2A6B]/[0.08] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[450px] bg-[#d4a373]/[0.08] blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Commercial Impact"
          title="Proof in"
          highlightTitle="Production"
          subtitle="Real software platforms, AI copilots, and cloud infrastructures delivering measurable operational ROI for business clients."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-[#d4a373] text-[#2B2A6B] font-bold shadow-lg shadow-[#d4a373]/40 scale-105"
                  : "bg-[#2B2A6B] text-[#EEEAF8]/80 border border-[#EEEAF8]/20 hover:border-[#d4a373] hover:text-[#d4a373]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
            <div className="lg:col-span-7 glass-card rounded-3xl p-8 h-96 animate-pulse bg-white/[0.03]" />
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card rounded-3xl p-8 h-44 animate-pulse bg-white/[0.03]" />
              <div className="glass-card rounded-3xl p-8 h-44 animate-pulse bg-white/[0.03]" />
            </div>
          </div>
        ) : (
          /* Spotlight Animated Showcase Bento */
          <Spotlight
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-14 items-stretch"
            ProximitySpotlight={true}
            HoverFocusSpotlight={true}
            CursorFlowGradient={true}
          >
            
            {/* FEATURED SPOTLIGHT CARD: 7 COLUMNS (Flagship AI Platform) */}
            <SpotLightItem className="lg:col-span-7 h-full">
              <div className="p-7 sm:p-10 h-full flex flex-col justify-between space-y-8">
                
                {/* Header Meta: Category, Client, Status */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEEAF8]/15 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#d4a373] animate-pulse" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#d4a373]">
                        {featuredStudy.industry}
                      </span>
                      <span className="text-[#EEEAF8]/40">•</span>
                      <span className="text-xs font-mono text-[#EEEAF8]/80 font-medium">
                        {featuredStudy.client}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[10px] font-mono font-bold text-[#EEEAF8]">
                      <Activity className="w-3 h-3 text-[#d4a373]" />
                      <span>PRODUCTION VERIFIED</span>
                    </div>
                  </div>

                  {/* Title & Core Summary */}
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#EEEAF8] leading-tight group-hover:text-white transition-colors">
                      {featuredStudy.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#EEEAF8]/85 leading-relaxed">
                      {featuredStudy.summary}
                    </p>
                  </div>

                  {/* The Problem & Solution Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-[#1E1D4E]/80 border border-[#EEEAF8]/15 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#EEEAF8]/60 uppercase tracking-wider block">
                        System Bottleneck
                      </span>
                      <p className="text-xs text-[#EEEAF8]/80 leading-snug">
                        {featuredStudy.challenge}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#1E1D4E] border border-[#EEEAF8]/20 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#d4a373] uppercase tracking-wider block flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#d4a373]" />
                        <span>Engineered Architecture</span>
                      </span>
                      <p className="text-xs text-[#EEEAF8]/90 leading-snug">
                        {featuredStudy.solution}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Spotlight Grid */}
                  {featuredStudy.metrics && featuredStudy.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {featuredStudy.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="p-3.5 sm:p-4 rounded-2xl bg-[#1E1D4E]/90 border border-[#EEEAF8]/20 text-center shadow-lg"
                        >
                          <div className="text-xl sm:text-2xl font-display font-black text-[#d4a373] mb-0.5">
                            {m.value}
                          </div>
                          <div className="text-[10px] sm:text-[11px] font-mono text-[#EEEAF8]/70 leading-tight">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Production Results Checklist */}
                  {featuredStudy.results && (
                    <div className="space-y-2 pt-2 border-t border-[#EEEAF8]/15">
                      <span className="text-[10px] font-mono font-bold text-[#EEEAF8]/70 uppercase tracking-wider block mb-2">
                        Validated Business Results:
                      </span>
                      {featuredStudy.results.map((res, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-[#EEEAF8] font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#d4a373] shrink-0 mt-0.5" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer: Tech Stack & CTA */}
                <div className="pt-6 border-t border-[#EEEAF8]/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Tech stack */}
                  {featuredStudy.techStack && (
                    <div className="flex flex-wrap gap-1.5">
                      {featuredStudy.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full bg-[#EEEAF8]/10 border border-[#EEEAF8]/15 text-[10px] font-mono text-[#EEEAF8]/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/case-studies/${featuredStudy.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs glass-btn-primary shadow-lg self-start sm:self-auto shrink-0 group/link"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform" />
                  </Link>
                </div>

              </div>
            </SpotLightItem>

            {/* SECONDARY SPOTLIGHT CARDS: 5 COLUMNS (Stacked Companion Cards) */}
            <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 h-full">
              {secondaryStudies.map((study, idx) => (
                <SpotLightItem key={study.slug || idx} className="flex-1">
                  <div className="p-6 sm:p-8 h-full flex flex-col justify-between space-y-5">
                    
                    <div>
                      {/* Category Header */}
                      <div className="flex items-center justify-between border-b border-[#EEEAF8]/15 pb-3 mb-4">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#d4a373] px-2.5 py-1 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/20">
                          {study.industry}
                        </span>
                        <span className="text-xs font-mono text-[#EEEAF8]/80">
                          {study.client}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg sm:text-xl font-display font-bold text-[#EEEAF8] group-hover:text-white transition-colors leading-snug mb-2.5">
                        {study.title}
                      </h4>

                      <p className="text-xs text-[#EEEAF8]/80 leading-relaxed mb-4 line-clamp-2">
                        {study.summary}
                      </p>

                      {/* High-Impact Metrics Grid */}
                      {study.metrics && (
                        <div className="grid grid-cols-2 gap-2.5 mb-4">
                          {study.metrics.slice(0, 2).map((m, i) => (
                            <div key={i} className="p-3 rounded-2xl bg-[#1E1D4E]/80 border border-[#EEEAF8]/20">
                              <div className="text-lg font-display font-bold text-[#d4a373]">{m.value}</div>
                              <div className="text-[10px] font-mono text-[#EEEAF8]/70 truncate">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech stack tags */}
                      {study.techStack && (
                        <div className="flex flex-wrap gap-1.5">
                          {study.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-full bg-[#EEEAF8]/10 border border-[#EEEAF8]/15 text-[10px] font-mono text-[#EEEAF8]/70"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA Link */}
                    <div className="pt-4 border-t border-[#EEEAF8]/15">
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="text-xs font-bold text-[#d4a373] hover:text-white flex items-center justify-between transition-colors group/link"
                      >
                        <span>Explore Deep Dive Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform text-[#d4a373]" />
                      </Link>
                    </div>

                  </div>
                </SpotLightItem>
              ))}
            </div>

          </Spotlight>
        )}

        {/* Global Production SLA Guarantee Ribbon */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl mb-12">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-mono font-bold text-[#d4a373] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#d4a373]" />
              <span>Enterprise Delivery Guarantee</span>
            </span>
            <h4 className="text-base sm:text-lg font-display font-bold text-[#EEEAF8]">
              Zero Vendor Lock-In & 100% Intellectual Property Ownership Transferred
            </h4>
            <p className="text-xs text-[#EEEAF8]/80">
              Every production release includes automated test suites, CI/CD pipelines, and clean architecture documentation.
            </p>
          </div>

          <Link
            href="/case-studies"
            className="glass-btn-primary px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-[#2B2A6B] inline-flex items-center gap-2 shrink-0 shadow-lg hover:scale-105 transition-all"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default CaseStudiesSection;

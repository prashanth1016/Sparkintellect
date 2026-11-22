"use client";

import React from "react";
import Link from "next/link";
import { 
  Bot, 
  Globe, 
  Smartphone, 
  Cpu, 
  Zap, 
  Cloud, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Activity,
  Layers,
  ShieldCheck
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { SERVICES } from "@/data/companyData";

const SERVICE_META: Record<string, {
  icon: React.ElementType;
  span: string;
  pill: string;
  highlightMetric: string;
  metricLabel: string;
}> = {
  "ai-development": {
    icon: Bot,
    span: "lg:col-span-7",
    pill: "FLAGSHIP CAPABILITY",
    highlightMetric: "94.8%",
    metricLabel: "RAG Retrieval Accuracy",
  },
  "automation": {
    icon: Zap,
    span: "lg:col-span-5",
    pill: "ZERO-HUMAN DELAY",
    highlightMetric: "+62%",
    metricLabel: "Lead Conversion Uplift",
  },
  "enterprise-software": {
    icon: Cpu,
    span: "lg:col-span-6",
    pill: "LEDGER SYNCHRONIZATION",
    highlightMetric: "4.2x",
    metricLabel: "Approval Cycle Velocity",
  },
  "web-development": {
    icon: Globe,
    span: "lg:col-span-6",
    pill: "EDGE INFRASTRUCTURE",
    highlightMetric: "280ms",
    metricLabel: "Sub-Second Edge Checkout",
  },
  "mobile-development": {
    icon: Smartphone,
    span: "lg:col-span-5",
    pill: "OFFLINE SQLITE SYNC",
    highlightMetric: "99.98%",
    metricLabel: "Crash-Free Mobile Sessions",
  },
  "cloud-devops": {
    icon: Cloud,
    span: "lg:col-span-7",
    pill: "ENTERPRISE RELIABILITY",
    highlightMetric: "99.95%",
    metricLabel: "Guaranteed Production SLA",
  },
};

export const ServicesOverview: React.FC = () => {
  // Map services into ordered Bento structure
  const orderedKeys = [
    "ai-development",
    "automation",
    "enterprise-software",
    "web-development",
    "mobile-development",
    "cloud-devops",
  ];

  const serviceMap = new Map(SERVICES.map((s) => [s.slug, s]));

  return (
    <SectionWrapper id="services" className="py-24 sm:py-32 bg-[#EEEAF8] border-t border-[#2B2A6B]/15 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-5 w-[600px] h-[600px] bg-[#2B2A6B]/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-5 w-[550px] h-[550px] bg-[#d4a373]/[0.08] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-14 sm:mb-20">
          <SectionHeading
            badge="Core Offerings"
            title="Capabilities"
            highlightTitle="Without Limits"
            subtitle="Precision software development and artificial intelligence engineering tailored to your operational requirements."
          />
        </div>

        {/* Dynamic Bento Grid with Liquid Glass Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16">
          {orderedKeys.map((slug) => {
            const service = serviceMap.get(slug);
            if (!service) return null;
            const meta = SERVICE_META[slug] || {
              icon: Sparkles,
              span: "lg:col-span-6",
              pill: "CORE OFFERING",
              highlightMetric: "Production Ready",
              metricLabel: "Enterprise Quality",
            };
            const Icon = meta.icon;

            return (
              <div key={service.id} className={`${meta.span} flex`}>
                <LiquidGlassCard
                  className="w-full p-8 sm:p-10 rounded-[32px] group flex flex-col justify-between"
                  blurIntensity="xl"
                  shadowIntensity="md"
                  glowIntensity="sm"
                  borderRadius="32px"
                  draggable={false}
                >
                  {/* Top Header: Icon & Category Badges */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#EEEAF8]/10 border border-[#EEEAF8]/20 flex items-center justify-center text-[#d4a373] group-hover:bg-[#EEEAF8]/20 group-hover:border-[#d4a373] group-hover:scale-105 transition-all duration-300 shadow-inner">
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4a373] font-bold">
                            {meta.pill}
                          </span>
                          <span className="text-xs text-[#EEEAF8]/80">
                            Enterprise Grade
                          </span>
                        </div>
                      </div>

                      {/* Live Metric Badge */}
                      <div className="text-right">
                        <span className="text-xl sm:text-2xl font-display font-black text-[#d4a373] block">
                          {meta.highlightMetric}
                        </span>
                        <span className="text-[10px] font-mono text-[#EEEAF8]/70 block">
                          {meta.metricLabel}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#EEEAF8] group-hover:text-white transition-colors tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#EEEAF8]/85 leading-relaxed mt-3">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Capabilities Checklist */}
                    <div className="space-y-2.5 pt-2">
                      {service.capabilities.slice(0, slug === "ai-development" || slug === "cloud-devops" ? 4 : 3).map((cap, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-[#EEEAF8] font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#d4a373] shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Footer: Tech Stack Badges & Explore Link */}
                  <div className="pt-6 mt-8 border-t border-white/[0.08] flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {service.techStack.slice(0, slug === "ai-development" ? 4 : 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full bg-[#EEEAF8]/10 border border-[#EEEAF8]/15 text-[10px] font-mono font-semibold text-[#EEEAF8]/80 group-hover:border-[#d4a373]/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#d4a373] hover:text-white transition-colors group/link shrink-0"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </LiquidGlassCard>
              </div>
            );
          })}
        </div>

        {/* Global CTA button */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-bold text-xs uppercase tracking-wider glass-btn-primary shadow-xl hover:scale-105 transition-all"
          >
            <span>View All Detailed Architecture Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default ServicesOverview;

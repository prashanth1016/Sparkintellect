"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import TextAnimation from "@/components/ui/TextAnimation";

// Unique Iconify-inspired engineering SVG glyphs
const IconifyNeuralBrain: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      d="M12 2C6.477 2 2 6.477 2 12c0 3.314 1.612 6.25 4.1 8.04V18a2 2 0 0 1 2-2h1.9a3 3 0 0 0 6 0H18a2 2 0 0 1 2 2v2.04c2.488-1.79 4.1-4.726 4.1-8.04 0-5.523-4.477-10-10-10z"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path
      d="M12 4v4m0 8v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" strokeWidth="1.75" fill="currentColor" fillOpacity="0.25" />
    <circle cx="12" cy="12" r="1.25" fill="currentColor" />
  </svg>
);

const IconifyCodeTerminal: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="2" y="3" width="20" height="18" rx="4" fill="currentColor" fillOpacity="0.12" strokeWidth="1.75" />
    <path d="M7 8h10M7 12l3 2.5L7 17m6 0h4" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="5" cy="6" r="1" fill="currentColor" />
    <circle cx="8" cy="6" r="1" fill="currentColor" />
  </svg>
);

const IconifyWorkflowAutomator: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.12" strokeWidth="1.75" />
    <path
      d="M13 3l-2.5 7.5H16L11 21l2.5-7.5H8.5L13 3z"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const IconifyCloudDevops: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      d="M6.5 19a4.5 4.5 0 0 1-.4-8.98A7 7 0 0 1 19.5 9.5a5 5 0 0 1-1.3 9.5H6.5z"
      fill="currentColor"
      fillOpacity="0.15"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M12 12v6m-2.5-3.5L12 12l2.5 2.5M8.5 15.5l7-7"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CORE_ENGINEERING_TEAM = [
  {
    step: "01",
    role: "AI & Machine Learning Architects",
    tagline: "Custom Neural Models • Enterprise RAG • Autonomous LLM Copilots",
    icon: IconifyNeuralBrain,
    link: "/services/ai-development",
    direction: "down" as const,
  },
  {
    step: "02",
    role: "Full-Stack Platform Engineers",
    tagline: "Type-Safe Next.js & React • Distributed ERP/CRM Portals • Flutter Mobile",
    icon: IconifyCodeTerminal,
    link: "/services/web-development",
    direction: "up" as const,
  },
  {
    step: "03",
    role: "Autonomous Workflow Specialists",
    tagline: "Event-Driven Bots • Webhook Meshes • Zero-Human Delay Pipelines",
    icon: IconifyWorkflowAutomator,
    link: "/services/automation",
    direction: "left" as const,
  },
  {
    step: "04",
    role: "Cloud Infrastructure & SRE Leads",
    tagline: "Docker Containerization • Zero-Downtime CI/CD • Bank-Grade Security",
    icon: IconifyCloudDevops,
    link: "/services/cloud-devops",
    direction: "right" as const,
  },
];

export const WhatWeDoSection: React.FC = () => {
  return (
    <SectionWrapper id="what-we-do" className="py-24 sm:py-32 bg-[#EEEAF8] border-y border-[#2B2A6B]/15 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#2B2A6B]/[0.08] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#d4a373]/[0.08] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Text Animation */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2B2A6B] border border-[#2B2A6B]/30 text-xs font-mono font-bold text-[#EEEAF8] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>CORE ENGINEERING TEAM</span>
          </div>

          <div className="overflow-hidden">
            <TextAnimation
              as="h2"
              text="Where Intelligence Meets Execution"
              direction="up"
              letterAnime={false}
              classname="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#2B2A6B] tracking-tight leading-[1.15]"
            />
          </div>
        </div>

        {/* Core Engineering Team List Animated on Scroll without Grids or Paragraphs */}
        <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto mb-14">
          {CORE_ENGINEERING_TEAM.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.step}
                className="group relative rounded-3xl p-6 sm:p-8 bg-[#2B2A6B]/95 border border-[#EEEAF8]/20 hover:border-[#d4a373]/60 hover:bg-[#2B2A6B] transition-all duration-300 shadow-xl hover:shadow-[0_12px_36px_rgba(43,42,107,0.35)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
                  
                  {/* Left: Unique Icon & Counter & Animated Role Name */}
                  <div className="flex items-start sm:items-center gap-5 sm:gap-6">
                    {/* Unique Iconify Engineering Icon */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#EEEAF8]/10 border border-[#EEEAF8]/20 text-[#d4a373] group-hover:bg-[#EEEAF8]/20 group-hover:border-[#d4a373] group-hover:scale-110 transition-all duration-300 flex items-center justify-center shrink-0 shadow-inner">
                      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-mono font-bold text-[#d4a373] tracking-wider mb-1">
                        DIVISION {item.step}
                      </span>
                      
                      {/* Animated Role Name using Scroll Text Animation */}
                      <TextAnimation
                        as="h3"
                        text={item.role}
                        direction={item.direction}
                        letterAnime={false}
                        classname="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#EEEAF8] group-hover:text-white transition-colors"
                      />

                      <span className="text-xs sm:text-sm font-mono text-[#EEEAF8]/80 tracking-wide mt-2">
                        {item.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Right: Action Link */}
                  <div className="self-end sm:self-center shrink-0">
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#EEEAF8]/10 border border-[#EEEAF8]/25 text-[#EEEAF8] group-hover:bg-[#d4a373] group-hover:text-[#2B2A6B] group-hover:border-[#d4a373] transition-all duration-300 shadow-sm"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
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
            <span>Explore All Engineering Capabilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </SectionWrapper>
  );
};

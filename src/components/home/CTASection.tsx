"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Mail, Clock } from "lucide-react";
import { COMPANY_INFO } from "@/data/companyData";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";

export const CTASection: React.FC = () => {
  return (
    <SectionWrapper className="relative z-10 py-16 sm:py-24 lg:py-32 bg-[#EEEAF8] overflow-hidden w-full max-w-full">
      {/* Background ambient liquid glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] max-w-[90vw] h-[350px] bg-[#2B2A6B]/[0.10] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] max-w-[90vw] h-[300px] bg-[#d4a373]/[0.10] blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Liquid Glass Box Container */}
        <LiquidGlassCard
          draggable={false}
          borderRadius="32px"
          blurIntensity="xl"
          shadowIntensity="lg"
          glowIntensity="md"
          className="p-6 sm:p-12 md:p-16 border border-[#EEEAF8]/25 text-center shadow-2xl bg-[#2B2A6B]/95 text-[#EEEAF8]"
        >
          {/* Ambient Bronze & Indigo flare */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] max-w-[90vw] h-32 bg-gradient-to-b from-[#d4a373]/20 via-[#2B2A6B]/[0.06] to-transparent blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-5 sm:space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#EEEAF8]">
              <Sparkles className="w-4 h-4 text-[#d4a373]" />
              <span>COMMENCE DEVELOPMENT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#EEEAF8] leading-tight tracking-tight">
              Let&apos;s Build{" "}
              <span className="text-gradient-yellow italic block sm:inline">What&apos;s Next.</span>
            </h2>

            <p className="text-[#EEEAF8]/85 text-sm sm:text-base md:text-lg leading-relaxed">
              Schedule an architecture consultation with Founder & CEO Mr. Prashanth and our engineering team. We will analyze your system bottlenecks, map technical specifications, and provide a clear execution roadmap.
            </p>

            <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm glass-btn-primary flex items-center justify-center gap-3 group shadow-xl"
              >
                <span>Request Architecture Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#EEEAF8]/80">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#d4a373]" />
                <span>Direct Mail: {COMPANY_INFO.email}</span>
              </span>
              <span className="text-[#d4a373]">✦</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#d4a373]" />
                <span>Mon–Sat 9AM–7PM IST</span>
              </span>
              <span className="text-[#d4a373]">✦</span>
              <span>Chennai HQ</span>
            </div>
          </div>
        </LiquidGlassCard>

      </div>
    </SectionWrapper>
  );
};

export default CTASection;

"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, Award, Users, Bot, Calendar } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const InternshipCTASection: React.FC = () => {
  return (
    <SectionWrapper className="py-16 sm:py-24 lg:py-32 bg-[#EEEAF8] border-t border-[#2B2A6B]/15 relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-14 border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] shadow-2xl relative overflow-hidden">
          {/* Subtle ambient glow */}
          <div className="absolute top-0 right-0 w-96 max-w-[80vw] h-96 bg-gradient-to-bl from-[#d4a373]/20 via-[#2B2A6B]/[0.05] to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/20 text-xs font-mono font-bold text-[#EEEAF8] shadow-sm">
                <GraduationCap className="w-4 h-4 text-[#d4a373]" />
                <span>CAREERS & STUDENT MENTORSHIP</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#EEEAF8] leading-tight tracking-tight">
                Launch Your Engineering Career With{" "}
                <span className="text-gradient-yellow italic block sm:inline">SparkIntellect</span>
              </h2>

              <p className="text-sm sm:text-base text-[#EEEAF8]/85 leading-relaxed max-w-2xl">
                Work on genuine client systems, deploy production software, receive direct mentorship from senior architects in Chennai, and earn verified industry certification.
              </p>

              {/* 4 Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#1E1D4E]/90 border border-[#EEEAF8]/20 text-center">
                  <Bot className="w-5 h-5 text-[#d4a373] mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-[#EEEAF8] font-display">Live Systems</div>
                  <div className="text-[10px] text-[#EEEAF8]/70">Real production code</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#1E1D4E]/90 border border-[#EEEAF8]/20 text-center">
                  <Users className="w-5 h-5 text-[#d4a373] mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-[#EEEAF8] font-display">1-on-1 Mentorship</div>
                  <div className="text-[10px] text-[#EEEAF8]/70">Founder & Leads</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#1E1D4E]/90 border border-[#EEEAF8]/20 text-center">
                  <Calendar className="w-5 h-5 text-[#d4a373] mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-[#EEEAF8] font-display">Tenure</div>
                  <div className="text-[10px] text-[#EEEAF8]/70">3 to 6 Months</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#1E1D4E]/90 border border-[#EEEAF8]/20 text-center">
                  <Award className="w-5 h-5 text-[#d4a373] mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-[#EEEAF8] font-display">Verified Certs</div>
                  <div className="text-[10px] text-[#EEEAF8]/70">LOR & PPO Pathway</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3.5">
              <Link
                href="/internships"
                className="w-full py-4 px-6 rounded-full font-bold text-xs glass-btn-primary flex items-center justify-center gap-2 shadow-xl"
              >
                <span>Explore Internships</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/careers"
                className="w-full py-4 px-6 rounded-full font-semibold text-xs glass-btn-secondary flex items-center justify-center gap-2"
              >
                <span>View Full-Time Openings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </SectionWrapper>
  );
};

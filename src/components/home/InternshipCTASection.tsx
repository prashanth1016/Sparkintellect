"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, CheckCircle2, Award, Users, Bot, Calendar } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const InternshipCTASection: React.FC = () => {
  return (
    <SectionWrapper className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="luxury-card rounded-3xl p-8 sm:p-14 border border-[#BEE0FF] bg-[#F2F9FF] shadow-lg relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D6EBFF] to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#BEE0FF] text-xs font-semibold text-[#0B1220] shadow-sm">
                <GraduationCap className="w-4 h-4 text-[#0284c7]" />
                <span>Careers & Student Mentorship</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B1220] leading-tight">
                Start Your Technology Career With{" "}
                <span className="text-gradient-navy italic font-serif">SparkIntellect</span>
              </h2>

              <p className="text-base text-[#334155] leading-relaxed max-w-2xl">
                Work on real client projects, deploy production software, receive 1-on-1 mentorship from senior architects in Guindy, Chennai, and earn verified industry certification.
              </p>

              {/* 4 Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF] text-center">
                  <Bot className="w-5 h-5 text-[#0284c7] mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-[#0B1220]">Real Projects</div>
                  <div className="text-[10px] text-[#334155]">Live production code</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF] text-center">
                  <Users className="w-5 h-5 text-[#0284c7] mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-[#0B1220]">1-on-1 Mentorship</div>
                  <div className="text-[10px] text-[#334155]">Founder & Senior Leads</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF] text-center">
                  <Calendar className="w-5 h-5 text-[#0284c7] mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-[#0B1220]">Flexible Tenure</div>
                  <div className="text-[10px] text-[#334155]">3 to 6 Months</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#BEE0FF] text-center">
                  <Award className="w-5 h-5 text-[#0284c7] mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-[#0B1220]">Verified Certificate</div>
                  <div className="text-[10px] text-[#334155]">LOR & PPO Option</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3.5 justify-center">
              <Link
                href="/internships"
                className="px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-lg shadow-[#9FCFFB]/40 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Internships</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/careers"
                className="px-8 py-4 rounded-full font-semibold text-sm bg-white text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-all flex items-center justify-center gap-2"
              >
                <span>View Open Positions</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </SectionWrapper>
  );
};

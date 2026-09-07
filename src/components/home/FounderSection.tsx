import React from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY_INFO, CORE_VALUES } from "@/data/companyData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { 
  Target, 
  Eye, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Lightbulb, 
  Shield, 
  Smile, 
  Users, 
  Award 
} from "lucide-react";

const VALUE_ICONS: Record<string, React.ElementType> = {
  Lightbulb,
  Shield,
  Smile,
  Target,
  Users,
  Award,
};

export const FounderSection: React.FC = () => {
  return (
    <SectionWrapper className="relative z-10 py-24 bg-white border-t border-[#BEE0FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Leadership & Principles"
          title="About SparkIntellect & Our"
          highlightTitle="Founder Vision"
          subtitle="Driven by engineering passion, transparency, and AI excellence, we help organizations transform complex technology into tangible business growth."
        />

        {/* Leadership Grid: Founder & Co-Founder (Screen Split in Half) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16 items-stretch">
          
          {/* Founder Spotlight Card: Prashanth S */}
          <div className="luxury-card p-6 sm:p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-xl flex flex-col justify-between h-full group hover:shadow-2xl transition-all duration-300">
            {/* Top Image Frame that displays the founder fully in the grid */}
            <div className="relative w-full h-80 sm:h-96 lg:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1c1e24] via-[#121418] to-[#0c0e12] shadow-md border border-[#BEE0FF]/60 group flex items-center justify-center">
              <Image
                src="/founder.jpg"
                alt={`${COMPANY_INFO.founder} - ${COMPANY_INFO.founderRole}`}
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-contain object-center group-hover:scale-105 transition-transform duration-700"
                priority
              />

              {/* Floating Leadership Badge */}
              <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/60 text-[11px] font-mono font-bold text-[#0B1220] shadow-sm z-10">
                <Sparkles className="w-3 h-3 text-[#0284c7]" />
                <span>SparkIntellect Founder</span>
              </div>

              {/* Location Badge */}
              <div className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1220]/85 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white shadow-sm z-10">
                <MapPin className="w-3 h-3 text-[#9FCFFB]" />
                <span>{COMPANY_INFO.headquarters}</span>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="pt-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-[#BEE0FF]/60 pb-3">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220] tracking-tight">
                    {COMPANY_INFO.founder}
                  </h3>
                  <span className="text-sm font-semibold text-[#0284c7] font-sans">
                    {COMPANY_INFO.founderRole}
                  </span>
                </div>

                <p className="text-[#334155] text-xs sm:text-sm leading-relaxed">
                  {COMPANY_INFO.founderBio}
                </p>
              </div>

              {/* Founder Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] text-[#0B1220] text-xs sm:text-sm leading-relaxed italic relative mt-auto">
                &quot;Our mission is not merely to build software; it is to engineer intelligent digital infrastructure that simplifies operations and positions our clients at the forefront of their industries.&quot;
                <span className="block mt-2 not-italic text-[10px] font-mono font-bold text-[#0284c7] uppercase tracking-wide">
                  — {COMPANY_INFO.founder}, {COMPANY_INFO.founderRole}
                </span>
              </div>
            </div>
          </div>

          {/* Co-Founder Spotlight Card: Sakthi Pradeep T */}
          <div className="luxury-card p-6 sm:p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-xl flex flex-col justify-between h-full group hover:shadow-2xl transition-all duration-300">
            {/* Top Image Frame that displays the co-founder fully in the grid */}
            <div className="relative w-full h-80 sm:h-96 lg:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1c1e24] via-[#121418] to-[#0c0e12] shadow-md border border-[#BEE0FF]/60 group flex items-center justify-center">
              <Image
                src="/cofounder.jpg"
                alt={`${COMPANY_INFO.coFounder} - ${COMPANY_INFO.coFounderRole}`}
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-contain object-center group-hover:scale-105 transition-transform duration-700"
                priority
              />

              {/* Floating Leadership Badge */}
              <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/60 text-[11px] font-mono font-bold text-[#0B1220] shadow-sm z-10">
                <Sparkles className="w-3 h-3 text-[#0284c7]" />
                <span>SparkIntellect Co-Founder</span>
              </div>

              {/* Location Badge */}
              <div className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1220]/85 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white shadow-sm z-10">
                <MapPin className="w-3.5 h-3.5 text-[#9FCFFB]" />
                <span>{COMPANY_INFO.headquarters}</span>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="pt-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-[#BEE0FF]/60 pb-3">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220] tracking-tight">
                    {COMPANY_INFO.coFounder}
                  </h3>
                  <span className="text-sm font-semibold text-[#0284c7] font-sans">
                    {COMPANY_INFO.coFounderRole}
                  </span>
                </div>

                <p className="text-[#334155] text-xs sm:text-sm leading-relaxed">
                  {COMPANY_INFO.coFounderBio}
                </p>
              </div>

              {/* Co-Founder Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] text-[#0B1220] text-xs sm:text-sm leading-relaxed italic relative mt-auto">
                &quot;Operational excellence, strategic market outreach, and client trust are our highest priorities. We ensure every deliverable exceeds performance expectations and drives measurable business ROI.&quot;
                <span className="block mt-2 not-italic text-[10px] font-mono font-bold text-[#0284c7] uppercase tracking-wide">
                  — {COMPANY_INFO.coFounder}, {COMPANY_INFO.coFounderRole}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Vision & Mission Banner */}
        <div className="luxury-card p-6 sm:p-8 rounded-3xl border border-[#BEE0FF] bg-gradient-to-r from-[#F2F9FF] to-white mb-16 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-white border border-[#BEE0FF] space-y-2">
              <div className="flex items-center gap-2 text-[#0B1220] font-bold text-sm">
                <Eye className="w-4 h-4 text-[#0284c7]" />
                <span>Our Vision</span>
              </div>
              <p className="text-[#334155] text-xs leading-relaxed">
                {COMPANY_INFO.vision}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#BEE0FF] space-y-2">
              <div className="flex items-center gap-2 text-[#0B1220] font-bold text-sm">
                <Target className="w-4 h-4 text-[#0284c7]" />
                <span>Our Mission</span>
              </div>
              <p className="text-[#334155] text-xs leading-relaxed">
                {COMPANY_INFO.mission}
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div>
          <h3 className="text-xl font-serif font-bold text-[#0B1220] text-center mb-8 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#0284c7]" />
            <span>Our 6 Operating Principles</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((val, idx) => {
              const Icon = VALUE_ICONS[val.iconName] || Award;
              return (
                <GridStaggerItem key={val.title} index={idx}>
                  <div className="luxury-card p-6 rounded-2xl border border-[#BEE0FF] flex items-start gap-4 h-full">
                    <div className="w-10 h-10 rounded-xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#0284c7]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-serif font-bold text-[#0B1220] mb-1">{val.title}</h4>
                      <p className="text-[#334155] text-xs leading-relaxed">{val.description}</p>
                    </div>
                  </div>
                </GridStaggerItem>
              );
            })}
          </div>
        </div>

        {/* Learn More Link */}
        <div className="mt-12 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0284c7] hover:underline"
          >
            <span>Read Complete Company Story & Principles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </SectionWrapper>
  );
};

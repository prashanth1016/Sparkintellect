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

        {/* Founder Spotlight Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="luxury-card p-8 sm:p-12 rounded-3xl border border-[#BEE0FF] bg-white shadow-xl relative overflow-hidden">
            {/* Subtle corner decorative accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#D6EBFF]/60 via-transparent to-transparent pointer-events-none rounded-bl-full" />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-10">
              {/* Founder Portrait */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative w-48 sm:w-56 h-64 sm:h-72 rounded-3xl p-1 bg-gradient-to-br from-[#9FCFFB] via-[#0284c7] to-[#0B1220] shadow-2xl group overflow-hidden">
                  <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#0B1220]">
                    <Image
                      src="/founder.jpg"
                      alt={`${COMPANY_INFO.founder} - ${COMPANY_INFO.founderRole}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 240px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#334155] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>{COMPANY_INFO.headquarters}</span>
                </div>
              </div>

              {/* Founder Details */}
              <div className="space-y-4 text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D6EBFF] border border-[#BEE0FF] text-[11px] font-mono font-bold text-[#0B1220]">
                  <Sparkles className="w-3 h-3 text-[#0284c7]" />
                  <span>SparkIntellect Founder</span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1220] tracking-tight">
                    {COMPANY_INFO.founder}
                  </h3>
                  <p className="text-base font-semibold text-[#0284c7] mt-1">
                    {COMPANY_INFO.founderRole}
                  </p>
                </div>

                <p className="text-[#334155] text-sm sm:text-base leading-relaxed">
                  {COMPANY_INFO.founderBio}
                </p>

                {/* Founder Quote */}
                <div className="mt-4 p-5 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] text-[#0B1220] text-xs sm:text-sm leading-relaxed italic relative">
                  &quot;Our mission is not merely to build software; it is to engineer intelligent digital infrastructure that simplifies operations and positions our clients at the forefront of their industries.&quot;
                  <span className="block mt-2 not-italic text-[11px] font-mono font-bold text-[#0284c7] uppercase">
                    — {COMPANY_INFO.founder}, {COMPANY_INFO.founderRole}
                  </span>
                </div>
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

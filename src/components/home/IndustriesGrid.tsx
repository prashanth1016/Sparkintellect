"use client";

import React from "react";
import Link from "next/link";
import { 
  Building, 
  Activity, 
  GraduationCap, 
  ShoppingBag, 
  Factory, 
  Briefcase,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/data/companyData";

const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  "construction": Building,
  "healthcare": Activity,
  "education": GraduationCap,
  "retail": ShoppingBag,
  "manufacturing": Factory,
  "finance": Briefcase,
};

export const IndustriesGrid: React.FC = () => {
  return (
    <SectionWrapper id="industries" className="py-20 bg-[#F2F9FF] border-y border-[#BEE0FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Domain Depth"
          title="Industries We"
          highlightTitle="Empower & Scale"
          subtitle="We tailor our AI models, ERP systems, and cloud portals to the unique regulatory and operational needs of each sector."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {INDUSTRIES.map((ind, idx) => {
            const Icon = INDUSTRY_ICONS[ind.slug] || Sparkles;

            return (
              <GridStaggerItem key={ind.id} index={idx}>
                <div className="luxury-card luxury-card-hover p-8 rounded-3xl border border-[#BEE0FF] h-full flex flex-col justify-between bg-white">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center mb-6 text-[#0284c7]">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#0B1220] mb-2">
                      {ind.name}
                    </h3>

                    <p className="text-xs text-[#0284c7] font-semibold mb-3">
                      {ind.tagline}
                    </p>

                    <p className="text-xs text-[#334155] leading-relaxed mb-4">
                      {ind.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {ind.useCases.slice(0, 3).map((uc, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#F2F9FF] border border-[#BEE0FF] text-[10px] font-mono text-[#0B1220]">
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#BEE0FF]">
                    <Link
                      href={`/industries/${ind.slug}`}
                      className="text-xs font-bold text-[#0B1220] hover:text-[#0284c7] flex items-center gap-1.5 transition-colors group"
                    >
                      <span>Explore {ind.name} Solutions</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#0284c7]" />
                    </Link>
                  </div>
                </div>
              </GridStaggerItem>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md transition-all"
          >
            <span>View All Industry Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </SectionWrapper>
  );
};

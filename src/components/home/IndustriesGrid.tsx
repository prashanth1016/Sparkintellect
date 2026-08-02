import React from "react";
import Link from "next/link";
import { INDUSTRIES } from "@/data/companyData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { 
  ShoppingBag, 
  Sparkles, 
  Factory, 
  GraduationCap, 
  Activity, 
  Building, 
  Utensils, 
  Briefcase,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  ShoppingBag,
  Sparkles,
  Factory,
  GraduationCap,
  Activity,
  Building,
  Utensils,
  Briefcase,
};

export const IndustriesGrid: React.FC = () => {
  return (
    <SectionWrapper className="relative z-10 py-24 border-t border-[#BEE0FF] bg-[#F2F9FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Vertical Domain Expertise"
          title="Transforming Diverse"
          highlightTitle="Industries & Sectors"
          subtitle="Whether you run a fast-paced retail chain, a modern manufacturing plant, a healthcare portal, or a fashion brand, we build specialized digital platforms."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((industry, idx) => {
            const Icon = INDUSTRY_ICONS[industry.iconName] || Briefcase;
            return (
              <GridStaggerItem key={industry.id} index={idx}>
                <div className="luxury-card luxury-card-hover p-6 rounded-2xl border border-[#BEE0FF] flex flex-col justify-between h-full bg-white">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center mb-5 text-[#0B1220]">
                      <Icon className="w-6 h-6 text-[#0284c7]" />
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#0B1220] mb-2">
                      {industry.name}
                    </h3>

                    <p className="text-[#334155] text-xs leading-relaxed mb-4">
                      {industry.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-[#BEE0FF]">
                      <span className="text-[11px] font-mono text-[#0284c7] uppercase font-bold tracking-wider block mb-1">
                        Use Cases:
                      </span>
                      {industry.useCases.map((uc, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-[#0B1220]">
                          <CheckCircle2 className="w-3 h-3 text-[#0284c7] shrink-0" />
                          <span className="truncate">{uc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-4">
                    <Link
                      href={`/industries#${industry.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284c7] hover:underline"
                    >
                      <span>Industry Solution Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </GridStaggerItem>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

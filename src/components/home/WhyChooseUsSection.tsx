import React from "react";
import { WHY_CHOOSE_US } from "@/data/companyData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { ShieldCheck, Cpu, Zap, DollarSign, Lock, Layers, Headphones, Award } from "lucide-react";

export const WhyChooseUsSection: React.FC = () => {
  const icons = [Cpu, Layers, Zap, DollarSign, Lock, ShieldCheck, Headphones, Award];

  return (
    <SectionWrapper className="relative z-10 py-24 bg-white border-t border-[#BEE0FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The SparkIntellect Edge"
          title="Why Enterprises Partner With"
          highlightTitle="SparkIntellect"
          subtitle="We combine deep artificial intelligence mastery with senior engineering discipline to build scalable, high-ROI business applications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <GridStaggerItem key={item.title} index={idx}>
                <div className="luxury-card luxury-card-hover p-6 rounded-2xl border border-[#BEE0FF] h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center mb-4 text-[#0B1220]">
                    <Icon className="w-6 h-6 text-[#0284c7]" />
                  </div>

                  <h3 className="text-base font-serif font-bold text-[#0B1220] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-[#334155] text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </GridStaggerItem>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

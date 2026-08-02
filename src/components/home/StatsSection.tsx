import React from "react";
import { STATS } from "@/data/companyData";
import { Award, Layers, Users, Zap } from "lucide-react";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";

export const StatsSection: React.FC = () => {
  const icons = [Layers, Users, Award, Zap];

  return (
    <SectionWrapper className="relative z-10 py-16 border-y border-[#BEE0FF] bg-[#F2F9FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <GridStaggerItem key={stat.label} index={idx}>
                <div className="luxury-card luxury-card-hover p-6 rounded-2xl border border-[#BEE0FF] flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#D6EBFF] text-[#0B1220]">
                      {stat.badge}
                    </span>
                    <Icon className="w-5 h-5 text-[#0284c7]" />
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0B1220] tracking-tight mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-[#334155]">
                      {stat.label}
                    </div>
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

"use client";

import React from "react";
import Link from "next/link";
import { 
  Bot, 
  Globe, 
  Smartphone, 
  Cpu, 
  Zap, 
  Cloud, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/companyData";

const ICON_MAP: Record<string, React.ElementType> = {
  "ai-development": Bot,
  "web-development": Globe,
  "mobile-development": Smartphone,
  "enterprise-software": Cpu,
  "automation": Zap,
  "cloud-devops": Cloud,
};

export const ServicesOverview: React.FC = () => {
  return (
    <SectionWrapper id="services" className="py-20 bg-[#F2F9FF] border-y border-[#BEE0FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Engineering Capabilities"
          title="Services Built Around Your"
          highlightTitle="Business Architecture"
          subtitle="Precision software development and artificial intelligence engineering tailored to your operational requirements."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.slug] || Sparkles;

            return (
              <GridStaggerItem key={service.id} index={idx}>
                <div className="luxury-card luxury-card-hover p-8 rounded-3xl border border-[#BEE0FF] h-full flex flex-col justify-between bg-white">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center mb-6 text-[#0284c7]">
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#0B1220] mb-3">
                      {service.title}
                    </h3>

                    <p className="text-sm text-[#334155] leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[#BEE0FF]/60">
                      {service.capabilities.slice(0, 3).map((cap, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#0B1220] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#BEE0FF] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {service.techStack.slice(0, 2).map((tech) => (
                        <span key={tech} className="px-2.5 py-0.5 rounded-full bg-[#F2F9FF] border border-[#BEE0FF] text-[10px] font-mono font-semibold text-[#334155]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs font-bold text-[#0284c7] hover:text-[#0B1220] flex items-center gap-1 transition-colors group"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </GridStaggerItem>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md transition-all"
          >
            <span>View All Detailed Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </SectionWrapper>
  );
};

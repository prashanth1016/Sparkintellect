"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { 
  Briefcase, 
  Cpu, 
  Bot, 
  Layers, 
  ShieldCheck, 
  CheckCircle2 
} from "lucide-react";

const WHY_CHOOSE_POINTS = [
  {
    step: "01",
    title: "Business-First Thinking",
    description: "We don't build tech for the sake of tech. Every architecture decision is measured against real commercial ROI, workflow time saved, and revenue growth.",
    icon: Briefcase,
  },
  {
    step: "02",
    title: "Modern Engineering",
    description: "Type-safe Next.js, robust Node.js APIs, zero-downtime Docker deployments, and automated testing pipelines built by senior architects.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "AI-Native Development",
    description: "Private RAG pipelines, fine-tuned domain models, and intelligent automated WhatsApp/Web agents integrated directly into your database workflows.",
    icon: Bot,
  },
  {
    step: "04",
    title: "Scalable Architecture",
    description: "Modular micro-service structures and cloud-native databases engineered to effortlessly scale from thousands to millions of requests.",
    icon: Layers,
  },
  {
    step: "05",
    title: "Long-Term Support",
    description: "24/7 telemetry monitoring, automated daily backups, security patching, and proactive maintenance retainers ensuring 99.99% uptime.",
    icon: ShieldCheck,
  },
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <SectionWrapper className="relative z-10 py-20 bg-white border-t border-[#BEE0FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The SparkIntellect Edge"
          title="Why Enterprises Partner With"
          highlightTitle="SparkIntellect"
          subtitle="We combine deep artificial intelligence mastery with senior engineering discipline to build scalable, high-ROI business applications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {WHY_CHOOSE_POINTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GridStaggerItem key={item.step} index={idx}>
                <div className="luxury-card luxury-card-hover p-6 rounded-3xl border border-[#BEE0FF] h-full flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#0284c7]">{item.step}</span>
                      <div className="w-9 h-9 rounded-xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center text-[#0284c7]">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#0B1220] mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#334155] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#BEE0FF]/60 flex items-center gap-1 text-[11px] font-semibold text-[#0284c7]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Guaranteed SLA</span>
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

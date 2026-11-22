"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Lightbulb, Compass, Layout, Code, Bot, Rocket, ShieldCheck } from "lucide-react";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SOLUTION_STEPS = [
  { step: "01", title: "Idea", desc: "Understanding the operational vision and core requirements.", icon: Lightbulb },
  { step: "02", title: "Strategy", desc: "Selecting optimal architecture, database schemas, and stack.", icon: Compass },
  { step: "03", title: "Design", desc: "Interactive Figma wireframes and minimal luxury design systems.", icon: Layout },
  { step: "04", title: "Engineering", desc: "Type-safe Next.js frontend and resilient Node.js backend.", icon: Code },
  { step: "05", title: "AI Integration", desc: "Domain-tuned RAG pipelines, LLM tools, and automated bots.", icon: Bot },
  { step: "06", title: "Deployment", desc: "Zero-downtime cloud launch with CDN caching and backups.", icon: Rocket },
  { step: "07", title: "Support", desc: "Continuous 24/7 telemetry monitoring and feature evolution.", icon: ShieldCheck },
];

export const SolutionsSection: React.FC = () => {
  return (
    <SectionWrapper className="py-24 bg-[#0B0B0E] border-t border-[rgba(198,202,208,0.14)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Solution Mindset"
          title="From an Idea to a"
          highlightTitle="Production System"
          subtitle="A disciplined, step-by-step engineering execution model designed to turn complex business needs into seamless software."
        />

        {/* Step Flow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 mb-12">
          {SOLUTION_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GridStaggerItem key={item.step} index={idx}>
                <div className="p-5 rounded-2xl bg-[#111115] border border-[rgba(198,202,208,0.14)] hover:border-[#FF1744]/40 hover:bg-[#1a080d] hover:shadow-lg transition-all h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-[#FF1744]">{item.step}</span>
                      <Icon className="w-4 h-4 text-[#A6A9B0] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-sm font-display font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-[11px] text-[#A6A9B0] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </GridStaggerItem>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="cinematic-card p-8 sm:p-10 rounded-3xl border border-[rgba(198,202,208,0.16)] bg-[#111115] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-left">
            <h3 className="text-2xl font-display font-bold text-white">
              Ready to architect your custom software solution?
            </h3>
            <p className="text-sm text-[#A6A9B0]">
              Schedule a 30-minute discovery consultation with Founder & CEO Mr. Prashanth.
            </p>
          </div>

          <Link
            href="/solutions"
            className="px-8 py-4 rounded-full font-bold text-xs btn-ruby-primary shadow-lg transition-all flex items-center gap-2 shrink-0"
          >
            <span>Build Your Solution</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </SectionWrapper>
  );
};

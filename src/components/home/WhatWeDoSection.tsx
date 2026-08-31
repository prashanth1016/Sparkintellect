"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Code, Bot, Zap, Cloud, Sparkles } from "lucide-react";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";

const WHAT_WE_DO = [
  {
    title: "Build",
    subtitle: "Custom Software Platforms",
    description: "Tailored enterprise web applications, mobile platforms, ERPs, and internal business dashboards architected specifically for your workflows.",
    icon: Code,
    link: "/services/web-development",
  },
  {
    title: "Intelligence",
    subtitle: "AI & Machine Learning Systems",
    description: "Custom AI assistants, enterprise RAG knowledge search, automated document OCR parsers, and domain-trained predictive neural models.",
    icon: Bot,
    link: "/services/ai-development",
  },
  {
    title: "Automate",
    subtitle: "Business Workflows & Operations",
    description: "Eliminate repetitive manual data entry, human error, and delays with intelligent WhatsApp CRM bots and webhook orchestrators.",
    icon: Zap,
    link: "/services/automation",
  },
  {
    title: "Scale",
    subtitle: "Cloud Infrastructure & DevOps",
    description: "Zero-downtime cloud hosting, automated continuous deployment pipelines, database replication, and enterprise security hardening.",
    icon: Cloud,
    link: "/services/cloud-devops",
  },
];

export const WhatWeDoSection: React.FC = () => {
  return (
    <SectionWrapper className="py-20 bg-[#F2F9FF] border-y border-[#BEE0FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="What We Do"
          title="Technology That Solves"
          highlightTitle="Real Business Problems"
          subtitle="We focus on four foundational pillars to modernize and scale your digital operations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {WHAT_WE_DO.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GridStaggerItem key={item.title} index={idx}>
                <div className="luxury-card luxury-card-hover p-7 rounded-3xl border border-[#BEE0FF] h-full flex flex-col justify-between bg-white">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center mb-6 text-[#0284c7]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284c7] mb-1">
                      {item.title}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#0B1220] mb-3">
                      {item.subtitle}
                    </h3>
                    <p className="text-xs text-[#334155] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#BEE0FF]">
                    <Link
                      href={item.link}
                      className="text-xs font-bold text-[#0B1220] hover:text-[#0284c7] flex items-center gap-1.5 transition-colors group"
                    >
                      <span>Explore Capability</span>
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
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md transition-all"
          >
            <span>Explore All Capabilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </SectionWrapper>
  );
};

"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Bot, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  CheckCircle2,
  Database,
  Terminal,
  Activity
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const HeroSection: React.FC = () => {
  return (
    <SectionWrapper className="relative pt-36 pb-16 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D6EBFF] border border-[#BEE0FF] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0B1220]">
                AI • SOFTWARE • AUTOMATION
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#0B1220] leading-[1.15] tracking-tight">
              We Build Intelligent Software for Businesses{" "}
              <span className="text-gradient-navy italic font-serif">Ready to Grow.</span>
            </h1>

            {/* Supporting paragraph */}
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl">
              SparkIntellect designs and develops AI-powered applications, enterprise platforms, and digital solutions that turn complex business challenges into simple, scalable systems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-lg shadow-[#9FCFFB]/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/services"
                className="px-8 py-4 rounded-full font-semibold text-sm bg-[#F2F9FF] text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Sub-features */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs font-semibold text-[#0B1220]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                <span>AI-Native Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                <span>Enterprise Custom ERP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                <span>Zero-Downtime SLA</span>
              </div>
            </div>
          </div>

          {/* Right Visual Architecture Box (Subtle, Elegant Motion) */}
          <div className="lg:col-span-5 relative">
            <div className="luxury-card rounded-3xl p-7 border border-[#BEE0FF] shadow-xl bg-white space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono font-bold text-[#0B1220]">SPARKINTELLECT SYSTEM</span>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#D6EBFF] text-[#0B1220] font-mono font-bold border border-[#BEE0FF]">
                  PRODUCTION ENGINE
                </span>
              </div>

              {/* Central Flow Graphic */}
              <div className="space-y-3">
                {/* Step 1: Input */}
                <div className="p-3.5 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#D6EBFF] flex items-center justify-center text-[#0284c7]">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1220]">Business Data & Operations</div>
                      <div className="text-[10px] text-[#334155]">Raw workflows, databases, documents</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[#334155]">INGEST</span>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-[#0284c7]">
                  <div className="w-0.5 h-4 bg-[#9FCFFB]" />
                </div>

                {/* Step 2: Spark Core Engine */}
                <div className="p-4 rounded-2xl bg-[#0B1220] text-white space-y-2 border border-[#9FCFFB]/30 shadow-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#9FCFFB] font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#9FCFFB]" /> AI + INTELLIGENT LOGIC
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Neural RAG retrieval, automated rule validation, type-safe API routing, and cloud sync.
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-[#0284c7]">
                  <div className="w-0.5 h-4 bg-[#9FCFFB]" />
                </div>

                {/* Step 3: Scalable Platforms */}
                <div className="p-3.5 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#D6EBFF] flex items-center justify-center text-[#0284c7]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1220]">Scalable Enterprise Software</div>
                      <div className="text-[10px] text-[#334155]">Web, Mobile Apps, ERPs, Auto-sync Sheets</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-emerald-600">SCALE</span>
                </div>
              </div>

              {/* Bottom Guarantee */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-[#334155] border-t border-[#BEE0FF]">
                <span className="flex items-center gap-1 font-semibold text-[#0B1220]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0284c7]" />
                  Bank-Grade Encryption
                </span>
                <span className="font-mono text-[#0284c7]">Guindy, Chennai</span>
              </div>

            </div>
          </div>

        </div>

        {/* TRUST STRIP SECTION */}
        <div className="pt-8 pb-4 border-t border-[#BEE0FF]">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#334155] mb-4 text-center font-bold">
            Core Engineering Competencies:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              "AI Engineering",
              "Web Applications",
              "Mobile Apps",
              "Enterprise Platforms",
              "Workflow Automation",
              "Cloud & DevOps",
            ].map((name) => (
              <div
                key={name}
                className="p-3 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-center text-xs font-bold text-[#0B1220] hover:bg-[#D6EBFF] transition-colors"
              >
                {name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

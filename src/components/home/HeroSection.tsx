"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  Bot, 
  Code2, 
  ShieldCheck, 
  CheckCircle2,
  Zap,
  Play,
  GraduationCap
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const HeroSection: React.FC = () => {
  return (
    <SectionWrapper className="relative pt-36 pb-24 flex items-center justify-center overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D6EBFF] border border-[#BEE0FF] shadow-sm">
              <Sparkles className="w-4 h-4 text-[#0284c7]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#0B1220]">
                AI & Enterprise Software Engineering Firm
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif text-[#0B1220] leading-[1.15] tracking-tight">
              Transform Your Enterprise With{" "}
              <span className="text-gradient-navy font-serif italic">Intelligent AI & Custom Software</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl">
              We empower startups, SMEs, and global enterprises with production-grade AI agents, high-speed Next.js platforms, cloud DevOps, and career-defining internship tracks in Chennai.
            </p>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-[#0B1220] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#0284c7] shrink-0" />
                <span>Enterprise Conversational AI & Bots</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#0284c7] shrink-0" />
                <span>High-Speed Next.js & Mobile Apps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#0284c7] shrink-0" />
                <span>Custom ERP, CRM & Billing Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#0284c7] shrink-0" />
                <span>Hands-on Live Project Internships</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-lg shadow-[#9FCFFB]/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/internships"
                className="px-8 py-4 rounded-full font-semibold text-sm bg-[#F2F9FF] text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-all flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-[#0284c7]" />
                <span>Explore Internships</span>
              </Link>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-6 border-t border-[#BEE0FF]">
              <span className="text-xs uppercase tracking-widest font-mono text-[#334155] block mb-3 font-semibold">
                Core Modern Engineering Stack:
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#0B1220] font-mono">
                <span className="px-3 py-1 rounded-full bg-[#F2F9FF] border border-[#BEE0FF]">Next.js 14</span>
                <span className="px-3 py-1 rounded-full bg-[#F2F9FF] border border-[#BEE0FF]">Python & PyTorch</span>
                <span className="px-3 py-1 rounded-full bg-[#F2F9FF] border border-[#BEE0FF]">OpenAI & RAG</span>
                <span className="px-3 py-1 rounded-full bg-[#F2F9FF] border border-[#BEE0FF]">Flutter & React Native</span>
                <span className="px-3 py-1 rounded-full bg-[#F2F9FF] border border-[#BEE0FF]">AWS & Docker</span>
              </div>
            </div>

          </div>

          {/* Right Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="luxury-card rounded-3xl p-6 border border-[#BEE0FF] shadow-xl space-y-6 bg-white">
              
              {/* Card Top */}
              <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-[#334155] ml-2 font-medium">sparkintellect_core.py</span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#D6EBFF] text-[#0B1220] border border-[#BEE0FF] font-mono font-semibold">
                  ACTIVE PIPELINE
                </span>
              </div>

              {/* Code Preview Box */}
              <div className="bg-[#0B1220] rounded-2xl p-4 font-mono text-xs text-white space-y-2">
                <div className="text-[#9FCFFB] flex items-center gap-2">
                  <span className="text-purple-300">from</span> spark.ai <span className="text-purple-300">import</span> EnterpriseAgent
                </div>
                <div className="text-slate-400">// Connecting to Guindy, Chennai Server...</div>
                <div className="text-emerald-400">✓ System Status: 100% Production Ready</div>
                <div className="text-indigo-200 pt-1">&gt; Agent: RAG Workflow & Automation Bot</div>
                
                <div className="p-3 mt-3 rounded-xl bg-slate-900 border border-cyan-500/20 text-slate-200">
                  <div className="flex items-center justify-between text-[11px] text-[#9FCFFB] mb-1">
                    <span className="flex items-center gap-1 font-semibold">
                      <Zap className="w-3 h-3 text-[#9FCFFB]" /> Enterprise AI Execution
                    </span>
                    <span>Sub-second Latency</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Automating customer inquiries, ERP data routing, and WhatsApp workflows with zero manual effort.
                  </p>
                </div>
              </div>

              {/* Highlight Feature Badges */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] flex items-center gap-3">
                  <Bot className="w-7 h-7 text-[#0284c7]" />
                  <div>
                    <div className="text-xs font-bold text-[#0B1220]">AI Solutions</div>
                    <div className="text-[11px] text-[#334155]">WhatsApp & Web</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] flex items-center gap-3">
                  <Code2 className="w-7 h-7 text-[#0284c7]" />
                  <div>
                    <div className="text-xs font-bold text-[#0B1220]">Web & Mobile</div>
                    <div className="text-[11px] text-[#334155]">Next.js & Flutter</div>
                  </div>
                </div>
              </div>

              {/* Security SLA */}
              <div className="p-3.5 rounded-xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
                  <span className="text-[#0B1220] font-semibold">Enterprise SLA Security</span>
                </div>
                <span className="text-[#0B1220] font-bold">100% Encrypted</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
};

"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { PROCESS_STEPS } from "@/data/companyData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { 
  Search, 
  Compass, 
  Layout, 
  Code, 
  CheckCircle, 
  Rocket, 
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  ChevronRight
} from "lucide-react";

const PROCESS_ICONS: Record<string, React.ElementType> = {
  Search,
  Compass,
  Layout,
  Code,
  CheckCircle,
  Rocket,
  ShieldCheck,
};

// Exactly 7 steps split into top and bottom timeline lanes as per Storyline Teller prompt
// Top lane: steps 1, 3, 5, 7
// Bottom lane: steps 2, 4, 6
const topStepIndices = [0, 2, 4, 6];
const bottomStepIndices = [1, 3, 5];

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  const currentProcess = PROCESS_STEPS.find((p) => p.stepNumber === activeStep) || PROCESS_STEPS[0];
  const CurrentIcon = PROCESS_ICONS[currentProcess.iconName] || Code;

  const handleStepClick = (stepNum: number) => {
    setActiveStep(stepNum);
  };

  return (
    <SectionWrapper id="methodology" className="relative z-10 py-24 bg-[#050505] border-t border-[rgba(198,202,208,0.14)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-[#8B0015]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          badge="Structured Methodology"
          title="Our 7-Step Engineering &"
          highlightTitle="Deployment Roadmap"
          subtitle="We maintain total transparency and technical rigor from initial discovery to continuous cloud telemetry and support."
        />

        {/* 1. HORIZONTAL STORYLINE TELLER (Interactive Timeline Track) */}
        <div ref={containerRef} className="relative mb-16 p-6 sm:p-10 rounded-3xl bg-[#0B0B0E] border border-[rgba(198,202,208,0.16)] shadow-2xl">
          <div className="flex items-center justify-between mb-8 border-b border-[rgba(198,202,208,0.1)] pb-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E8EBEF]">
              <span className="w-2 h-2 rounded-full bg-[#FF1744] animate-pulse" />
              <span>SPARKINTELLECT STORYLINE TIMELINE</span>
            </div>
            <span className="text-[11px] font-mono text-[#A6A9B0]">
              Phase 0{activeStep} of 07 Active
            </span>
          </div>

          {/* Central Connecting Journey Line */}
          <div className="relative py-12">
            {/* Base grey line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-white/10 rounded-full" />
            {/* Animated ruby progress line */}
            <motion.div 
              style={{ width: shouldReduceMotion ? `${(activeStep / 7) * 100}%` : lineWidth }}
              className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-[#8B0015] via-[#C8102E] to-[#FF1744] rounded-full shadow-[0_0_12px_#FF1744]" 
            />

            {/* 7 Interactive Milestone Nodes */}
            <div className="relative flex justify-between items-center z-10">
              {PROCESS_STEPS.map((step) => {
                const isSelected = step.stepNumber === activeStep;
                const isCompleted = step.stepNumber <= activeStep;
                const Icon = PROCESS_ICONS[step.iconName] || Code;

                return (
                  <div key={step.stepNumber} className="flex flex-col items-center">
                    <button
                      onClick={() => handleStepClick(step.stepNumber)}
                      className={`relative w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "bg-[#C8102E] text-white ring-4 ring-[#FF1744]/40 scale-110 shadow-lg shadow-[#FF1744]/50"
                          : isCompleted
                          ? "bg-[#1d0a0e] text-[#FF1744] border border-[#FF1744]/50 hover:scale-105"
                          : "bg-[#111115] text-[#A6A9B0] border border-[rgba(198,202,208,0.2)] hover:border-white/40"
                      }`}
                      aria-label={`Step ${step.stepNumber}: ${step.title}`}
                    >
                      <span className="text-xs sm:text-sm font-mono font-bold">0{step.stepNumber}</span>
                    </button>
                    <span className="hidden md:block mt-3 text-[10px] font-mono text-[#A6A9B0] max-w-[85px] text-center truncate">
                      {step.title.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Step Selection Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 no-scrollbar border-t border-[rgba(198,202,208,0.1)]">
            {PROCESS_STEPS.map((step) => {
              const isActive = step.stepNumber === activeStep;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => handleStepClick(step.stepNumber)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all shrink-0 ${
                    isActive
                      ? "bg-gradient-to-r from-[#8B0015] to-[#C8102E] text-white border border-[#FF1744]/40 shadow-md font-bold"
                      : "bg-[#111115] text-[#C6CAD0] border border-[rgba(198,202,208,0.14)] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#FF1744]">{step.stepNumber}.</span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. ACTIVE MILESTONE DEEP-DIVE INSPECTOR (Premium Dark Presentation) */}
        <div className="cinematic-card p-8 sm:p-12 rounded-3xl border border-[rgba(198,202,208,0.18)] bg-[#111115] shadow-2xl mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c080d] border border-[#FF1744]/40 text-xs text-[#FF1744] font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Roadmap Milestone 0{currentProcess.stepNumber} of 07</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                {currentProcess.title}
              </h3>

              <p className="text-[#C6CAD0] text-sm sm:text-base leading-relaxed">
                {currentProcess.description}
              </p>

              {/* Key Deliverables Matrix */}
              <div className="pt-4 space-y-3">
                <h4 className="text-xs font-mono text-[#FF1744] uppercase font-bold tracking-widest flex items-center gap-2">
                  <span>Standardized Engineering Deliverables:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentProcess.deliverables.map((deliv, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-2xl bg-[#0B0B0E] border border-[rgba(198,202,208,0.14)] text-xs text-[#E8EBEF] font-medium flex items-center gap-2.5 shadow-sm"
                    >
                      <Check className="w-4 h-4 text-[#FF1744] shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Telemetry / Visual Emblem */}
            <div className="lg:col-span-5 relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-[rgba(198,202,208,0.16)] shadow-xl bg-gradient-to-br from-[#1b090e] via-[#111115] to-[#07070a] p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#C8102E]/30 border border-[#FF1744]/50 flex items-center justify-center text-[#FF1744] shadow-lg shadow-[#FF1744]/20">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C6CAD0]">
                  PHASE 0{currentProcess.stepNumber}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase text-[#A6A9B0] tracking-wider">
                  SparkIntellect Standard Operating Procedure
                </div>
                <div className="text-xl font-display font-bold text-white">
                  {currentProcess.title}
                </div>
                <div className="text-xs text-[#A6A9B0]">
                  Includes bi-weekly stakeholder reviews and verifiable GitHub deliverables.
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(198,202,208,0.12)] flex items-center justify-between text-xs">
                <span className="text-[#C6CAD0]">Deliverables: {currentProcess.deliverables.length} verified</span>
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => (prev % 7) + 1)}
                  className="text-[#FF1744] hover:text-white flex items-center gap-1 font-semibold transition-colors"
                >
                  <span>Next Phase</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3. ALL 7 ROADMAP STEPS CARDS MATRIX */}
        <div>
          <h3 className="text-xl font-display font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF1744]" />
            <span>Complete 7-Step Verified Engineering Cycle</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = PROCESS_ICONS[step.iconName] || Code;
              const isSelected = step.stepNumber === activeStep;

              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  onClick={() => handleStepClick(step.stepNumber)}
                  className={`rounded-2xl border p-6 cursor-pointer transition-all duration-300 group ${
                    isSelected
                      ? "border-[#FF1744] ring-1 ring-[#FF1744]/40 bg-gradient-to-b from-[#1b080d] to-[#111115] shadow-xl scale-[1.02]"
                      : "border-[rgba(198,202,208,0.14)] bg-[#111115] hover:border-[rgba(255,23,68,0.35)] hover:shadow-lg"
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FF1744]/40 group-hover:bg-[#8B0015]/30 transition-colors">
                      <Icon className="w-5 h-5 text-[#FF1744]" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#A6A9B0] group-hover:text-white">
                      Step 0{step.stepNumber}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h4 className="text-base font-display font-bold text-white mb-2 line-clamp-1 group-hover:text-[#FF1744] transition-colors">
                    {step.title}
                  </h4>

                  {/* Step Description */}
                  <p className="text-[#A6A9B0] text-xs leading-relaxed line-clamp-2 mb-4">
                    {step.description}
                  </p>

                  {/* Step Footer */}
                  <div className="pt-3 border-t border-[rgba(198,202,208,0.1)] flex items-center justify-between text-[11px] text-[#C6CAD0]">
                    <span>{step.deliverables.length} Deliverables</span>
                    <span className="text-[#FF1744] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                      Inspect Phase →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROCESS_STEPS } from "@/data/companyData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { 
  Search, 
  Compass, 
  Layout, 
  Code, 
  CheckCircle, 
  Eye, 
  Rocket, 
  BookOpen, 
  ShieldCheck,
  Check,
  Sparkles
} from "lucide-react";

const PROCESS_ICONS: Record<string, React.ElementType> = {
  Search,
  Compass,
  Layout,
  Code,
  CheckCircle,
  Eye,
  Rocket,
  BookOpen,
  ShieldCheck,
};

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const currentProcess = PROCESS_STEPS.find((p) => p.stepNumber === activeStep) || PROCESS_STEPS[0];
  const CurrentIcon = PROCESS_ICONS[currentProcess.iconName] || Code;

  const handleStepClick = (stepNum: number) => {
    setActiveStep(stepNum);
    const detailElement = document.getElementById("process-details");
    if (detailElement) {
      detailElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <SectionWrapper className="relative z-10 py-24 border-t border-[#BEE0FF] bg-[#F2F9FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Structured Methodology"
          title="Our 9-Step Engineering &"
          highlightTitle="Deployment Roadmap"
          subtitle="We maintain total transparency and technical rigor from initial discovery to post-launch cloud maintenance."
        />

        {/* Step Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {PROCESS_STEPS.map((step) => {
            const isActive = step.stepNumber === activeStep;
            return (
              <button
                key={step.stepNumber}
                onClick={() => handleStepClick(step.stepNumber)}
                className={`px-4 py-3 rounded-2xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all border shrink-0 ${
                  isActive
                    ? "bg-[#9FCFFB] text-[#0B1220] border-[#9FCFFB] shadow-md font-bold scale-105"
                    : "bg-white text-[#334155] border-[#BEE0FF] hover:bg-[#D6EBFF] hover:text-[#0B1220]"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#0B1220] text-white flex items-center justify-center text-[10px] font-mono">
                  {step.stepNumber}
                </span>
                <span>{step.title.split("&")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Display Panel */}
        <div id="process-details" className="luxury-card p-8 sm:p-12 rounded-3xl border border-[#BEE0FF] bg-white shadow-xl mb-16 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D6EBFF] border border-[#BEE0FF] text-xs text-[#0B1220] font-mono font-bold">
                <span>Phase 0{currentProcess.stepNumber} of 09</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220]">
                {currentProcess.title}
              </h3>

              <p className="text-[#334155] text-base leading-relaxed">
                {currentProcess.description}
              </p>

              <div className="pt-4 space-y-3">
                <h4 className="text-xs font-mono text-[#0284c7] uppercase font-bold tracking-widest">
                  Key Deliverables:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentProcess.deliverables.map((deliv, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] font-medium flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Step Visual Image */}
            <div className="lg:col-span-5 relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#BEE0FF] shadow-lg group bg-[#0B1220]">
              <Image
                src={currentProcess.image}
                alt={currentProcess.title}
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/90 via-[#0B1220]/30 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-[#9FCFFB] text-[#0B1220] flex items-center justify-center font-mono font-bold text-sm">
                    0{currentProcess.stepNumber}
                  </div>
                  <span className="text-xs font-mono tracking-wider text-[#9FCFFB] font-bold">SparkIntellect Milestone</span>
                </div>
                <div className="text-sm font-serif font-bold text-white flex items-center gap-2">
                  <CurrentIcon className="w-4 h-4 text-[#9FCFFB]" />
                  <span>{currentProcess.title}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Complete 9-Step Visual Matrix Grid */}
        <div>
          <h3 className="text-xl font-serif font-bold text-[#0B1220] text-center mb-8 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#0284c7]" />
            <span>Complete 9-Step Interactive Roadmap</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = PROCESS_ICONS[step.iconName] || Code;
              const isSelected = step.stepNumber === activeStep;
              return (
                <GridStaggerItem key={step.stepNumber} index={idx}>
                  <div
                    onClick={() => handleStepClick(step.stepNumber)}
                    className={`luxury-card rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 group ${
                      isSelected
                        ? "border-[#0284c7] ring-2 ring-[#0284c7]/40 shadow-xl bg-white scale-[1.02]"
                        : "border-[#BEE0FF] bg-white hover:border-[#0284c7]/60 hover:shadow-md"
                    }`}
                  >
                    {/* Card Step Image */}
                    <div className="relative w-full h-44 bg-[#0B1220] overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#0B1220]/80 backdrop-blur-md border border-white/20 text-[#9FCFFB] text-xs font-mono font-bold">
                        Step 0{step.stepNumber}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#0284c7]" />
                        </div>
                        <h4 className="text-sm font-serif font-bold text-[#0B1220] line-clamp-1">
                          {step.title}
                        </h4>
                      </div>

                      <p className="text-[#334155] text-xs leading-relaxed line-clamp-2">
                        {step.description}
                      </p>

                      <div className="pt-2 border-t border-[#F2F9FF] flex items-center justify-between text-[11px] text-[#0284c7] font-semibold">
                        <span>{step.deliverables.length} Deliverables</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStepClick(step.stepNumber);
                          }}
                          className="hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                        >
                          View Phase →
                        </button>
                      </div>
                    </div>
                  </div>
                </GridStaggerItem>
              );
            })}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

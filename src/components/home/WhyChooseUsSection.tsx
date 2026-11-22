"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { 
  Briefcase, 
  Cpu, 
  Bot, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Activity 
} from "lucide-react";

const PROCESS_STEPS = [
  {
    step: "1",
    displayNum: "01",
    title: "Business-First Thinking",
    tagline: "Commercial ROI & Workflow Acceleration",
    image: "/images/architecture/business-first-thinking-opt.webp",
    metric: { value: "3.8x", label: "Average Client ROI Uplift" },
    icon: Briefcase,
  },
  {
    step: "2",
    displayNum: "02",
    title: "Modern Engineering",
    tagline: "Zero-Downtime Releases & Type-Safe Core",
    image: "/images/architecture/modern-engineering-opt.webp",
    metric: { value: "99.98%", label: "Deploy Success Rate" },
    icon: Cpu,
  },
  {
    step: "3",
    displayNum: "03",
    title: "AI-Native Development",
    tagline: "Domain Models & Sub-Second Vector Inference",
    image: "/images/architecture/ai-native-development-opt.webp",
    metric: { value: "<100ms", label: "Streaming Inference Latency" },
    icon: Bot,
  },
  {
    step: "4",
    displayNum: "04",
    title: "Scalable Architecture",
    tagline: "High-Throughput Microservices & Event Meshes",
    image: "/images/architecture/scalable-architecture-opt.webp",
    metric: { value: "1M+", label: "Daily Request Throughput" },
    icon: Layers,
  },
  {
    step: "5",
    displayNum: "05",
    title: "Long-Term Reliability",
    tagline: "24/7 Telemetry & Continuous Hardening",
    image: "/images/architecture/long-term-reliability-opt.webp",
    metric: { value: "99.95%", label: "Guaranteed Production SLA" },
    icon: ShieldCheck,
  },
];

export const WhyChooseUsSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Pinned scroll height: 350vh for comfortable travel velocity
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Silky-smooth spring physics: eliminates wheel-notch stutter and discrete jumps
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 38,
    mass: 0.12,
    restDelta: 0.001,
  });

  // Calculate dynamic horizontal distance required to scroll through all 5 cards
  const calculateScrollRange = useCallback(() => {
    if (trackRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
      // Generous right margin so the final card (Stage 5) is 100% visible and beautifully framed
      const rightMargin = windowWidth < 640 ? 40 : windowWidth < 1024 ? 80 : 160;
      const range = Math.max(0, trackWidth - windowWidth + rightMargin);
      setScrollRange(range);
    }
  }, []);

  useEffect(() => {
    calculateScrollRange();
    const timer = setTimeout(calculateScrollRange, 150);
    const track = trackRef.current;
    if (!track) return () => clearTimeout(timer);

    const ro = new ResizeObserver(() => {
      calculateScrollRange();
    });
    ro.observe(track);
    window.addEventListener("resize", calculateScrollRange);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("resize", calculateScrollRange);
    };
  }, [calculateScrollRange]);

  // Smooth linear translation driven by spring progress: zero velocity knees, zero abrupt cutoffs
  const x = useTransform(smoothProgress, (val) => -val * scrollRange);

  // Optimized active stage update: only triggers re-render when stage index actually changes
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const stepCount = PROCESS_STEPS.length;
    const current = Math.min(
      stepCount - 1,
      Math.max(0, Math.floor(latest * stepCount * 0.999))
    );
    setActiveIndex((prev) => (prev === current ? prev : current));
  });

  // Smooth programmatic jump to a specific process stage
  const scrollToStage = (stageIndex: number) => {
    if (!targetRef.current) return;
    const rect = targetRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetTop = rect.top + scrollTop;
    const targetHeight = targetRef.current.offsetHeight;
    const scrollableDistance = targetHeight - window.innerHeight;

    if (scrollableDistance <= 0) return;

    const fraction = stageIndex / (PROCESS_STEPS.length - 1);
    const targetScrollY = targetTop + fraction * scrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToStage(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < PROCESS_STEPS.length - 1) {
      scrollToStage(activeIndex + 1);
    }
  };

  return (
    <section
      ref={targetRef}
      id="architecture-advantage"
      className="relative h-[350vh] bg-[#EEEAF8] border-t border-[#2B2A6B]/15 w-full"
    >
      {/* Hardware-accelerated ambient glows - isolated in clipping container to prevent horizontal overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/3 w-[600px] max-w-[90vw] h-[500px] bg-[#2B2A6B]/[0.07] blur-[140px] rounded-full"
          style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] max-w-[90vw] h-[450px] bg-[#d4a373]/[0.07] blur-[130px] rounded-full"
          style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
        />
      </div>

      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen max-h-screen w-full flex flex-col justify-between overflow-hidden py-2 sm:py-3 z-10">
        
        {/* Top Header - Matches site-wide section heading standards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4 border-b border-[#2B2A6B]/10 pb-2.5 sm:pb-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-widest bg-[#2B2A6B] border border-[#d4a373]/35 text-[#EEEAF8] mb-2 sm:mb-3 shadow-md backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
                <span className="tracking-widest">The Architectural Advantage</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-[#2B2A6B] leading-tight tracking-tight">
                The Intelligence Behind <span className="text-gradient-yellow">Our Execution</span>
              </h2>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-[#2B2A6B]/80 max-w-2xl leading-relaxed line-clamp-2 sm:line-clamp-none">
                Frontier artificial intelligence research paired with disciplined software engineering to build high-ROI digital assets.
              </p>
            </div>

            {/* Top Navigation Controls & Stage Pill */}
            <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2B2A6B] border border-[#EEEAF8]/20 text-[11px] sm:text-xs font-mono text-[#EEEAF8] shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#d4a373] animate-pulse" />
                <span className="font-bold">STAGE {PROCESS_STEPS[activeIndex].displayNum}</span>
                <span className="text-[#EEEAF8]/60">/ 05</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all ${
                    activeIndex > 0
                      ? "bg-[#2B2A6B] border-[#EEEAF8]/25 text-[#EEEAF8] hover:border-[#d4a373] hover:text-[#d4a373] shadow-lg active:scale-95"
                      : "bg-[#2B2A6B]/30 border-[#2B2A6B]/15 text-[#2B2A6B]/30 cursor-not-allowed"
                  }`}
                  aria-label="Previous architectural process"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeIndex === PROCESS_STEPS.length - 1}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all ${
                    activeIndex < PROCESS_STEPS.length - 1
                      ? "bg-[#2B2A6B] border-[#EEEAF8]/25 text-[#EEEAF8] hover:border-[#d4a373] hover:text-[#d4a373] shadow-lg active:scale-95"
                      : "bg-[#2B2A6B]/30 border-[#2B2A6B]/15 text-[#2B2A6B]/30 cursor-not-allowed"
                  }`}
                  aria-label="Next architectural process"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Horizontal Pinned Cards Track */}
        <div className="relative w-full max-w-full overflow-hidden my-auto py-1 sm:py-2">
          
          {/* Hardware-accelerated edge masks in Lilac */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#EEEAF8] via-[#EEEAF8]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#EEEAF8] via-[#EEEAF8]/80 to-transparent z-20" />

          {/* Smooth GPU Translating Track */}
          <motion.div
            ref={trackRef}
            style={{ 
              x, 
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
            }}
            className="flex items-center gap-8 sm:gap-12 md:gap-16 px-6 sm:px-12 md:px-16 w-max"
          >
            {PROCESS_STEPS.map((item, idx) => {
              const Icon = item.icon;
              const isCurrent = activeIndex === idx;

              return (
                <div
                  key={item.step}
                  className="flex items-center shrink-0 group select-none"
                  style={{ willChange: "transform" }}
                >
                  {/* Netflix-Style Dimensional Number - scaled to match larger card */}
                  <div className="relative shrink-0 select-none pointer-events-none -mr-5 sm:-mr-11 md:-mr-14 z-0">
                    <span
                      className="font-display font-black text-[5rem] sm:text-[9rem] md:text-[11.5rem] leading-none tracking-tighter text-transparent block select-none"
                      style={{
                        WebkitTextStroke: isCurrent
                          ? "3px #d4a373"
                          : "2px rgba(43, 42, 107, 0.22)",
                        transition: "WebkitTextStroke 0.3s ease",
                      }}
                    >
                      {item.step}
                    </span>
                  </div>

                  {/* Prominently Sized Architecture Card - exactly 2 elements visible at start on desktop */}
                  <div
                    className={`relative z-10 w-[84vw] sm:w-[68vw] md:w-[48vw] lg:w-[44vw] max-w-[620px] rounded-2xl sm:rounded-[28px] p-4 sm:p-5 md:p-6 bg-[#25245c] text-[#EEEAF8] border transition-all duration-300 shadow-xl flex flex-col justify-between shrink-0 overflow-hidden ${
                      isCurrent
                        ? "border-[#d4a373] shadow-[0_16px_36px_rgba(43,42,107,0.4)] ring-1 ring-[#d4a373]/40"
                        : "border-[#EEEAF8]/20 hover:border-[#EEEAF8]/40"
                    }`}
                    style={{
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* Top liquid glass highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                    {/* Card Content Top: Header & Headings */}
                    <div>
                      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/[0.06] border border-[#EEEAF8]/20 flex items-center justify-center text-[#d4a373] group-hover:bg-[#EEEAF8]/15 group-hover:border-[#d4a373] group-hover:scale-105 transition-all shadow-inner">
                            <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#d4a373] uppercase tracking-wider">
                              STAGE {item.displayNum}
                            </span>
                            <span className="text-[9px] sm:text-[9.5px] font-mono text-[#EEEAF8]/70">
                              Architectural Core
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-[#EEEAF8]">
                          0{item.step} / 05
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-base sm:text-lg md:text-xl font-display font-extrabold text-[#EEEAF8] group-hover:text-white transition-colors tracking-tight leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] font-mono text-[#d4a373] font-semibold mt-0.5 mb-2.5 line-clamp-1">
                        {item.tagline}
                      </p>
                    </div>

                    {/* Prominent Architecture Diagram Image Frame */}
                    <div className="relative w-full h-36 sm:h-44 md:h-52 lg:h-56 rounded-xl sm:rounded-2xl overflow-hidden bg-[#1E1D4E] border border-[#EEEAF8]/20 group-hover:border-[#d4a373]/50 transition-colors my-2 shadow-inner">
                      <Image
                        src={item.image}
                        alt={`${item.title} Architecture Diagram`}
                        width={720}
                        height={420}
                        sizes="(max-width: 640px) 84vw, (max-width: 1024px) 50vw, 620px"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        priority={idx < 2}
                      />
                      {/* Subtle gradient vignette to blend seamlessly */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1D4E]/80 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Card Bottom: Metric & SLA Tag */}
                    <div className="pt-2.5 mt-1 border-t border-white/[0.08] flex items-center justify-between">
                      <div>
                        <div className="text-base sm:text-lg md:text-xl font-display font-extrabold text-[#d4a373]">
                          {item.metric.value}
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-mono text-[#EEEAF8]/70">
                          {item.metric.label}
                        </div>
                      </div>

                      <div className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[9.5px] sm:text-[10px] font-mono font-semibold text-[#d4a373] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#d4a373]" />
                        <span>Guaranteed SLA</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Step Bar Indicators */}
        <div className="max-w-md mx-auto w-full px-4 shrink-0 relative z-10 text-center space-y-1 pb-1">
          <div className="flex items-center justify-center gap-2">
            {PROCESS_STEPS.map((step, idx) => (
              <button
                key={step.step}
                type="button"
                onClick={() => scrollToStage(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-8 bg-[#d4a373] shadow-md shadow-[#d4a373]/50"
                    : "w-2.5 bg-[#2B2A6B]/25 hover:bg-[#2B2A6B]/50"
                }`}
                aria-label={`Jump to process stage ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-[9.5px] font-mono text-[#2B2A6B]/80 flex items-center justify-center gap-1.5">
            <Activity className="w-3 h-3 text-[#d4a373] animate-pulse" />
            <span>Stage {activeIndex + 1} of 5 • {PROCESS_STEPS[activeIndex].title}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;

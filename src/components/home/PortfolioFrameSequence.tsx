"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Activity,
} from "lucide-react";
import { PORTFOLIO_PRODUCTS } from "./portfolio/portfolioData";
import { PortfolioVisualDispatcher } from "./portfolio/portfolioVisuals";
import { PortfolioProduct } from "./portfolio/types";

// Maintain backwards compatibility for external imports
export type PortfolioItem = PortfolioProduct;
export const DEFAULT_PORTFOLIO_ITEMS = PORTFOLIO_PRODUCTS;

// Configurable scroll distance: 1,200vh gives ample runway for all 8 products (~150vh per product)
export const DEFAULT_SCROLL_TRAVEL_VH = 1200;

interface PortfolioFrameSequenceProps {
  products?: PortfolioProduct[];
  items?: PortfolioProduct[]; // Alias for items prop
  label?: string;
  className?: string;
  scrollTravelVh?: number;
}

export function PortfolioFrameSequence({
  products,
  items,
  label = "SPARKINTELLECT",
  className = "",
  scrollTravelVh = DEFAULT_SCROLL_TRAVEL_VH,
}: PortfolioFrameSequenceProps) {
  const productList = products || items || PORTFOLIO_PRODUCTS;
  const productCount = productList.length;

  // Reduced motion preference using React 19 external store
  const reducedMotion = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () =>
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false,
    () => false
  );

  // Discrete active index for React content updates
  const [activeIndex, setActiveIndex] = useState(0);

  // Normalized progress values for continuous visual transformations
  const [continuousProgress, setContinuousProgress] = useState(0);
  const [continuousLocalProgress, setContinuousLocalProgress] = useState(0);

  // Smooth cross-fade transition state between adjacent products
  const [transitionState, setTransitionState] = useState<{
    primaryIndex: number;
    secondaryIndex: number | null;
    transitionProgress: number; // 0 to 1
  }>({
    primaryIndex: 0,
    secondaryIndex: null,
    transitionProgress: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndexRef = useRef(0);

  // Keep ref synchronized in an effect
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Active product lookup
  const activeProduct = useMemo(() => {
    return productList[activeIndex] || productList[0];
  }, [productList, activeIndex]);

  // Programmatic scroll to target product index
  const scrollToProduct = useCallback(
    (targetIndex: number) => {
      const clampedIndex = Math.max(0, Math.min(productCount - 1, targetIndex));
      setActiveIndex(clampedIndex);

      if (!containerRef.current || typeof window === "undefined") return;

      if (window.innerWidth >= 1024) {
        isNavigatingRef.current = true;
        if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
        navTimeoutRef.current = setTimeout(() => {
          isNavigatingRef.current = false;
        }, 900);

        const rect = containerRef.current.getBoundingClientRect();
        const totalDistance = containerRef.current.offsetHeight - window.innerHeight;
        if (totalDistance > 50) {
          // Center the product in its segment
          const targetProgress = (clampedIndex + 0.5) / productCount;
          const targetY = window.scrollY + rect.top + targetProgress * totalDistance;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    },
    [productCount]
  );

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) scrollToProduct(activeIndex - 1);
  }, [activeIndex, scrollToProduct]);

  const handleNext = useCallback(() => {
    if (activeIndex < productCount - 1) scrollToProduct(activeIndex + 1);
  }, [activeIndex, productCount, scrollToProduct]);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Only capture keyboard navigation when container is currently in view
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      if (!inView) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
        if (activeIndexRef.current < productCount - 1) {
          e.preventDefault();
          scrollToProduct(activeIndexRef.current + 1);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        if (activeIndexRef.current > 0) {
          e.preventDefault();
          scrollToProduct(activeIndexRef.current - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [productCount, scrollToProduct]);

  // Continuous scroll listener with requestAnimationFrame smoothing and crossfade derivation
  useEffect(() => {
    let rAFId: number;
    let targetP = 0;
    let currentP = 0;

    const handleScroll = () => {
      if (!containerRef.current || typeof window === "undefined") return;

      if (window.innerWidth >= 1024) {
        const rect = containerRef.current.getBoundingClientRect();
        const totalDistance = Math.max(
          1,
          containerRef.current.offsetHeight - window.innerHeight
        );

        if (rect.top > 0) {
          targetP = 0;
        } else if (rect.bottom < window.innerHeight) {
          targetP = 1;
        } else {
          const scrolled = -rect.top;
          targetP = Math.max(0, Math.min(1, scrolled / totalDistance));
        }
      }
    };

    const renderLoop = () => {
      // Smooth lerp smoothing to prevent abrupt jumps
      const smoothing = reducedMotion ? 1 : 0.16;
      currentP += (targetP - currentP) * smoothing;

      const pClamped = Math.max(0, Math.min(1, currentP));
      const scaled = pClamped * productCount;
      const rawIndex = Math.min(productCount - 1, Math.floor(scaled));
      const local =
        rawIndex === productCount - 1 && pClamped === 1 ? 1 : scaled - rawIndex;

      setContinuousProgress(pClamped);
      setContinuousLocalProgress(Math.max(0, Math.min(1, local)));

      // Transition window around boundary:
      // Last 25% of product i transitions smoothly into product i + 1
      const primary = rawIndex;
      let secondary: number | null = null;
      let transP = 0;

      if (local > 0.75 && rawIndex < productCount - 1) {
        secondary = rawIndex + 1;
        const rawT = (local - 0.75) / 0.25;
        // Smoothstep easing for organic deceleration/acceleration
        transP = rawT * rawT * (3 - 2 * rawT);
      }

      setTransitionState({
        primaryIndex: primary,
        secondaryIndex: secondary,
        transitionProgress: transP,
      });

      // Synchronize discrete activeIndex with midpoint of transition window
      const derivedIndex =
        secondary !== null && transP >= 0.5 ? secondary : primary;

      if (!isNavigatingRef.current && derivedIndex !== activeIndexRef.current) {
        setActiveIndex(derivedIndex);
      }

      rAFId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    handleScroll();
    rAFId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rAFId);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, [productCount, reducedMotion]);

  // Explore percentage
  const progressPercent = Math.min(
    100,
    Math.max(12, Math.round(((activeIndex + 1) / productCount) * 100))
  );

  // Transition parameters for outgoing and incoming visuals
  const { primaryIndex, secondaryIndex, transitionProgress } = transitionState;
  const primaryProduct = productList[primaryIndex] || productList[0];
  const secondaryProduct =
    secondaryIndex !== null ? productList[secondaryIndex] : null;

  const primaryOpacity = secondaryProduct ? 1 - transitionProgress : 1;
  const secondaryOpacity = secondaryProduct ? transitionProgress : 0;

  // Text micro-transition softness during boundary crossover
  const textTransitionSoftness = secondaryProduct
    ? Math.abs(transitionProgress - 0.5) < 0.15
      ? 0.8 + 0.2 * (Math.abs(transitionProgress - 0.5) / 0.15)
      : 1
    : 1;

  return (
    <div className={`relative w-full ${className}`}>
      {/* 
        SECTION SCROLL WRAPPER
        Configured to 1,200vh (~150vh per product) ensuring relaxed, steady exploration
        without abrupt transitions.
      */}
      <div
        ref={containerRef}
        className="relative w-full lg:min-h-[1200vh]"
        style={{ minHeight: `${scrollTravelVh}vh` }}
      >
        {/* 
          PINNED STAGE:
          Pinned cleanly beneath header on desktop. Releases naturally when the sequence completes.
        */}
        <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-5 overflow-hidden">
          <div className="w-full max-w-7xl mx-auto space-y-3 sm:space-y-4">
            
            {/* ========================================================= */}
            {/* 1. TECHNICAL STATUS ROW & CONTINUOUS PROGRESS TRACK       */}
            {/* ========================================================= */}
            <div className="w-full space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#A6A9B0] border-b border-[rgba(198,202,208,0.12)] pb-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1744] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1744]" />
                  </span>
                  <span className="text-white font-bold tracking-wider">
                    {`${label} // SYSTEM CORE // FRAME SEQUENCE`}
                  </span>
                  <span className="hidden sm:inline text-[rgba(198,202,208,0.3)]">|</span>
                  <span className="hidden sm:inline text-xs text-[#C6CAD0]">
                    SPECIFICATION:{" "}
                    <span className="text-[#FF1744] font-semibold">
                      {activeProduct.category}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#121218] px-3 py-1 rounded-full border border-[rgba(198,202,208,0.15)] text-[11px]">
                    <Activity className="w-3.5 h-3.5 text-[#FF1744]" />
                    <span className="text-[#71717A]">ACTIVE:</span>
                    <span className="text-white font-bold font-mono">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(productCount).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#C6CAD0]">
                    {progressPercent}% EXPLORED
                  </div>
                </div>
              </div>

              {/* Continuous Progress Bar Track */}
              <div className="w-full h-1 bg-[rgba(198,202,208,0.12)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#8B0015] via-[#C8102E] to-[#FF1744] transition-all duration-150"
                  style={{
                    width: `${Math.max(5, Number((continuousProgress * 100).toFixed(2)))}%`,
                  }}
                />
              </div>
            </div>

            {/* ========================================================= */}
            {/* 2. MAIN PRODUCT PRESENTATION STAGE (ROUNDED RECTANGULAR)   */}
            {/*    Immediately follows progress track with generous space */}
            {/* ========================================================= */}
            <div
              id={`panel-${activeProduct.id}`}
              role="region"
              aria-label={`Product details: ${activeProduct.name}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center bg-[#09090D] border border-[rgba(198,202,208,0.14)] rounded-3xl p-5 sm:p-7 lg:p-9 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle Ruby Ambient Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(200,16,46,0.12),transparent_70%)] pointer-events-none" />

              {/* ------------------------------------------------------- */}
              {/* LEFT COLUMN: PRODUCT INFORMATION (54% width on desktop)  */}
              {/* ------------------------------------------------------- */}
              <div
                className="lg:col-span-7 space-y-4 z-10 flex flex-col justify-between transition-opacity duration-200"
                style={{ opacity: textTransitionSoftness }}
              >
                {/* Category Badge & Module Indicator */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#FF1744] bg-[#FF1744]/10 border border-[#FF1744]/30">
                    {activeProduct.category}
                  </span>
                  <span className="text-xs font-mono text-[#71717A]">
                    {"//"} MODULE {activeProduct.number} OF {String(productCount).padStart(2, "0")}
                  </span>
                </div>

                {/* Main Heading & Description */}
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                    {activeProduct.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C6CAD0] leading-relaxed max-w-xl">
                    {activeProduct.description}
                  </p>
                </div>

                {/* Core Architectural Deliverables */}
                <div className="space-y-1.5 pt-0.5">
                  <div className="text-[10.5px] font-mono text-[#71717A] uppercase tracking-wider">
                    CORE ARCHITECTURAL DELIVERABLES
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeProduct.deliverables.map((deliv) => (
                      <div
                        key={deliv}
                        className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#12121A] border border-[rgba(198,202,208,0.16)] text-[11px] font-mono text-[#E4E4E7]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF1744] shrink-0" />
                        <span className="truncate">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-[10px] font-mono text-[#71717A] uppercase mr-1">
                    TECH STACK:
                  </span>
                  {activeProduct.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-[#161622] border border-[rgba(198,202,208,0.12)] text-[10px] font-mono text-[#A6A9B0]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Verified Measured Benchmark Pill */}
                {activeProduct.metrics && (
                  <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#161622] to-[#101016] border border-[rgba(198,202,208,0.15)] shadow-inner">
                    <span className="text-xl sm:text-2xl font-mono font-black text-[#FF1744]">
                      {activeProduct.metrics.value}
                    </span>
                    <span className="text-[11px] font-mono text-[#A6A9B0] uppercase leading-tight">
                      Measured Benchmark<br />
                      <span className="text-white font-semibold">
                        {activeProduct.metrics.label}
                      </span>
                    </span>
                  </div>
                )}

                {/* Primary CTA Buttons */}
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/contact?service=${encodeURIComponent(activeProduct.name)}`}
                    className="btn-ruby px-6 py-2.5 sm:py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-[#C8102E]/30 inline-flex items-center gap-2 hover:scale-[1.02] transition-transform"
                  >
                    <span>Deploy This Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={activeProduct.href}
                    className="px-4 py-2.5 sm:py-3 rounded-full font-mono text-xs text-[#C6CAD0] hover:text-white bg-[#13131A] hover:bg-[#1A1A24] border border-[rgba(198,202,208,0.18)] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Specifications</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                {/* PREV / NEXT Accessible Controls */}
                <div className="pt-2 flex items-center justify-between border-t border-[rgba(198,202,208,0.12)]">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={activeIndex === 0}
                      className="px-3.5 py-1.5 rounded-lg bg-[#14141C] hover:bg-[#1C1C28] text-white disabled:opacity-30 disabled:cursor-not-allowed border border-[rgba(198,202,208,0.15)] inline-flex items-center gap-1 text-xs font-mono font-semibold transition-all cursor-pointer"
                      aria-label="Previous product"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>PREV</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={activeIndex === productCount - 1}
                      className="px-3.5 py-1.5 rounded-lg bg-[#14141C] hover:bg-[#1C1C28] text-white disabled:opacity-30 disabled:cursor-not-allowed border border-[rgba(198,202,208,0.15)] inline-flex items-center gap-1 text-xs font-mono font-semibold transition-all cursor-pointer"
                      aria-label="Next product"
                    >
                      <span>NEXT</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-xs font-mono text-[#71717A]">
                    PRODUCT <span className="text-white font-bold">{activeProduct.number}</span> OF {String(productCount).padStart(2, "0")}
                  </div>
                </div>

              </div>

              {/* ------------------------------------------------------- */}
              {/* RIGHT COLUMN: SMOOTH PROCEDURAL VISUAL STAGE             */}
              {/* ------------------------------------------------------- */}
              <div className="lg:col-span-5 flex items-center justify-center relative select-none">
                <div className="relative w-full aspect-square max-w-[420px] sm:max-w-[460px] flex items-center justify-center">
                  
                  {/* Primary / Outgoing Visual */}
                  <div
                    className="w-full h-full absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
                    style={{
                      opacity: primaryOpacity,
                      transform: secondaryProduct
                        ? `scale(${1 + 0.04 * transitionProgress})`
                        : "scale(1)",
                    }}
                  >
                    <PortfolioVisualDispatcher
                      visualType={primaryProduct.visualType}
                      progress={continuousProgress}
                      localProgress={continuousLocalProgress}
                      active={true}
                      reducedMotion={reducedMotion}
                    />
                  </div>

                  {/* Secondary / Incoming Visual (Rendered smoothly during transition window) */}
                  {secondaryProduct && (
                    <div
                      className="w-full h-full absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out pointer-events-none"
                      style={{
                        opacity: secondaryOpacity,
                        transform: `scale(${0.96 + 0.04 * transitionProgress})`,
                      }}
                    >
                      <PortfolioVisualDispatcher
                        visualType={secondaryProduct.visualType}
                        progress={continuousProgress}
                        localProgress={0}
                        active={true}
                        reducedMotion={reducedMotion}
                      />
                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioFrameSequence;

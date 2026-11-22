"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section 
      aria-label="SparkIntellect Hero"
      className="relative min-h-[90vh] sm:min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#2B2A6B] w-full max-w-full"
    >
      {/* 5.1 Hero Background Image: Optimized WebP format for sub-second LCP rendering */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/Hero-background.webp"
          alt="SparkIntellect AI & Enterprise Systems Hero Background"
          fill
          priority
          fetchPriority="high"
          quality={85}
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Hero Content: Directly placed on the image without any box or grids */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center py-24 sm:py-32 md:py-36">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* 1. Strong, memorable brand quote placed directly on the image with Lilac radiance */}
          <div className="mb-5 sm:mb-6 inline-flex items-center gap-2 text-xs sm:text-sm md:text-base font-medium tracking-wide text-[#EEEAF8] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] px-2">
            <Sparkles className="w-4 h-4 text-[#d4a373] shrink-0" />
            <span className="italic font-display">
              &ldquo;Intelligence is not merely what we build — it is how we redefine the future of enterprise.&rdquo;
            </span>
          </div>

          {/* 2. Primary heading placed directly on the image */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-[#EEEAF8] leading-[1.15] tracking-tight mb-6 sm:mb-8 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Engineering Next-Generation{" "}
            <span className="text-gradient-yellow">AI & Enterprise</span> Platforms.
          </h1>

          {/* 3. One Start Project button with Bronze accent glassmorphism */}
          <div className="flex items-center justify-center w-full sm:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase glass-btn-primary group shadow-2xl hover:scale-105 transition-all w-full sm:w-auto"
            >
              <span>Start Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

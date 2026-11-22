"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { COMPANY_INFO } from "@/data/companyData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  TrendingUp,
} from "lucide-react";

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.8v8.37h-2.8v-8.37M7.86 6.54a1.64 1.64 0 0 0-1.64 1.63 1.64 1.64 0 0 0 1.64 1.64 1.64 1.64 0 0 0 1.63-1.64 1.64 1.64 0 0 0-1.63-1.63z" />
  </svg>
);

// Framer Motion Animation Variants for Editorial Reveal
const photoLeftVariants: Variants = {
  hidden: { opacity: 0, x: -60, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const photoRightVariants: Variants = {
  hidden: { opacity: 0, x: 60, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const contentContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const FounderSection: React.FC = () => {
  return (
    <section
      id="leadership"
      className="relative z-10 py-20 sm:py-28 lg:py-36 bg-[#EEEAF8] border-t border-[#2B2A6B]/15 w-full max-w-full"
    >
      {/* Background ambient lighting - isolated in clipping container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] max-w-[90vw] h-[500px] bg-[#2B2A6B]/[0.06] blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] max-w-[90vw] h-[500px] bg-[#d4a373]/[0.07] blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Executive Direction"
          title="The Minds Behind"
          highlightTitle="The Mission"
          subtitle="Operating under hands-on technical leadership and strategic governance, ensuring every client architecture meets enterprise rigor and scalable performance."
        />

        {/* Sequential Founders Showcase - Revealing One by One on Scroll */}
        <div className="mt-14 sm:mt-20 lg:mt-24 space-y-24 sm:space-y-36 lg:space-y-44">

          {/* =========================================================
              FOUNDER 1: Founder & CEO Mr. Prashanth
              Photo on the LEFT, Content on the RIGHT
              No surrounding card boxes or grid borders
             ========================================================= */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-center">
              
              {/* Photo Column - LEFT (order-1 on mobile & desktop) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={photoLeftVariants}
                className="lg:col-span-5 order-1"
              >
                <div className="relative mx-auto lg:mx-0 w-full max-w-[420px] lg:max-w-none aspect-[3/4] sm:aspect-[4/5] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_24px_60px_-15px_rgba(43,42,107,0.35)] bg-[#1E1D4E] group select-none">
                  
                  {/* Atmospheric Backlight Aura */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[#2B2A6B]/40 to-[#d4a373]/25 rounded-[2.5rem] blur-2xl pointer-events-none -z-10" />

                  <Image
                    src="/founder.webp"
                    alt={`${COMPANY_INFO.founder} - ${COMPANY_INFO.founderRole}`}
                    fill
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 480px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Soft Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2A6B]/85 via-[#2B2A6B]/15 to-transparent pointer-events-none" />

                  {/* Top Floating Role Badge */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2B2A6B]/90 backdrop-blur-md border border-[#EEEAF8]/25 text-[11px] sm:text-xs font-mono font-bold text-[#EEEAF8] shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
                    <span>Founder & CEO</span>
                  </div>

                  {/* Bottom Image Subtle Shimmer */}
                  <div className="absolute bottom-4 left-4 right-4 text-[10px] font-mono text-[#EEEAF8]/80 flex items-center justify-between pointer-events-none">
                    <span className="text-[#d4a373] font-bold">SPARKINTELLECT EXECUTIVE</span>
                    <span>TECH-FIRST DIRECTION</span>
                  </div>
                </div>
              </motion.div>

              {/* Content Column - RIGHT (order-2 on mobile & desktop) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={contentContainerVariants}
                className="lg:col-span-7 order-2 flex flex-col justify-center space-y-5 sm:space-y-6"
              >
                {/* 1. Category Pill */}
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2B2A6B] text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#EEEAF8] shadow-sm w-fit">
                  <Cpu className="w-3.5 h-3.5 text-[#d4a373]" />
                  <span>Technical Architecture & Direction</span>
                </motion.div>

                {/* 2. Founder Name in Indigo (#2B2A6B) */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#2B2A6B] tracking-tight leading-tight">
                    {COMPANY_INFO.founder}
                  </h3>
                  <div className="text-sm sm:text-base font-mono font-bold text-[#d4a373] mt-1.5 tracking-wide">
                    {COMPANY_INFO.founderRole} • Chief AI Architect
                  </div>
                </motion.div>

                {/* 3. Bio Description */}
                <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-[#2B2A6B]/85 leading-relaxed font-sans">
                  {COMPANY_INFO.founderBio}
                </motion.p>

                {/* 4. Founder Executive Philosophy Statement */}
                <motion.div
                  variants={itemVariants}
                  className="relative pl-5 sm:pl-6 border-l-3 border-[#d4a373] py-2"
                >
                  <p className="text-sm sm:text-base md:text-lg italic text-[#2B2A6B] font-display font-medium leading-relaxed">
                    &ldquo;Our mission is not merely to write code; it is to engineer intelligent digital systems that simplify operations and unlock enduring commercial scale.&rdquo;
                  </p>
                  <span className="block mt-2.5 text-xs font-mono font-bold text-[#d4a373] uppercase tracking-wider">
                    — {COMPANY_INFO.founder}, Founder & CEO
                  </span>
                </motion.div>

                {/* 5. Key Specialization Pills */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-1">
                  {[
                    "Artificial Intelligence & Neural Systems",
                    "Enterprise Platform Architecture",
                    "Autonomous Multi-Agent Tooling",
                    "High-Throughput Production SLA",
                  ].map((pill) => (
                    <span
                      key={pill}
                      className="px-3.5 py-1.5 rounded-full bg-[#2B2A6B]/10 border border-[#2B2A6B]/15 text-[11px] sm:text-xs font-mono text-[#2B2A6B] font-semibold"
                    >
                      {pill}
                    </span>
                  ))}
                </motion.div>

                {/* 6. LinkedIn CTA Link */}
                <motion.div variants={itemVariants} className="pt-2 flex items-center gap-4">
                  <a
                    href="https://linkedin.com/in/prashanth1416"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#2B2A6B] text-[#EEEAF8] hover:bg-[#1E1D4E] hover:text-[#d4a373] border border-[#2B2A6B] transition-all text-xs font-bold tracking-wide shadow-md group"
                    aria-label={`${COMPANY_INFO.founder} LinkedIn`}
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#d4a373]" />
                    <span>Connect with Mr. Prashanth</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>

              </motion.div>
            </div>
          </div>

          {/* Elegant Scroll Progression Cue */}
          <div className="relative flex items-center justify-center py-4">
            <div className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-[#2B2A6B]/20 to-transparent" />
            <div className="absolute px-4 py-1.5 rounded-full bg-[#EEEAF8] border border-[#2B2A6B]/20 text-[10px] font-mono font-bold text-[#d4a373] uppercase tracking-widest flex items-center gap-2 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373] animate-pulse" />
              <span>Executive Leadership</span>
            </div>
          </div>

          {/* =========================================================
              FOUNDER 2: Co-Founder & Managing Director Mr. Pranesh Rajagopal
              Revealed after scrolling
              Photo on the RIGHT, Content on the LEFT
              No surrounding card boxes or grid borders
             ========================================================= */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-center">
              
              {/* Content Column - LEFT on desktop (order-2 on mobile, order-1 on desktop) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={contentContainerVariants}
                className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center space-y-5 sm:space-y-6"
              >
                {/* 1. Category Pill */}
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2B2A6B] text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#EEEAF8] shadow-sm w-fit">
                  <TrendingUp className="w-3.5 h-3.5 text-[#d4a373]" />
                  <span>Operations & Strategic Growth</span>
                </motion.div>

                {/* 2. Co-Founder Name in Indigo (#2B2A6B) */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#2B2A6B] tracking-tight leading-tight">
                    {COMPANY_INFO.coFounder}
                  </h3>
                  <div className="text-sm sm:text-base font-mono font-bold text-[#d4a373] mt-1.5 tracking-wide">
                    {COMPANY_INFO.coFounderRole} • Head of Global Operations
                  </div>
                </motion.div>

                {/* 3. Bio Description */}
                <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-[#2B2A6B]/85 leading-relaxed font-sans">
                  {COMPANY_INFO.coFounderBio}
                </motion.p>

                {/* 4. Co-Founder Executive Philosophy Statement */}
                <motion.div
                  variants={itemVariants}
                  className="relative pl-5 sm:pl-6 border-l-3 border-[#d4a373] py-2"
                >
                  <p className="text-sm sm:text-base md:text-lg italic text-[#2B2A6B] font-display font-medium leading-relaxed">
                    &ldquo;Operational transparency, strategic market expansion, and long-term client trust define every partnership we undertake.&rdquo;
                  </p>
                  <span className="block mt-2.5 text-xs font-mono font-bold text-[#d4a373] uppercase tracking-wider">
                    — {COMPANY_INFO.coFounder}, Co-Founder & Managing Director
                  </span>
                </motion.div>

                {/* 5. Key Specialization Pills */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-1">
                  {[
                    "Strategic Enterprise Partnerships",
                    "Global Corporate Governance",
                    "Cross-Functional Operational Scale",
                    "Client ROI & Commercial Expansion",
                  ].map((pill) => (
                    <span
                      key={pill}
                      className="px-3.5 py-1.5 rounded-full bg-[#2B2A6B]/10 border border-[#2B2A6B]/15 text-[11px] sm:text-xs font-mono text-[#2B2A6B] font-semibold"
                    >
                      {pill}
                    </span>
                  ))}
                </motion.div>

                {/* 6. LinkedIn CTA Link */}
                <motion.div variants={itemVariants} className="pt-2 flex items-center gap-4">
                  <a
                    href={COMPANY_INFO.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#2B2A6B] text-[#EEEAF8] hover:bg-[#1E1D4E] hover:text-[#d4a373] border border-[#2B2A6B] transition-all text-xs font-bold tracking-wide shadow-md group"
                    aria-label={`${COMPANY_INFO.coFounder} LinkedIn`}
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#d4a373]" />
                    <span>Connect with Mr. Pranesh</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>

              </motion.div>

              {/* Photo Column - RIGHT on desktop (order-1 on mobile, order-2 on desktop) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={photoRightVariants}
                className="lg:col-span-5 order-1 lg:order-2"
              >
                <div className="relative mx-auto lg:mx-0 w-full max-w-[420px] lg:max-w-none aspect-[3/4] sm:aspect-[4/5] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_24px_60px_-15px_rgba(43,42,107,0.35)] bg-[#1E1D4E] group select-none">
                  
                  {/* Atmospheric Backlight Aura */}
                  <div className="absolute -inset-4 bg-gradient-to-tl from-[#2B2A6B]/40 to-[#d4a373]/25 rounded-[2.5rem] blur-2xl pointer-events-none -z-10" />

                  <Image
                    src="/images/pranesh-rajagopal-v2.webp"
                    alt={`${COMPANY_INFO.coFounder} - ${COMPANY_INFO.coFounderRole}`}
                    fill
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 480px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Soft Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2A6B]/85 via-[#2B2A6B]/15 to-transparent pointer-events-none" />

                  {/* Top Floating Role Badge */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2B2A6B]/90 backdrop-blur-md border border-[#EEEAF8]/25 text-[11px] sm:text-xs font-mono font-bold text-[#EEEAF8] shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
                    <span>Co-Founder & Managing Director</span>
                  </div>

                  {/* Bottom Image Subtle Shimmer */}
                  <div className="absolute bottom-4 left-4 right-4 text-[10px] font-mono text-[#EEEAF8]/80 flex items-center justify-between pointer-events-none">
                    <span className="text-[#d4a373] font-bold">SPARKINTELLECT EXECUTIVE</span>
                    <span>GLOBAL SCALABILITY</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* Leadership Consultation Action Link */}
        <div className="mt-20 sm:mt-24 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-display font-bold text-xs uppercase tracking-wider text-[#2B2A6B] bg-[#d4a373] hover:bg-[#deb68a] border border-[#deb68a] transition-all shadow-xl hover:scale-105"
          >
            <span>Consult Directly With Leadership</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FounderSection;

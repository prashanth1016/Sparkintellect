"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ArrowUp,
  Lock
} from "lucide-react";
import { COMPANY_INFO, SERVICES } from "@/data/companyData";

const MARQUEE_ITEMS = [
  "ARTIFICIAL INTELLIGENCE",
  "FULL-STACK WEB PLATFORMS",
  "AUTONOMOUS WORKFLOWS",
  "ENTERPRISE ERP SYSTEMS",
  "HIGH-SECURITY CLOUD DEVOPS",
  "SUB-SECOND VECTOR SEARCH",
];

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.8v8.37h-2.8v-8.37M7.86 6.54a1.64 1.64 0 0 0-1.64 1.63 1.64 1.64 0 0 0 1.64 1.64 1.64 1.64 0 0 0 1.63-1.64 1.64 1.64 0 0 0-1.63-1.63z" />
  </svg>
);

const TwitterXIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 bg-[#2B2A6B] border-t border-[#EEEAF8]/20 overflow-hidden w-full max-w-full">
      {/* 1. ANIMATED BRAND MARQUEE */}
      <div className="relative w-full max-w-full overflow-hidden border-b border-[#EEEAF8]/15 bg-[#1E1D4E] backdrop-blur-md py-3.5 sm:py-4 z-10">
        <div className="flex w-max animate-marquee space-x-8 text-xs font-mono font-bold tracking-[0.25em] text-[#EEEAF8] uppercase">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, idx) => (
            <div key={idx} className="flex items-center space-x-8">
              <span>{text}</span>
              <span className="text-[#d4a373]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. OVERSIZED BACKGROUND WATERMARK BRAND TEXT */}
      <div 
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 overflow-hidden leading-none opacity-[0.03] text-[20vw] font-display font-black tracking-tighter text-[#EEEAF8] whitespace-nowrap"
      >
        SPARKINTELLECT
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-[90vw] h-[350px] bg-[#d4a373]/[0.08] blur-[150px] rounded-full pointer-events-none z-0" />

      {/* 3. MAIN FOOTER CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-12 sm:mb-16">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-11 w-auto flex items-center">
                <Image
                  src="/images/sparkintellect-logo-v2.png"
                  alt="SparkIntellect Logo"
                  width={220}
                  height={45}
                  className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </div>
            </Link>

            <p className="text-[#EEEAF8]/80 text-xs sm:text-sm leading-relaxed max-w-md">
              SparkIntellect designs and develops AI-powered applications, enterprise platforms, and digital solutions that turn complex challenges into simple, scalable systems.
            </p>

            <div className="pt-1 flex items-center gap-3 text-[#EEEAF8]">
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/25 flex items-center justify-center hover:border-[#d4a373] hover:text-[#d4a373] text-[#EEEAF8] transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/25 flex items-center justify-center hover:border-[#d4a373] hover:text-[#d4a373] text-[#EEEAF8] transition-all shadow-sm"
                aria-label="Twitter / X"
              >
                <TwitterXIcon className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/25 flex items-center justify-center hover:border-[#d4a373] hover:text-[#d4a373] text-[#EEEAF8] transition-all shadow-sm"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[11px] font-semibold text-[#EEEAF8] shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4a373]" />
              <span>Registered Technology Firm • Chennai, India</span>
            </div>
          </div>

          {/* Column 2: Company Navigation */}
          <div className="space-y-4">
            <h3 className="text-[#d4a373] text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373]" />
              <span>Company</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-[#EEEAF8]/80 font-medium">
              <li>
                <Link href="/about" className="hover:text-[#d4a373] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#d4a373] group-hover:translate-x-1 transition-transform" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-[#d4a373] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#d4a373] group-hover:translate-x-1 transition-transform" />
                  <span>Case Studies</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#d4a373] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#d4a373] group-hover:translate-x-1 transition-transform" />
                  <span>Careers</span>
                </Link>
              </li>
              <li>
                <Link href="/internships" className="hover:text-[#d4a373] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#d4a373] group-hover:translate-x-1 transition-transform" />
                  <span>Internships</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#d4a373] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#d4a373] group-hover:translate-x-1 transition-transform" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Capabilities */}
          <div className="space-y-4">
            <h3 className="text-[#d4a373] text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373]" />
              <span>Services</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-[#EEEAF8]/80 font-medium">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-[#d4a373] transition-colors flex items-center gap-1.5 group">
                    <Sparkles className="w-3 h-3 text-[#d4a373] group-hover:rotate-12 transition-transform" />
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Chennai HQ */}
          <div className="space-y-4">
            <h3 className="text-[#d4a373] text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373]" />
              <span>Contact & HQ</span>
            </h3>
            <ul className="space-y-3 text-xs text-[#EEEAF8]/80 font-medium">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4a373] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address.replace(/Guindy,?\s*/i, "")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4a373] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-[#d4a373] transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#d4a373] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#d4a373] transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#d4a373] shrink-0 mt-0.5" />
                <span className="text-[11px] text-[#EEEAF8]/80">{COMPANY_INFO.workingHours}</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-[11px] text-[#EEEAF8] hover:text-[#d4a373] px-3.5 py-2 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 hover:border-[#d4a373]/50 transition-colors"
              >
                <Lock className="w-3 h-3 text-[#d4a373]" />
                <span>Team Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM BAR / EXACT REQUIRED COPYRIGHT */}
        <div className="pt-8 border-t border-[#EEEAF8]/15 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#EEEAF8]/70">
          <p>© 2026 SparkIntellect. All rights reserved.</p>
          
          <div className="flex items-center gap-6 font-medium">
            <Link href="/privacy" className="hover:text-[#d4a373] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#d4a373] transition-colors">
              Terms of Service
            </Link>
            <Link href="/support" className="hover:text-[#d4a373] transition-colors">
              Support & SLA
            </Link>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/25 hover:border-[#d4a373] text-[#EEEAF8] hover:text-[#d4a373] flex items-center justify-center transition-all group shadow-md"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

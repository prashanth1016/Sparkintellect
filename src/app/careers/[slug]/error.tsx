"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { AlertTriangle, RefreshCw, ArrowLeft, Mail } from "lucide-react";
import { COMPANY_INFO } from "@/data/companyData";

export default function CareerDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error diagnostic to client console without exposing secrets
    console.error("[CareerDetailError] Caught client boundary error:", error?.message || error);
  }, [error]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#FFFFFF] font-sans selection:bg-[#C8102E] selection:text-white">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-36 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="cinematic-card p-10 sm:p-14 rounded-3xl border border-[#C8102E]/30 bg-[#8B0015]/10 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#8B0015]/20 text-[#FF1744] border border-[#C8102E]/40 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#8B0015]/20 text-[#FF1744] border border-[#C8102E]/30 font-mono text-xs font-semibold">
                Service Notice
              </span>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Unable to Load Job Details
              </h1>
              <p className="text-sm text-[#A6A9B0] max-w-md mx-auto leading-relaxed">
                We encountered an unexpected connection issue while retrieving this role. Please try reloading the position or browse our other active engineering openings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => reset()}
                className="btn-ruby w-full sm:w-auto px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>

              <Link
                href="/careers"
                className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-xs bg-[#111115] text-[#C6CAD0] border border-[rgba(198,202,208,0.16)] hover:bg-[#1a1a22] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Browse All Careers</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-[rgba(198,202,208,0.1)] text-xs text-[#A6A9B0]">
              Questions about this position? Reach our recruitment desk at{" "}
              <a
                href={`mailto:${COMPANY_INFO.careersEmail}`}
                className="text-[#FF1744] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <Mail className="w-3 h-3" />
                <span>{COMPANY_INFO.careersEmail}</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

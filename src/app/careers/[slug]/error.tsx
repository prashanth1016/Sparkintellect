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
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-36 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="luxury-card p-10 sm:p-14 rounded-3xl border border-rose-200 bg-gradient-to-br from-white via-rose-50/30 to-white shadow-xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 font-mono text-xs font-semibold">
                Service Notice
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220]">
                Unable to Load Job Details
              </h1>
              <p className="text-sm text-[#334155] max-w-md mx-auto leading-relaxed">
                We encountered an unexpected connection issue while retrieving this role. Please try reloading the position or browse our other active engineering openings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => reset()}
                className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs bg-[#0B1220] text-white hover:bg-slate-800 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>

              <Link
                href="/careers"
                className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-xs bg-white text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Browse All Careers</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-[#BEE0FF]/60 text-xs text-[#334155]">
              Questions about this position? Reach our recruitment desk at{" "}
              <a
                href={`mailto:${COMPANY_INFO.careersEmail}`}
                className="text-[#0284c7] font-semibold hover:underline inline-flex items-center gap-1"
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

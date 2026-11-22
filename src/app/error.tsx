"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log safe error metric internally without exposing sensitive details to the browser
    console.error("Application boundary caught an error:", error?.message);
  }, [error]);

  return (
    <div className="relative min-h-screen bg-[#111412] text-[#fefae0] selection:bg-[#d4a373]/30 selection:text-white flex flex-col justify-between">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-36 pb-24">
        <div className="max-w-lg w-full mx-auto text-center">
          <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-[#d4a373]/25 bg-[#182019]/90 shadow-2xl relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a373]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#d4a373]/15 border border-[#d4a373]/30 text-[#d4a373] flex items-center justify-center mx-auto shadow-inner">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#d4a373]">
                  Runtime Notice • Safe Recovery
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#fefae0]">
                  Something Went Wrong
                </h1>
                <p className="text-xs sm:text-sm text-[#faedcd]/80 leading-relaxed max-w-sm mx-auto pt-1">
                  An unexpected issue occurred while rendering this view. Our client-side recovery handler can reload the component.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => reset()}
                  className="w-full sm:w-auto px-7 py-3 rounded-full font-bold text-xs bg-[#d4a373] text-[#111412] hover:bg-[#deb68a] shadow-lg shadow-[#d4a373]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto px-7 py-3 rounded-full font-medium text-xs glass-card text-[#fefae0] hover:text-white hover:border-[#d4a373]/40 flex items-center justify-center gap-2 transition-all"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Return to Home</span>
                </Link>
              </div>

              {error?.digest && (
                <div className="pt-4 text-[10px] font-mono text-[#faedcd]/50">
                  Incident Reference: {error.digest}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import React from "react";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { Compass, ArrowRight, Home, Layers } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#111412] text-[#fefae0] selection:bg-[#d4a373]/30 selection:text-white flex flex-col justify-between">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-36 pb-24">
        <div className="max-w-xl w-full mx-auto text-center">
          <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-[#d4a373]/25 bg-[#182019]/90 shadow-2xl relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a373]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#d4a373]/15 border border-[#d4a373]/30 text-[#d4a373] flex items-center justify-center mx-auto shadow-inner">
                <Compass className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#d4a373]">
                  Error 404 • Missing Blueprint
                </div>
                <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#fefae0]">
                  Page Not Found
                </h1>
                <p className="text-sm text-[#faedcd]/80 leading-relaxed max-w-md mx-auto pt-1">
                  The requested page or route could not be found. It may have been relocated, restructured, or is temporarily unavailable.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-7 py-3 rounded-full font-bold text-xs bg-[#d4a373] text-[#111412] hover:bg-[#deb68a] shadow-lg shadow-[#d4a373]/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Return to Homepage</span>
                </Link>

                <Link
                  href="/case-studies"
                  className="w-full sm:w-auto px-7 py-3 rounded-full font-medium text-xs glass-card text-[#fefae0] hover:text-white hover:border-[#d4a373]/40 flex items-center justify-center gap-2 transition-all"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>View Case Studies</span>
                </Link>
              </div>

              <div className="pt-6 border-t border-[#ccd5ae]/15 text-xs text-[#faedcd]/70">
                Need engineering assistance? <Link href="/contact" className="text-[#d4a373] hover:underline">Contact our technical desk</Link>.
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
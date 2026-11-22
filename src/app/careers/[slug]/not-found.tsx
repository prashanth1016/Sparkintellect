import React from "react";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Briefcase, ArrowRight, ArrowLeft } from "lucide-react";

export default function CareerNotFound() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#FFFFFF] font-sans selection:bg-[#C8102E] selection:text-white">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-36 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="cinematic-card p-10 sm:p-14 rounded-3xl border border-[rgba(198,202,208,0.16)] bg-[#0B0B0E]/90 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#8B0015]/20 border border-[#C8102E]/30 text-[#FF1744] flex items-center justify-center mx-auto shadow-inner">
              <Briefcase className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#8B0015]/20 border border-[#C8102E]/30 text-[#FF1744] font-mono text-xs font-semibold">
                404 — Position Not Found
              </span>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
                Career Opportunity Not Found
              </h1>
              <p className="text-sm text-[#A6A9B0] max-w-md mx-auto leading-relaxed">
                The career opening you are searching for does not exist, has expired, or is currently not accepting new applications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/careers"
                className="btn-ruby w-full sm:w-auto px-7 py-3.5 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>View All Open Positions</span>
              </Link>

              <Link
                href="/internships"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-xs bg-[#111115] text-[#C6CAD0] border border-[rgba(198,202,208,0.16)] hover:bg-[#1a1a22] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Internships</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

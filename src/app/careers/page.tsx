"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CandidateApplicationModal } from "@/components/careers/CandidateApplicationModal";
import { publicApi, CareerItem } from "@/lib/api";
import {
  Briefcase,
  MapPin,
  ArrowRight,
  Clock,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Send,
  FileCheck
} from "lucide-react";

export default function CareersPage() {
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<CareerItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadCareers = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await publicApi.getCareers();
      const active = (data || []).filter((c) => c.status === "active");
      setCareers(active);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCareers();
  }, []);

  const handleApplyClick = (career: CareerItem) => {
    setSelectedCareer(career);
    setModalOpen(true);
  };

  const handleGeneralApply = () => {
    setSelectedCareer(null);
    setModalOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#EEEAF8] text-[#2B2A6B] selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 sm:pb-24 w-full max-w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Engineering Careers"
            title="Current Openings at"
            highlightTitle="SparkIntellect"
            subtitle="Explore active full-time engineering and architecture vacancies. Direct production ownership and competitive compensation."
          />

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card rounded-3xl h-36 animate-pulse bg-white/[0.03]" />
              ))}
            </div>
          ) : error ? (
            <div className="glass-panel p-10 rounded-3xl border border-rose-500/30 bg-[#2B2A6B]/95 text-[#EEEAF8] text-center max-w-lg mx-auto space-y-4 shadow-xl">
              <AlertTriangle className="w-10 h-10 text-[#d4a373] mx-auto" />
              <h3 className="text-lg font-display font-bold text-[#EEEAF8]">
                Unable to load career openings
              </h3>
              <p className="text-xs text-[#EEEAF8]/80">
                We encountered a temporary connection issue. Please retry.
              </p>
              <button
                onClick={loadCareers}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs glass-btn-primary shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          ) : careers.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] text-center max-w-xl mx-auto space-y-5 shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-[#EEEAF8]/10 text-[#d4a373] border border-[#EEEAF8]/20 flex items-center justify-center mx-auto">
                <Briefcase className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-[#EEEAF8]">
                No Active Openings Currently
              </h3>
              
              <p className="text-xs sm:text-sm text-[#EEEAF8]/80 leading-relaxed">
                All scheduled vacancies are currently filled. Outstanding engineers and AI architects are always encouraged to submit a general candidate profile.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={handleGeneralApply}
                  className="glass-btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-display font-bold text-xs uppercase tracking-wider shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Candidate Profile</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {careers.map((role) => {
                const cleanLocation = (role.location || "Chennai (Hybrid)").replace(/Guindy,?\s*/i, "");

                return (
                  <div
                    key={role._id || role.id || role.slug}
                    className="glass-card p-7 sm:p-8 rounded-3xl border border-[#EEEAF8]/20 bg-[#2B2A6B]/95 text-[#EEEAF8] hover:border-[#d4a373]/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl transition-all group"
                  >
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-3 py-1 rounded-full bg-[#EEEAF8]/10 border border-[#EEEAF8]/20 text-[#d4a373] font-mono font-bold text-xs">
                          {role.department}
                        </span>
                        <span className="text-xs font-mono text-[#EEEAF8]/70">
                          {role.type} • {role.experience}
                        </span>
                      </div>

                      <h3 className="text-2xl font-display font-bold text-[#EEEAF8] group-hover:text-white transition-colors">
                        {role.title}
                      </h3>

                      <p className="text-xs text-[#EEEAF8]/80 max-w-2xl leading-relaxed">
                        {role.shortDesc}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-[#EEEAF8]/70 pt-1">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#d4a373]" />
                          <span>{cleanLocation}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
                      <Link
                        href={`/careers/${role.slug}`}
                        className="px-5 py-3 rounded-xl text-xs font-semibold glass-btn-secondary text-center"
                      >
                        Role Details
                      </Link>

                      <button
                        onClick={() => handleApplyClick(role)}
                        className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider glass-btn-primary flex items-center justify-center gap-2 shadow-lg"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* General Application Banner */}
              <div className="glass-panel p-8 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/90 text-[#EEEAF8] flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div>
                  <h4 className="text-base font-display font-bold text-[#EEEAF8]">
                    Don&apos;t see your specific specialization?
                  </h4>
                  <p className="text-xs text-[#EEEAF8]/80 mt-0.5">
                    Submit your details and resume directly to our talent pipeline for upcoming pods.
                  </p>
                </div>
                <button
                  onClick={handleGeneralApply}
                  className="px-6 py-3 rounded-xl text-xs font-bold glass-btn-secondary shrink-0 flex items-center gap-2"
                >
                  <FileCheck className="w-4 h-4 text-[#d4a373]" />
                  <span>General Application</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <FloatingCTA />

      {/* Candidate Multi-Step Application Modal */}
      <CandidateApplicationModal
        career={selectedCareer}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        availableCareers={careers}
      />
    </div>
  );
}

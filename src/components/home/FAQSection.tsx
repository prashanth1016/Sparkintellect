"use client";

import React, { useState, useEffect } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ChevronDown, HelpCircle, AlertCircle, RefreshCw } from "lucide-react";
import { publicApi, FAQItem } from "@/lib/api";

export const FAQSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const fetchFaqs = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await publicApi.getFaqs();
      // Filter published or active items
      const activeItems = data.filter((item) => item.published !== false);
      setFaqs(activeItems);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <SectionWrapper id="faq" className="relative z-10 py-16 sm:py-24 lg:py-32 bg-[#EEEAF8] border-t border-[#2B2A6B]/15 overflow-hidden w-full max-w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Direct Clarity"
          title="Frequently Asked"
          highlightTitle="Questions"
          subtitle="Everything you need to know about our architecture engagements, technical workflows, and continuous production support."
        />

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card rounded-2xl h-18 animate-pulse bg-white/[0.04]" />
            ))}
          </div>
        ) : error && faqs.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center space-y-4 bg-[#2B2A6B]/95 text-[#EEEAF8] border border-[#EEEAF8]/20">
            <AlertCircle className="w-8 h-8 text-[#d4a373] mx-auto" />
            <p className="text-sm text-[#EEEAF8]/80">Unable to load FAQs at this moment.</p>
            <button
              onClick={fetchFaqs}
              className="px-5 py-2 rounded-xl text-xs font-bold glass-btn-primary inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        ) : faqs.length === 0 ? (
          <div className="glass-card p-8 rounded-2xl text-center text-sm text-[#EEEAF8]/80 bg-[#2B2A6B]/95 border border-[#EEEAF8]/20">
            No FAQ entries are currently available. Check back soon or contact our engineering team.
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              const question = faq.question || faq.q || "";
              const answer = faq.answer || faq.a || "";

              return (
                <div
                  key={faq._id || idx}
                  className={`glass-card rounded-2xl border transition-all overflow-hidden bg-[#2B2A6B]/95 text-[#EEEAF8] ${
                    isOpen
                      ? "border-[#d4a373] shadow-lg shadow-[#2B2A6B]/25"
                      : "border-[#EEEAF8]/20 hover:border-[#d4a373]/50"
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-[#EEEAF8] text-base hover:text-white transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#d4a373] shrink-0" />
                      <span>{question}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#EEEAF8]/70 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#d4a373]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-[#EEEAF8]/85 leading-relaxed border-t border-white/[0.08] animate-in fade-in">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

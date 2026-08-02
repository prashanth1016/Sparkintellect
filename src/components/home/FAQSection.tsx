"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/companyData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <SectionWrapper className="relative z-10 py-24 bg-[#F2F9FF] border-t border-[#BEE0FF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Clear Answers"
          title="Frequently Asked"
          highlightTitle="Questions"
          subtitle="Everything you need to know about our project engagement process, technical capabilities, pricing, and maintenance support."
        />

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="luxury-card rounded-2xl border border-[#BEE0FF] overflow-hidden transition-all bg-white"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-[#0B1220] text-base hover:text-[#0284c7] transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#0284c7] shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#334155] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#0284c7]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-[#334155] text-sm leading-relaxed border-t border-[#BEE0FF]/50 animate-fadeIn font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

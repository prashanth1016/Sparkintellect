"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, Mail } from "lucide-react";
import { COMPANY_INFO } from "@/data/companyData";

export const FloatingCTA: React.FC = () => {
  const whatsappDigits = (COMPANY_INFO.whatsapp || "918977177634").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    "Hello SparkIntellect team! I would like to inquire about your software and AI solutions."
  )}`;

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5 sm:gap-3.5"
    >
      {/* Button 1: WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#2B2A6B]/90 backdrop-blur-xl border border-[#EEEAF8]/25 text-[#EEEAF8] hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#2B2A6B] flex items-center justify-center shadow-2xl hover:shadow-[0_4px_24px_rgba(37,211,102,0.25)] hover:scale-105 active:scale-95 transition-all group"
        title="Chat on WhatsApp"
        aria-label="Chat with SparkIntellect on WhatsApp"
      >
        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
      </a>

      {/* Button 2: Contact Form */}
      <Link
        href="/contact"
        className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#d4a373] backdrop-blur-xl border border-[#deb68a] text-[#2B2A6B] hover:bg-[#deb68a] flex items-center justify-center shadow-2xl hover:shadow-[0_4px_28px_rgba(212,163,115,0.45)] hover:scale-105 active:scale-95 transition-all group font-bold"
        title="Open Contact Form"
        aria-label="Navigate to Contact Form"
      >
        <Mail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
      </Link>
    </aside>
  );
};

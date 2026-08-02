"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, PhoneCall } from "lucide-react";
import { COMPANY_INFO } from "@/data/companyData";

export const FloatingCTA: React.FC = () => {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello SparkIntellect team! I would like to inquire about your software and AI solutions.")}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Quick Chat */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all group"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Chat"
      >
        <MessageSquare className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform" />
      </a>

      {/* Quick Call Button */}
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all group"
        title="Call Support"
        aria-label="Call SparkIntellect"
      >
        <PhoneCall className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
};

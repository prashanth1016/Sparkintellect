"use client";

import React, { useState } from "react";
import { Send, ArrowRight } from "lucide-react";
import { CareerItem } from "@/lib/api";
import { CandidateApplicationModal } from "./CandidateApplicationModal";

interface Props {
  career: CareerItem;
}

export const ApplyButtonModalTrigger: React.FC<Props> = ({ career }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-display font-bold text-sm tracking-wider uppercase glass-btn-primary shadow-xl transition-all"
      >
        <Send className="w-4 h-4" />
        <span>Apply for this Position</span>
      </button>

      <CandidateApplicationModal
        career={career}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

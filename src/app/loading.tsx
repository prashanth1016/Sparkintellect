import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="glass-panel p-8 rounded-3xl border border-[#ccd5ae]/20 bg-[#182019]/90 flex flex-col items-center justify-center space-y-4 max-w-xs shadow-2xl">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[#ccd5ae]/20" />
          <div className="w-12 h-12 rounded-full border-2 border-[#d4a373] border-t-transparent animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <span className="text-xs font-mono font-medium text-[#d4a373] tracking-wider uppercase">
            Loading System
          </span>
          <p className="text-[11px] text-[#faedcd]/70">Synchronizing modules...</p>
        </div>
      </div>
    </div>
  );
}
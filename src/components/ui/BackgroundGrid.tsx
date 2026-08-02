"use client";

import React from "react";

export const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
      {/* Light Radial Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(#BEE0FF 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Ambient Light Orbs */}
      <div className="light-glow-1 animate-soft-float" />
      <div className="light-glow-2 animate-soft-float" style={{ animationDelay: "3.5s" }} />

      {/* Bottom Soft Blue Glow */}
      <div className="absolute -bottom-32 left-1/3 w-[650px] h-[450px] bg-[#D6EBFF]/60 blur-[110px] rounded-full pointer-events-none" />
    </div>
  );
};

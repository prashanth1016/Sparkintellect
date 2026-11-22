"use client";

import React from "react";

export const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#EEEAF8]">
      {/* Subtle Indigo Grid Overlay on Lilac Canvas (60% Primary) */}
      <div 
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #2B2A6B 1px, transparent 1px), linear-gradient(to bottom, #2B2A6B 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient Glowing Orbs: Hardware accelerated for silky-smooth 60/120fps scrolling */}
      <div 
        className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-[#2B2A6B]/[0.09] blur-[140px] rounded-full pointer-events-none"
        style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
      />
      <div 
        className="absolute top-[35%] right-[5%] w-[550px] h-[550px] bg-[#d4a373]/[0.10] blur-[130px] rounded-full pointer-events-none"
        style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
      />
      <div 
        className="absolute bottom-[-15%] left-[25%] w-[700px] h-[500px] bg-[#2B2A6B]/[0.07] blur-[140px] rounded-full pointer-events-none"
        style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
      />
    </div>
  );
};

export default BackgroundGrid;

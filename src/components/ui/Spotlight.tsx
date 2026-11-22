"use client";

import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MousePosition {
  x: number | null;
  y: number | null;
}

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  ProximitySpotlight?: boolean;
  HoverFocusSpotlight?: boolean;
  CursorFlowGradient?: boolean;
}

interface SpotlightItemProps {
  children: React.ReactNode;
  className?: string;
}

interface SpotLightContextType {
  ProximitySpotlight: boolean;
  HoverFocusSpotlight: boolean;
  CursorFlowGradient: boolean;
  mousePosition: MousePosition;
}

const SpotLightContext = createContext<SpotLightContextType | undefined>(undefined);

export const useSpotlight = () => {
  const context = useContext(SpotLightContext);
  if (!context) {
    throw new Error("useSpotlight must be used within a SpotlightProvider");
  }
  return context;
};

export const Spotlight: React.FC<SpotlightProps> = ({
  children,
  className,
  ProximitySpotlight = true,
  HoverFocusSpotlight = false,
  CursorFlowGradient = true,
}) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const updateMousePosition = (ev: globalThis.MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <SpotLightContext.Provider
      value={{
        ProximitySpotlight,
        HoverFocusSpotlight,
        CursorFlowGradient,
        mousePosition,
      }}
    >
      <div className={cn("group relative z-10", className)}>{children}</div>
    </SpotLightContext.Provider>
  );
};

export function SpotLightItem({ children, className }: SpotlightItemProps) {
  const { HoverFocusSpotlight, ProximitySpotlight, CursorFlowGradient, mousePosition } = useSpotlight();
  const boxWrapper = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [overlayColor, setOverlayColor] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setOverlayColor({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => CursorFlowGradient && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={boxWrapper}
      className={cn(
        "relative rounded-3xl p-[1.5px] bg-[#2B2A6B]/20 hover:bg-[#d4a373]/40 transition-colors duration-300 overflow-hidden",
        className
      )}
    >
      {/* Dynamic Cursor Flow Gradient over Card Surface */}
      {isHovered && (
        <div
          className="pointer-events-none absolute opacity-0 z-30 rounded-3xl w-full h-full group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `
              radial-gradient(
                320px circle at ${overlayColor.x}px ${overlayColor.y}px,
                rgba(212, 163, 115, 0.22),
                rgba(43, 42, 107, 0.15) 45%,
                transparent 80%
              )
            `,
          }}
        />
      )}

      {/* Hover Focus Spotlight */}
      {HoverFocusSpotlight && mousePosition.x !== null && (
        <div
          className="pointer-events-none absolute opacity-0 group-hover:opacity-100 z-10 inset-0 bg-fixed rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 163, 115, 0.25) 0%, rgba(43, 42, 107, 0.12) 20%, transparent 45%) fixed`,
          }}
        />
      )}

      {/* Proximity Ambient Spotlight across adjacent cards */}
      {ProximitySpotlight && mousePosition.x !== null && (
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-fixed rounded-3xl opacity-60"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 163, 115, 0.15) 0%, rgba(43, 42, 107, 0.08) 15%, transparent 35%) fixed`,
          }}
        />
      )}

      {/* Content wrapper with deep Indigo (30% Secondary) glass backing and Lilac text */}
      <div className="relative z-20 h-full w-full rounded-[calc(1.5rem-1.5px)] bg-[#2B2A6B]/95 text-[#EEEAF8] backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  return (
    <div
      className={cn(
        "relative h-full bg-[#2B2A6B]/95 text-[#EEEAF8] rounded-3xl p-px overflow-hidden border border-[#EEEAF8]/20 hover:border-[#d4a373]/50 transition-colors shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}

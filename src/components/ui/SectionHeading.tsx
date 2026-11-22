import React from "react";
import { Sparkles } from "lucide-react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlightTitle?: string;
  subtitle?: string;
  center?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlightTitle,
  subtitle,
  center = true,
}) => {
  return (
    <div className={`mb-8 sm:mb-12 md:mb-16 ${center ? "text-center" : "text-left"}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-widest bg-[#2B2A6B] border border-[#d4a373]/35 text-[#EEEAF8] mb-3 sm:mb-4 shadow-md backdrop-blur-md ${center ? "mx-auto" : ""}`}>
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#d4a373]" />
          <span className="tracking-widest">{badge}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#2B2A6B] leading-tight tracking-tight">
        {title}{" "}
        {highlightTitle && (
          <span className="text-gradient-yellow">{highlightTitle}</span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm md:text-base text-[#2B2A6B]/80 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

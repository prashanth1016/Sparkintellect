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
    <div className={`mb-14 md:mb-20 ${center ? "text-center" : "text-left"}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#D6EBFF] border border-[#BEE0FF] text-[#0B1220] mb-4 ${center ? "mx-auto" : ""}`}>
          <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-5xl font-serif text-[#0B1220] leading-tight tracking-tight">
        {title}{" "}
        {highlightTitle && (
          <span className="text-gradient-navy font-serif italic">{highlightTitle}</span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-[#334155] max-w-3xl mx-auto leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};

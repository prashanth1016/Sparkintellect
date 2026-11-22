"use client";

import React, { useState } from "react";
import { Sparkles, Layers, Cpu, Database, Cloud, Bot, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

// --- Authentic Brand SVG Logos ---

const ReactLogo = () => (
  <svg className="w-6 h-6 text-[#61DAFB]" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const NextjsLogo = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 180 180" fill="none">
    <mask id="nextjs-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: "alpha" }}>
      <circle cx="90" cy="90" r="90" fill="black" />
    </mask>
    <g mask="url(#nextjs-mask)">
      <circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="6" />
      <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#nextjs-grad)" />
      <rect x="115" y="54" width="12" height="72" fill="url(#nextjs-grad-2)" />
    </g>
    <defs>
      <linearGradient id="nextjs-grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="nextjs-grad-2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const TypeScriptLogo = () => (
  <svg className="w-6 h-6" viewBox="0 0 128 128" fill="none">
    <rect width="128" height="128" rx="20" fill="#3178C6"/>
    <path d="M72 80V96H56V80H40V64H56V48H72V64H88V80H72Z" fill="white" fillOpacity="0"/>
    <text x="64" y="86" textAnchor="middle" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="58">TS</text>
  </svg>
);

const TailwindLogo = () => (
  <svg className="w-6 h-6 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.975,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.975,12,6.001,12z"/>
  </svg>
);

const FlutterLogo = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <path d="M14.314 0L2.3 12.014l3.695 3.695L21.705 0h-7.391z" fill="#54C5F8"/>
    <path d="M14.286 10.963L8.529 16.72l5.757 5.757h7.386l-9.444-9.445 2.058-2.069z" fill="#02569B"/>
    <path d="M12.228 13.032l-3.699 3.688 3.699 3.699 3.699-3.699-3.699-3.688z" fill="#0175C2"/>
  </svg>
);

const PythonLogo = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <path d="M11.914 0C5.748 0 6.134 2.68 6.134 2.68l.007 2.778h5.845v.834H3.85S0 5.85 0 12.062c0 6.213 3.355 5.986 3.355 5.986h2v-2.812s-.11-3.355 3.298-3.355h5.688s3.185.05 3.185-3.08V3.185S18.08 0 11.914 0zM8.88 1.834a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16z" fill="#3776AB"/>
    <path d="M12.086 24c6.166 0 5.78-2.68 5.78-2.68l-.007-2.778h-5.845v-.834h8.136S24 18.15 24 11.938c0-6.213-3.355-5.986-3.355-5.986h-2v2.812s.11 3.355-3.298 3.355H9.659s-3.185-.05-3.185 3.08v5.673S5.92 24 12.086 24zm3.034-1.834a1.08 1.08 0 1 1 0-2.16 1.08 1.08 0 0 1 0 2.16z" fill="#FFD438"/>
  </svg>
);

const NodejsLogo = () => (
  <svg className="w-6 h-6 text-[#5FA04E]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l9.19 5.3v10.6L12 23.2l-9.19-5.3V7.3L12 2zm0 2.31L4.81 8.46v7.38L12 20.14l7.19-4.3v-7.38L12 4.31zM12 7a4.5 4.5 0 0 1 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5a4.5 4.5 0 0 1-4.5-4.5C7.5 9.02 9.52 7 12 7z"/>
  </svg>
);

const FastAPILogo = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#009688"/>
    <path d="M11.5 6L6.5 13H11.5L10.5 18L17.5 11H12.5L13.5 6H11.5Z" fill="white"/>
  </svg>
);

const GraphQLLogo = () => (
  <svg className="w-6 h-6 text-[#E10098]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.32L5.34 8.16v7.68L12 19.68l6.66-3.84V8.16L12 4.32zM12 6.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm-5 8.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm10 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"/>
  </svg>
);

const PyTorchLogo = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <path d="M13.2 2.5L12 1.3 7.8 5.5c-3.5 3.5-3.5 9.2 0 12.7 3.5 3.5 9.2 3.5 12.7 0 3.5-3.5 3.5-9.2 0-12.7L18 8l1.2 1.2c2.8 2.8 2.8 7.4 0 10.2-2.8 2.8-7.4 2.8-10.2 0-2.8-2.8-2.8-7.4 0-10.2L13.2 2.5z" fill="#EE4C2C"/>
    <circle cx="16.5" cy="5.5" r="1.5" fill="#EE4C2C"/>
  </svg>
);

const OpenAILogo = () => (
  <svg className="w-6 h-6 text-[#F7F8FA]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.28 9.42a5.55 5.55 0 0 0-.47-4.48 5.66 5.66 0 0 0-4.06-2.73 5.75 5.75 0 0 0-4.75 1.13 5.6 5.6 0 0 0-4.13-.59 5.66 5.66 0 0 0-3.64 2.46 5.73 5.73 0 0 0-.74 4.8 5.57 5.57 0 0 0-2.7 2.45 5.66 5.66 0 0 0-.58 4.31 5.75 5.75 0 0 0 3.02 4.02 5.6 5.6 0 0 0 4.14.6 5.66 5.66 0 0 0 3.63-2.46 5.72 5.72 0 0 0 .74-4.81 5.59 5.59 0 0 0 2.7-2.45 5.66 5.66 0 0 0 .58-4.31 5.74 5.74 0 0 0-3.02-4.02zM12 15a3 3 0 1 1 3-3 3 3 0 0 1-3 3z"/>
  </svg>
);

const ClaudeLogo = () => (
  <svg className="w-6 h-6 text-[#D97706]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L14 9L21 10L15.5 14.5L17.5 21.5L12 17L6.5 21.5L8.5 14.5L3 10L10 9L12 2Z"/>
  </svg>
);

const LangChainLogo = () => (
  <svg className="w-6 h-6 text-[#10B981]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.5 3a2.5 2.5 0 1 0 0 5h3a2.5 2.5 0 1 0 0-5h-3zm-4 7a2.5 2.5 0 1 0 0 5h11a2.5 2.5 0 1 0 0-5h-11zm4 7a2.5 2.5 0 1 0 0 5h3a2.5 2.5 0 1 0 0-5h-3z"/>
  </svg>
);

const PostgreSQLLogo = () => (
  <svg className="w-6 h-6 text-[#336791]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.8 14.8c-.8.8-1.9 1.2-3.1 1.2-1.5 0-2.8-.7-3.6-1.8l1.4-1.1c.5.7 1.3 1.1 2.2 1.1.7 0 1.3-.2 1.8-.7.4-.4.6-.9.6-1.5 0-.5-.2-1-.5-1.3-.4-.4-1.1-.7-2.1-1.1-1.3-.5-2.2-.9-2.8-1.5-.6-.6-.9-1.3-.9-2.2 0-1 .4-1.9 1.2-2.5.8-.7 1.9-1 3.1-1 1.2 0 2.3.4 3.1 1.2l-1.3 1.2c-.5-.5-1.2-.8-1.8-.8-.6 0-1.1.2-1.5.5-.3.3-.5.7-.5 1.2 0 .4.2.8.5 1.1.4.3 1.1.6 2.1 1 .1 0 .2.1.3.1 1.3.5 2.2 1 2.8 1.6.6.6.9 1.4.9 2.3 0 1.1-.4 2.1-1.2 2.9z"/>
  </svg>
);

const MongoDBLogo = () => (
  <svg className="w-6 h-6 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24c-.216 0-.422-.09-.569-.247-.417-.446-5.836-6.284-5.836-12.71C5.781 4.908 9.07 0 12.186 0c3.116 0 6.405 4.908 6.405 11.043 0 6.426-5.419 12.264-5.836 12.71-.147.157-.353.247-.569.247zm0-22.154c-2.28 0-4.814 4.02-4.814 9.197 0 4.887 3.821 9.771 4.814 10.985 1.002-1.22 4.814-6.098 4.814-10.985 0-5.177-2.534-9.197-4.814-9.197z"/>
    <path d="M12 2v20c-.5 0-1-.5-1-1V3c0-.5.5-1 1-1z" fill="#3FA037"/>
  </svg>
);

const RedisLogo = () => (
  <svg className="w-6 h-6 text-[#DC382D]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.5 7L12 2l9.5 5-9.5 5-9.5-5zm0 5l9.5 5 9.5-5v3l-9.5 5-9.5-5v-3zm0 5l9.5 5 9.5-5v3l-9.5 5-9.5-5v-3z"/>
  </svg>
);

const DockerLogo = () => (
  <svg className="w-6 h-6 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.5 10.5c-.3-2.1-1.9-3.2-3.1-3.4-.4-.1-.8-.1-1.2 0-.6-1.5-1.9-2.6-3.7-2.6h-.5v2.5h-2V4.5h-2V7h-2V4.5h-2V7h-2v2.5h-2V7H.5v7c0 4.1 3.4 7.5 7.5 7.5 5.5 0 9.8-3.9 10.8-9.1 1.3-.2 3.1-1.1 3.7-1.9zm-8.5-1h1.5v1.5H14V9.5zm-3.5 0H12v1.5h-1.5V9.5zm-3.5 0H8.5v1.5H7V9.5zm-3.5 0H5v1.5H3.5V9.5zm7-3.5H12v1.5h-1.5V6zm-3.5 0H8.5v1.5H7V6z"/>
  </svg>
);

const AWSLogo = () => (
  <svg className="w-6 h-6 text-[#FF9900]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.5 12c-.3 0-.6.1-.8.3-.3.2-.4.5-.4.8 0 .4.2.7.5.9.3.2.7.3 1.2.3.8 0 1.5-.3 2.1-.8V12h-2.6zm6.8 5.7c-1.3 0-2.3-.3-3.1-1-.8-.6-1.2-1.5-1.2-2.6 0-1.2.4-2.1 1.2-2.7.8-.7 1.9-1 3.2-1h2.5v-.8c0-.7-.2-1.2-.5-1.5-.4-.3-.9-.5-1.7-.5-.6 0-1.1.1-1.6.4-.5.3-.8.6-1 1l-1.8-1.2c.4-.7 1-1.2 1.8-1.6.8-.4 1.7-.6 2.8-.6 1.6 0 2.8.4 3.7 1.1.9.8 1.3 1.9 1.3 3.3v7.3h-2.3v-1.6c-.7 1.1-1.9 1.6-3.3 1.6z"/>
    <path d="M2.5 19.5c6.5 3 13.5 3 20 0 .5-.2.8-.8.5-1.3-.2-.5-.8-.8-1.3-.5-5.8 2.7-12.1 2.7-17.9 0-.5-.2-1.1 0-1.3.5-.2.5 0 1.1.5 1.3z"/>
  </svg>
);

const CloudflareLogo = () => (
  <svg className="w-6 h-6 text-[#F38020]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.24 9.42a5.55 5.55 0 0 0-4.75-2.92 5.57 5.57 0 0 0-5.18 3.51A4.2 4.2 0 0 0 4.2 14.1a4.2 4.2 0 0 0 4.2 4.2h10.2a3.6 3.6 0 0 0 3.6-3.6 3.57 3.57 0 0 0-4-3.58z"/>
  </svg>
);

const KubernetesLogo = () => (
  <svg className="w-6 h-6 text-[#326CE5]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm0 2.3l6.5 3.8v7.8L12 19.7l-6.5-3.8V8.1L12 4.3zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
  </svg>
);

// --- Technology Data Groups ---

interface TechItem {
  name: string;
  category: "Frontend" | "Backend" | "AI & Models" | "Databases" | "Cloud & DevOps";
  icon: React.ReactNode;
}

const TECH_TRACK_ONE: TechItem[] = [
  { name: "Next.js 16", category: "Frontend", icon: <NextjsLogo /> },
  { name: "React 19", category: "Frontend", icon: <ReactLogo /> },
  { name: "TypeScript", category: "Frontend", icon: <TypeScriptLogo /> },
  { name: "OpenAI GPT-4o", category: "AI & Models", icon: <OpenAILogo /> },
  { name: "Claude 3.5", category: "AI & Models", icon: <ClaudeLogo /> },
  { name: "PyTorch", category: "AI & Models", icon: <PyTorchLogo /> },
  { name: "LangChain", category: "AI & Models", icon: <LangChainLogo /> },
  { name: "PostgreSQL", category: "Databases", icon: <PostgreSQLLogo /> },
  { name: "MongoDB", category: "Databases", icon: <MongoDBLogo /> },
  { name: "Tailwind CSS", category: "Frontend", icon: <TailwindLogo /> },
];

const TECH_TRACK_TWO: TechItem[] = [
  { name: "Node.js", category: "Backend", icon: <NodejsLogo /> },
  { name: "Python", category: "Backend", icon: <PythonLogo /> },
  { name: "FastAPI", category: "Backend", icon: <FastAPILogo /> },
  { name: "GraphQL", category: "Backend", icon: <GraphQLLogo /> },
  { name: "Docker", category: "Cloud & DevOps", icon: <DockerLogo /> },
  { name: "Kubernetes", category: "Cloud & DevOps", icon: <KubernetesLogo /> },
  { name: "AWS Cloud", category: "Cloud & DevOps", icon: <AWSLogo /> },
  { name: "Cloudflare", category: "Cloud & DevOps", icon: <CloudflareLogo /> },
  { name: "Redis", category: "Databases", icon: <RedisLogo /> },
  { name: "Flutter", category: "Frontend", icon: <FlutterLogo /> },
];

const CATEGORIES = [
  { id: "all", label: "All Frameworks", icon: Layers },
  { id: "AI & Models", label: "AI & Neural Models", icon: Bot },
  { id: "Frontend", label: "Frontend & Mobile", icon: Code2 },
  { id: "Backend", label: "Backend & APIs", icon: Cpu },
  { id: "Databases", label: "Databases", icon: Database },
  { id: "Cloud & DevOps", label: "Cloud & Infrastructure", icon: Cloud },
];

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <section className="py-20 sm:py-32 bg-[#EEEAF8] border-t border-[#2B2A6B]/15 relative overflow-hidden w-full max-w-full">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] max-w-[90vw] h-[500px] bg-[#2B2A6B]/[0.08] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] max-w-[90vw] h-[500px] bg-[#d4a373]/[0.08] blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12 md:mb-16">
        <SectionHeading
          badge="Modern Foundation"
          title="The Machinery of"
          highlightTitle="Modern Innovation"
          subtitle="Battle-tested open-source and enterprise frameworks that guarantee longevity, sub-second latency, and computational integrity."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-6 sm:mt-8">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono font-bold transition-all duration-300 ${
                  isSelected
                    ? "bg-[#d4a373] text-[#2B2A6B] shadow-lg shadow-[#d4a373]/30 scale-105"
                    : "bg-[#2B2A6B] border border-[#EEEAF8]/20 text-[#EEEAF8]/80 hover:text-[#d4a373] hover:border-[#d4a373]"
                }`}
              >
                <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Infinite Logo Marquee Showcase Container */}
      <div className="relative w-full max-w-full space-y-4 sm:space-y-6 md:space-y-8 overflow-hidden py-3 sm:py-4">
        
        {/* Left & Right Smooth Edge Fade Masks in Lilac */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-48 bg-gradient-to-r from-[#EEEAF8] via-[#EEEAF8]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-48 bg-gradient-to-l from-[#EEEAF8] via-[#EEEAF8]/80 to-transparent z-20" />

        {/* TRACK 1: Scrolls Left */}
        <div className="animate-marquee flex items-center gap-6 sm:gap-8">
          {[...TECH_TRACK_ONE, ...TECH_TRACK_ONE].map((tech, idx) => {
            const isHighlighted = selectedCategory === "all" || selectedCategory === tech.category;
            return (
              <div
                key={`track-1-${tech.name}-${idx}`}
                className={`flex items-center gap-4 px-6 sm:px-7 py-4 rounded-2xl bg-[#2B2A6B]/95 border transition-all duration-300 shadow-xl shrink-0 group ${
                  isHighlighted
                    ? "border-[#EEEAF8]/25 hover:border-[#d4a373] hover:bg-[#2B2A6B] hover:scale-105 opacity-100"
                    : "border-[#EEEAF8]/10 opacity-35 grayscale"
                }`}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.06] border border-[#EEEAF8]/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-[#d4a373] transition-all duration-300 shadow-inner">
                  {tech.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-display font-bold text-[#EEEAF8] group-hover:text-white whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#d4a373] uppercase tracking-wider font-semibold">
                    {tech.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* TRACK 2: Scrolls Right (Reverse Direction) */}
        <div className="animate-marquee-reverse flex items-center gap-6 sm:gap-8">
          {[...TECH_TRACK_TWO, ...TECH_TRACK_TWO].map((tech, idx) => {
            const isHighlighted = selectedCategory === "all" || selectedCategory === tech.category;
            return (
              <div
                key={`track-2-${tech.name}-${idx}`}
                className={`flex items-center gap-4 px-6 sm:px-7 py-4 rounded-2xl bg-[#2B2A6B]/95 border transition-all duration-300 shadow-xl shrink-0 group ${
                  isHighlighted
                    ? "border-[#EEEAF8]/25 hover:border-[#d4a373] hover:bg-[#2B2A6B] hover:scale-105 opacity-100"
                    : "border-[#EEEAF8]/10 opacity-35 grayscale"
                }`}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.06] border border-[#EEEAF8]/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-[#d4a373] transition-all duration-300 shadow-inner">
                  {tech.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-display font-bold text-[#EEEAF8] group-hover:text-white whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#d4a373] uppercase tracking-wider font-semibold">
                    {tech.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Subtext info pill */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2B2A6B] border border-[#EEEAF8]/20 text-xs font-mono text-[#EEEAF8]/80">
          <span className="w-2 h-2 rounded-full bg-[#d4a373] animate-pulse" />
          <span>Hover marquee to pause • Continuous integration across all 20+ core tech stacks</span>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ARCHITECTURE_PRODUCTS = [
  {
    id: "ai-copilots",
    number: "01",
    category: "AI & INTELLIGENCE",
    name: "AI Assistants & Copilots",
    tagline: "Autonomous Agent Tooling & Sub-100ms Inference",
    description:
      "Domain-trained conversational neural models, intelligent internal knowledge bases, and autonomous multi-agent copilots engineered for customer support and complex workflow automation.",
    deliverables: [
      "Domain Vector RAG & Semantic Search",
      "Autonomous Multi-Agent Tool Calling",
      "Private LLM Self-Hosting & Guardrails",
      "Sub-100ms Streaming Inference",
    ],
    technologies: ["Python", "FastAPI", "LangChain", "Qdrant", "vLLM", "OpenAI"],
    href: "/services/ai-development",
    metrics: {
      value: "94.8%",
      label: "Query Acceleration",
      subtext: "Enterprise RAG retrieval benchmark across 1M+ technical documents",
    },
    imageUrl: "/images/products/ai-assistant.webp",
    localFallback: "/images/products/ai-assistant.webp",
  },
  {
    id: "custom-erp",
    number: "02",
    category: "ENTERPRISE SYSTEMS",
    name: "Custom ERP Systems",
    tagline: "Multi-Tier Approval Engines & Ledger Synchronization",
    description:
      "Tailored enterprise resource planning platforms unifying inventory tracking, automated procurement, field site logs, and multi-entity financial ledgers into one secure system.",
    deliverables: [
      "Role-Based Granular Permissions (ACL)",
      "Real-Time Multi-Location Inventory Sync",
      "Automated Multi-Tier Purchase Approvals",
      "Immutable Audit Logs & Financial Telemetry",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis", "Docker"],
    href: "/services/enterprise-software",
    metrics: {
      value: "4.2x",
      label: "Ops Cycle Speed",
      subtext: "Reduction in cross-department purchase and procurement approval latency",
    },
    imageUrl: "/images/products/custom-erp.webp",
    localFallback: "/images/products/custom-erp.webp",
  },
  {
    id: "crm-platforms",
    number: "03",
    category: "SALES AUTOMATION",
    name: "CRM & Lead Platforms",
    tagline: "Intelligent Lead Scoring & WhatsApp Cloud Pipeline",
    description:
      "High-conversion customer relationship engines equipped with algorithmic lead prioritization, automated round-robin distribution, and sub-60-second WhatsApp customer journeys.",
    deliverables: [
      "Dynamic Algorithmic Lead Scoring",
      "Official WhatsApp Cloud API Ingestion",
      "Multi-Channel Sales Pipeline Stages",
      "Real-Time Conversion Telemetry & SLA Tracking",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "MongoDB", "RabbitMQ", "Kafka"],
    href: "/services/automation",
    metrics: {
      value: "+62%",
      label: "Lead Capture Rate",
      subtext: "Measured conversion uplift via instant WhatsApp engagement automation",
    },
    imageUrl: "/images/products/crm-platform.webp",
    localFallback: "/images/products/crm-platform.webp",
  },
  {
    id: "client-portals",
    number: "04",
    category: "WEB APPLICATIONS",
    name: "Customer & Vendor Portals",
    tagline: "Self-Service Digital Hubs & AES-256 Vaults",
    description:
      "High-security self-service client and supplier workspaces for automated invoice generation, live milestone inspection, dispute resolution, and encrypted document sharing.",
    deliverables: [
      "AES-256 Encrypted Document Vault",
      "Milestone Tracking & Sign-Off Workflows",
      "Instant Payment Gateway & Invoice Settlement",
      "Granular Multi-Tenant Vendor Permissions",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "AWS S3", "Stripe"],
    href: "/services/web-development",
    metrics: {
      value: "-48%",
      label: "Support Ticket Drop",
      subtext: "Customer ticket volume reduction following portal self-service adoption",
    },
    imageUrl: "/images/products/vendor-portals.svg",
    localFallback: "/images/products/vendor-portals.svg",
  },
  {
    id: "ecommerce-platforms",
    number: "05",
    category: "DIGITAL COMMERCE",
    name: "E-Commerce Platforms",
    tagline: "Ultra-Fast Headless Storefronts & Atomic Inventory Locks",
    description:
      "Modern headless commerce architectures with sub-second page loads, atomic inventory concurrency locking, multi-currency checkout, and seamless courier logistics integrations.",
    deliverables: [
      "Headless Next.js Edge Storefront",
      "Atomic Inventory Reservation Locks",
      "Sub-Second Edge Checkout & Payment Rails",
      "Automated Courier & Fulfillment Sync",
    ],
    technologies: ["Next.js", "GraphQL", "Node.js", "Redis", "Stripe", "PostgreSQL"],
    href: "/services/web-development",
    metrics: {
      value: "280ms",
      label: "Edge Cart Velocity",
      subtext: "Sub-second edge checkout latency under peak concurrent transaction spikes",
    },
    imageUrl: "/images/products/ecommerce.webp",
    localFallback: "/images/products/ecommerce.webp",
  },
  {
    id: "mobile-apps",
    number: "06",
    category: "MOBILE ENGINEERING",
    name: "Native Mobile Applications",
    tagline: "Offline SQLite Synchronization & Native Biometrics",
    description:
      "High-performance cross-platform and native mobile applications crafted with Flutter and React Native for on-site field staff, enterprise logistics, and direct consumer experiences.",
    deliverables: [
      "Offline SQLite Two-Way Synchronization",
      "Hardware Biometric Authentication (FaceID/Fingerprint)",
      "High-Frequency Push Notification Pipeline",
      "Background Geolocation & Route Optimization",
    ],
    technologies: ["Flutter", "React Native", "Dart", "Swift", "Kotlin", "Firebase"],
    href: "/services/mobile-development",
    metrics: {
      value: "99.98%",
      label: "Crash-Free Sessions",
      subtext: "Field staff stability benchmark across 250,000+ continuous mobile sessions",
    },
    imageUrl: "/images/products/mobile-app.webp",
    localFallback: "/images/products/mobile-app.webp",
  },
];

export const WhatWeBuildSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.45;
      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStep = (index: number) => {
    const target = stepRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="portfolio"
      className="relative bg-[#EEEAF8] text-[#2B2A6B] pt-20 sm:pt-32 pb-20 sm:pb-24 border-t border-[#2B2A6B]/15 w-full"
    >
      {/* Background ambient lighting - isolated in clipping container to prevent horizontal overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-[#2B2A6B]/[0.08] blur-[160px] rounded-full" />
        <div className="absolute bottom-1/3 right-10 w-[600px] h-[600px] bg-[#d4a373]/[0.08] blur-[170px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <SectionHeading
            badge="Product Architecture"
            title="Architected for"
            highlightTitle="Scale & Performance"
            subtitle="Enterprise-grade AI assistants, bespoke ERP systems, and automated cloud backbones built for high-throughput commercial operations."
          />
        </div>

        {/* Sticky Scroll Container */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Scrollable Architecture Text Descriptions (Elongated Scroll Timing) */}
          <div className="lg:col-span-6 space-y-12 sm:space-y-24 lg:space-y-36 pb-12 sm:pb-20">
            {ARCHITECTURE_PRODUCTS.map((product, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={product.id}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className={`min-h-0 lg:min-h-[95vh] flex flex-col justify-center transition-all duration-500 py-3 lg:py-0 ${
                    isActive ? "opacity-100" : "opacity-95 lg:opacity-40 lg:hover:opacity-75"
                  }`}
                >
                  <div className={`glass-card p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border shadow-xl sm:shadow-2xl space-y-5 sm:space-y-6 transition-all duration-300 ${
                    isActive
                      ? "border-[#d4a373] bg-[#2B2A6B]/95 text-[#EEEAF8] shadow-[0_12px_40px_rgba(43,42,107,0.35)]"
                      : "border-[#EEEAF8]/20 bg-[#2B2A6B]/85 text-[#EEEAF8]"
                  }`}>
                    
                    {/* Step & Category Header */}
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEEAF8]/10 border border-[#EEEAF8]/20 text-xs font-mono font-bold text-[#d4a373]">
                        <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
                        <span>ARCHITECTURE {product.number} / 06</span>
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#EEEAF8]/70">
                        {product.category}
                      </span>
                    </div>

                    {/* Product Name & Tagline */}
                    <div>
                      <h3 className="text-xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#EEEAF8] tracking-tight leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-[#d4a373] font-semibold mt-1.5 sm:mt-2">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Detailed Paragraph */}
                    <p className="text-xs sm:text-sm text-[#EEEAF8]/80 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Mobile Only: Inline Image */}
                    <div className="lg:hidden my-4 rounded-2xl overflow-hidden bg-[#1E1D4E] border border-[#EEEAF8]/20 p-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-56 object-contain rounded-xl"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = product.localFallback;
                        }}
                      />
                    </div>

                    {/* Key Architectural Deliverables */}
                    <div className="space-y-2.5 pt-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#d4a373] font-bold block">
                        Production Deliverables
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {product.deliverables.map((item) => (
                          <div key={item} className="flex items-center gap-2.5 text-xs text-[#EEEAF8]">
                            <CheckCircle2 className="w-4 h-4 text-[#d4a373] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics Banner */}
                    <div className="p-4 rounded-2xl bg-[#1E1D4E]/90 border border-[#EEEAF8]/20 flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-display font-extrabold text-[#d4a373]">
                          {product.metrics.value}
                        </div>
                        <div className="text-[11px] font-mono text-[#EEEAF8]/80">
                          {product.metrics.label}
                        </div>
                      </div>
                      <div className="text-[10px] text-right text-[#EEEAF8]/70 max-w-[180px] hidden sm:block">
                        {product.metrics.subtext}
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {product.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-[#EEEAF8]/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <Link
                        href={product.href}
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#d4a373] hover:text-white transition-colors group/link"
                      >
                        <span>Explore Technical Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform text-[#d4a373]" />
                      </Link>

                      <span className="text-[10px] font-mono text-[#EEEAF8]/70">
                        Milestone & Retainer Ready
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Sticky Screen Frame that Matches Scroll (Images on the Right) */}
          <div className="hidden lg:block lg:col-span-6 sticky top-20 h-[88vh] flex flex-col justify-center items-center pointer-events-none">
            
            {/* Main Mockup Glass Frame */}
            <div className="w-full h-full max-h-[640px] rounded-3xl bg-[#2B2A6B] border border-[#EEEAF8]/25 shadow-[0_20px_60px_rgba(43,42,107,0.35)] backdrop-blur-xl flex flex-col overflow-hidden relative pointer-events-auto">
              
              {/* Mockup Window Chrome Header */}
              <div className="px-5 py-3.5 bg-[#1E1D4E] border-b border-[#EEEAF8]/20 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                
                <div className="px-3.5 py-1 rounded-full bg-[#2B2A6B] border border-[#EEEAF8]/20 text-[11px] font-mono text-[#EEEAF8]/80 flex items-center gap-2 max-w-[280px] truncate">
                  <span className="w-2 h-2 rounded-full bg-[#d4a373] animate-pulse shrink-0" />
                  <span className="truncate">sparkintellect.in/architecture/{ARCHITECTURE_PRODUCTS[activeStep].id}</span>
                </div>

                <div className="text-[10px] font-mono text-[#d4a373] uppercase font-bold tracking-wider">
                  SYSTEM {ARCHITECTURE_PRODUCTS[activeStep].number} / 06
                </div>
              </div>

              {/* Dynamic Image Display Area (Smoothly Cross-fading and Matching the Active Scroll) */}
              <div className="relative flex-1 w-full h-full p-6 sm:p-8 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1E1D4E] via-[#2B2A6B]/60 to-[#1E1D4E]">
                
                {/* Subtle radial focus glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,163,115,0.12),transparent_70%)] pointer-events-none" />

                {ARCHITECTURE_PRODUCTS.map((prod, idx) => {
                  const isCurrent = activeStep === idx;
                  return (
                    <div
                      key={prod.id}
                      className={`absolute inset-0 p-6 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
                        isCurrent
                          ? "opacity-100 scale-100 translate-y-0 filter-none pointer-events-auto z-10"
                          : "opacity-0 scale-95 translate-y-8 blur-sm pointer-events-none z-0"
                      }`}
                    >
                      <div className="relative w-full h-full max-h-[460px] flex items-center justify-center group/img">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover/img:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = prod.localFallback;
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick-Step Nav Indicator */}
              <div className="px-5 py-3.5 bg-[#1E1D4E] border-t border-[#EEEAF8]/15 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  {ARCHITECTURE_PRODUCTS.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToStep(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeStep === idx ? "w-8 bg-[#d4a373]" : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Jump to architecture step ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#EEEAF8]/80">
                  <span className="text-[#EEEAF8] font-bold">{ARCHITECTURE_PRODUCTS[activeStep].name}</span>
                  <a
                    href={ARCHITECTURE_PRODUCTS[activeStep].imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#d4a373] hover:text-white transition-colors p-1"
                    title="View Source Architecture Diagram"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Custom Architecture Scope Callout */}
        <div className="mt-20 glass-panel p-6 sm:p-8 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-mono font-bold text-[#d4a373] uppercase tracking-wider">
              Custom Engineering Scope
            </span>
            <h4 className="text-base sm:text-lg font-display font-bold text-[#EEEAF8]">
              Need a bespoke system tailored to your enterprise workflows?
            </h4>
            <p className="text-xs text-[#EEEAF8]/80">
              Full proprietary IP transfer, enterprise SLA, and zero third-party platform lock-in.
            </p>
          </div>

          <Link
            href="/contact"
            className="glass-btn-primary px-7 py-3.5 rounded-full font-display font-bold text-xs uppercase tracking-wider text-[#2B2A6B] inline-flex items-center gap-2 shrink-0 shadow-lg hover:scale-105 transition-all"
          >
            <span>Consult on Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WhatWeBuildSection;

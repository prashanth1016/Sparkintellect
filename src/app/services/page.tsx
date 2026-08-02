import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { SERVICES } from "@/data/companyData";
import { 
  Bot, 
  Globe, 
  Smartphone, 
  ShoppingBag, 
  Cpu, 
  Cloud, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Capabilities | SparkIntellect AI & Software",
  description: "Explore SparkIntellect's 7 core technology capabilities: AI & ML, Web Engineering, Mobile Development, E-Commerce, Custom Software ERP/CRM, Cloud DevOps, and Workflow Automation.",
};

const ICON_MAP: Record<string, React.ElementType> = {
  Bot,
  Globe,
  Smartphone,
  ShoppingBag,
  Cpu,
  Cloud,
  Zap,
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <SectionHeading
            badge="Technical Specifications"
            title="Our Full-Spectrum Software &"
            highlightTitle="AI Capabilities"
            subtitle="Explore how our engineering teams design, build, and maintain production-ready AI models, robust web apps, native mobile platforms, and enterprise cloud systems."
          />

          {/* Service Cards Stack */}
          <div className="space-y-12">
            {SERVICES.map((service, index) => {
              const Icon = ICON_MAP[service.iconName] || Cpu;

              return (
                <SectionWrapper
                  key={service.id}
                  id={service.id}
                  className="luxury-card p-8 sm:p-12 rounded-3xl border border-[#BEE0FF] bg-white scroll-mt-32 shadow-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Main Description */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center shrink-0">
                          <Icon className="w-7 h-7 text-[#0284c7]" />
                        </div>
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220]">
                            {service.title}
                          </h2>
                          <span className="text-xs font-mono text-[#0284c7]">
                            Capability ID: {service.id}
                          </span>
                        </div>
                      </div>

                      <p className="text-[#334155] text-base leading-relaxed">
                        {service.fullDesc}
                      </p>

                      {/* Sub-Categories */}
                      <div className="space-y-3 pt-2">
                        <h3 className="text-xs font-mono text-[#0284c7] uppercase font-bold tracking-wider">
                          Key Solutions Included:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.subCategories.map((sub, i) => (
                            <div key={i} className="p-3 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-[#0284c7] shrink-0" />
                              <span>{sub}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key Features & Stack */}
                      <div className="pt-4 border-t border-[#BEE0FF] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs text-[#334155] font-mono">Tech Stack:</span>
                          {service.techStack.map((tech) => (
                            <span key={tech} className="px-3 py-1 rounded-full bg-[#D6EBFF] border border-[#BEE0FF] text-xs text-[#0B1220] font-mono font-semibold">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <Link
                          href="/contact"
                          className="px-5 py-2.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center gap-2"
                        >
                          <span>Consult on {service.title}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>

                    </div>

                    {/* Features Showcase Box */}
                    <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] space-y-4">
                      <h4 className="text-sm font-bold text-[#0B1220] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#0284c7]" />
                        <span>Core Architectural Highlights</span>
                      </h4>

                      <div className="space-y-3">
                        {service.keyFeatures.map((feat, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-white border border-[#BEE0FF] text-xs text-[#334155]">
                            <span className="font-semibold text-[#0B1220] block mb-1">Feature 0{i + 1}</span>
                            {feat}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </SectionWrapper>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

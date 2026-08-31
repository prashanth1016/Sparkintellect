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
  Cpu, 
  Zap, 
  Cloud, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Services & Capabilities | SparkIntellect",
  description:
    "Explore SparkIntellect's 6 core engineering capabilities: AI & Machine Learning, Web Engineering, Mobile Development, Enterprise Software ERP/CRM, Workflow Automation, and Cloud DevOps.",
};

const ICON_MAP: Record<string, React.ElementType> = {
  "ai-development": Bot,
  "web-development": Globe,
  "mobile-development": Smartphone,
  "enterprise-software": Cpu,
  "automation": Zap,
  "cloud-devops": Cloud,
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Capabilities & Architecture"
            title="Technology Built Around Your"
            highlightTitle="Business Architecture"
            subtitle="Explore our specialized engineering disciplines designed to turn operational friction into scalable software platforms."
          />

          <div className="space-y-12 mb-16">
            {SERVICES.map((service, index) => {
              const Icon = ICON_MAP[service.slug] || Sparkles;

              return (
                <SectionWrapper
                  key={service.id}
                  id={service.slug}
                  className="luxury-card p-8 sm:p-12 rounded-3xl border border-[#BEE0FF] bg-white scroll-mt-32 shadow-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center shrink-0 text-[#0284c7]">
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220]">
                            {service.title}
                          </h2>
                          <span className="text-xs font-mono text-[#0284c7]">
                            Service Domain: {service.slug}
                          </span>
                        </div>
                      </div>

                      <p className="text-[#334155] text-base leading-relaxed">
                        {service.fullDesc}
                      </p>

                      <div className="space-y-3 pt-2">
                        <h3 className="text-xs font-mono text-[#0284c7] uppercase font-bold tracking-wider">
                          Key Capabilities Included:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.capabilities.map((cap, i) => (
                            <div key={i} className="p-3 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#BEE0FF] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-xs text-[#334155] font-mono mr-1">Stack:</span>
                          {service.techStack.map((tech) => (
                            <span key={tech} className="px-2.5 py-0.5 rounded-full bg-[#D6EBFF] border border-[#BEE0FF] text-xs text-[#0B1220] font-mono font-semibold">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`/services/${service.slug}`}
                          className="px-6 py-2.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center gap-1.5 transition-all"
                        >
                          <span>Explore {service.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                    </div>

                    <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] space-y-4">
                      <h4 className="text-sm font-bold text-[#0B1220] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#0284c7]" />
                        <span>Core Architectural Highlights</span>
                      </h4>

                      <div className="space-y-3">
                        {service.keyFeatures.map((feat, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-white border border-[#BEE0FF] text-xs text-[#334155]">
                            <span className="font-bold text-[#0B1220] block mb-1">Architecture 0{i + 1}</span>
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

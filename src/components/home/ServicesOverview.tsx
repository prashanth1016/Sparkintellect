"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SERVICES, ServiceItem } from "@/data/companyData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { 
  Bot, 
  Globe, 
  Smartphone, 
  ShoppingBag, 
  Cpu, 
  Cloud, 
  Zap, 
  ArrowRight, 
  CheckCircle,
  X,
  Sparkles
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Bot,
  Globe,
  Smartphone,
  ShoppingBag,
  Cpu,
  Cloud,
  Zap,
};

export const ServicesOverview: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <SectionWrapper className="relative z-10 py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Core Capabilities"
          title="Empower Your Enterprise With Our"
          highlightTitle="Full-Spectrum Services"
          subtitle="From artificial intelligence chatbots to custom ERPs, mobile apps, and zero-downtime cloud DevOps, we engineer robust software designed for scale."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName] || Cpu;
            return (
              <GridStaggerItem key={service.id} index={idx}>
                <div className="luxury-card luxury-card-hover p-8 rounded-3xl border border-[#BEE0FF] flex flex-col justify-between h-full group">
                  <div>
                    {/* Icon & Title */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center shrink-0">
                        <Icon className="w-7 h-7 text-[#0284c7]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold text-[#0B1220]">
                          {service.title}
                        </h3>
                        <span className="text-xs text-[#334155] font-mono">
                          {service.techStack.slice(0, 3).join(" • ")}
                        </span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-[#334155] text-sm leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>

                    {/* Subcategories List */}
                    <div className="space-y-2 mb-8">
                      {service.subCategories.slice(0, 3).map((sub, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#0B1220]">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                          <span className="truncate">{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-4 border-t border-[#BEE0FF] flex items-center justify-between">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-semibold text-[#0284c7] hover:underline flex items-center gap-1.5"
                    >
                      <span>View Specifications</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>

                    <Link
                      href={`/services#${service.id}`}
                      className="w-9 h-9 rounded-full bg-[#F2F9FF] border border-[#BEE0FF] flex items-center justify-center text-[#0B1220] hover:bg-[#9FCFFB] transition-all"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </GridStaggerItem>
            );
          })}
        </div>

        {/* View All Services Footer Banner */}
        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md transition-all group"
          >
            <span>Explore All Detailed Tech Specifications</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="luxury-card max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-[#BEE0FF] relative max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#F2F9FF] border border-[#BEE0FF] text-[#0B1220] hover:bg-[#D6EBFF] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center">
                {React.createElement(ICON_MAP[selectedService.iconName] || Cpu, {
                  className: "w-6 h-6 text-[#0284c7]"
                })}
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#0B1220]">{selectedService.title}</h3>
                <span className="text-xs text-[#0284c7] font-mono font-semibold">Detailed Specifications</span>
              </div>
            </div>

            <p className="text-[#334155] text-sm leading-relaxed mb-6">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold text-[#0B1220] uppercase tracking-wider">Sub-Capabilities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedService.subCategories.map((sub, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0284c7] shrink-0" />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-[#0B1220] uppercase tracking-wider mb-2">Primary Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-[#D6EBFF] border border-[#BEE0FF] text-xs text-[#0B1220] font-mono font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#BEE0FF] flex items-center justify-between">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#0B1220] bg-[#F2F9FF] border border-[#BEE0FF] hover:bg-[#D6EBFF]"
              >
                Close Window
              </button>

              <Link
                href="/contact"
                onClick={() => setSelectedService(null)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#0B1220] bg-[#9FCFFB] hover:bg-[#8ec2f3] shadow-md flex items-center gap-2"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

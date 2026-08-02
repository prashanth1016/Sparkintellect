import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { INDUSTRIES } from "@/data/companyData";
import { 
  ShoppingBag, 
  Sparkles, 
  Factory, 
  GraduationCap, 
  Activity, 
  Building, 
  Utensils, 
  Briefcase,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industries Served | SparkIntellect AI Solutions",
  description: "SparkIntellect builds specialized AI and software solutions for Retail, Fashion, Manufacturing, EdTech, Healthcare, Real Estate, Hospitality, and Professional Services.",
};

const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  ShoppingBag,
  Sparkles,
  Factory,
  GraduationCap,
  Activity,
  Building,
  Utensils,
  Briefcase,
};

export default function IndustriesPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Vertical Solutions"
            title="Digital Transformation Across"
            highlightTitle="8 Key Domains"
            subtitle="Explore how SparkIntellect crafts industry-tailored platforms, automated workflows, and AI assistants designed for specific business operations."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INDUSTRIES.map((ind, idx) => {
              const Icon = INDUSTRY_ICONS[ind.iconName] || Briefcase;
              return (
                <GridStaggerItem key={ind.id} index={idx}>
                  <div
                    id={ind.id}
                    className="luxury-card p-8 rounded-3xl border border-[#BEE0FF] bg-white scroll-mt-32 space-y-6 shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center shrink-0">
                        <Icon className="w-7 h-7 text-[#0284c7]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-[#0B1220]">{ind.name}</h2>
                        <span className="text-xs font-mono text-[#0284c7]">Industry Track</span>
                      </div>
                    </div>

                    <p className="text-[#334155] text-sm leading-relaxed">
                      {ind.description}
                    </p>

                    <div className="space-y-3 pt-2 border-t border-[#BEE0FF]">
                      <h3 className="text-xs font-mono text-[#0284c7] uppercase font-bold tracking-wider">
                        Popular Industry Implementations:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {ind.useCases.map((uc, i) => (
                          <div key={i} className="p-3 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{uc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <span className="text-xs text-[#334155]">Tailored Architecture</span>
                      <Link
                        href="/contact"
                        className="px-5 py-2 rounded-full text-xs font-bold text-[#0B1220] bg-[#9FCFFB] hover:bg-[#8ec2f3] transition-colors flex items-center gap-1.5"
                      >
                        <span>Discuss {ind.name}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </GridStaggerItem>
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

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
  Building, 
  Activity, 
  GraduationCap, 
  ShoppingBag, 
  Factory, 
  Briefcase, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industries We Serve | SparkIntellect",
  description:
    "Explore how SparkIntellect engineers AI models, ERP software, and web applications tailored for Construction, Healthcare, Education, Retail, Manufacturing, and Finance.",
};

const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  "construction": Building,
  "healthcare": Activity,
  "education": GraduationCap,
  "retail": ShoppingBag,
  "manufacturing": Factory,
  "finance": Briefcase,
};

export default function IndustriesPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Vertical Expertise"
            title="Industry-Tailored Software &"
            highlightTitle="AI Solutions"
            subtitle="We design systems addressing the specific regulatory, operational, and customer challenges of key business verticals."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {INDUSTRIES.map((ind, idx) => {
              const Icon = INDUSTRY_ICONS[ind.slug] || Sparkles;

              return (
                <GridStaggerItem key={ind.id} index={idx}>
                  <div className="luxury-card luxury-card-hover p-8 rounded-3xl border border-[#BEE0FF] h-full flex flex-col justify-between bg-white">
                    <div className="space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center text-[#0284c7]">
                        <Icon className="w-7 h-7" />
                      </div>

                      <h3 className="text-2xl font-serif font-bold text-[#0B1220]">
                        {ind.name}
                      </h3>

                      <p className="text-xs font-semibold text-[#0284c7]">
                        {ind.tagline}
                      </p>

                      <p className="text-xs text-[#334155] leading-relaxed">
                        {ind.description}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-[#BEE0FF]/60">
                        <div className="text-[10px] font-mono font-bold uppercase text-[#334155]">
                          Key Sector Solutions:
                        </div>
                        {ind.useCases.map((uc, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#0B1220]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                            <span>{uc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#BEE0FF]">
                      <Link
                        href={`/industries/${ind.slug}`}
                        className="text-xs font-bold text-[#0B1220] hover:text-[#0284c7] flex items-center gap-1.5 transition-colors group"
                      >
                        <span>Explore {ind.name} Deep Dive</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#0284c7]" />
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

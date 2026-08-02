import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FounderSection } from "@/components/home/FounderSection";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { COMPANY_INFO } from "@/data/companyData";
import { 
  Building2, 
  Award, 
  CheckCircle,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "About SparkIntellect | Founder Prashanth S & Vision",
  description: "Learn about SparkIntellect, founded by Prashanth S in Guindy, Chennai. Dedicated to becoming India's leading AI-first technology firm.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Company Overview"
            title="Building Intelligent Solutions for"
            highlightTitle="Future-Ready Businesses"
            subtitle="Founded in Chennai, India, SparkIntellect bridges cutting-edge Artificial Intelligence with real-world enterprise software engineering."
          />

          {/* Business Story Card */}
          <SectionWrapper id="company-story" className="luxury-card p-8 sm:p-14 rounded-3xl border border-[#BEE0FF] mb-16 space-y-8 bg-white shadow-xl scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-[#0284c7]" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#0284c7] uppercase tracking-widest">Our Genesis & Journey</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220]">
                  The Complete SparkIntellect Story
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-[#334155] text-base leading-relaxed">
              <p>
                SparkIntellect was founded in Chennai, Tamil Nadu, India, with a bold vision: to bridge the gap between complex emerging Artificial Intelligence technologies and practical, scalable enterprise software. In a digital landscape saturated with generic offshore software agencies, Founder & CEO <strong className="text-[#0B1220]">Prashanth S</strong> and Co-Founder & General Manager <strong className="text-[#0B1220]">Sakthi Pradeep T</strong> set out to create an AI-first engineering house driven by senior technical leadership, transparent execution, and uncompromising code quality.
              </p>
              <p>
                What started as a focused team of AI architects and full-stack software engineers quickly grew into a trusted technology partner for startups, SMEs, and mid-market enterprises across retail, healthcare, manufacturing, education, and finance. We eliminate operational bottlenecks by building custom enterprise ERP systems, mobile applications, high-converting e-commerce engines, and autonomous workflow automation pipelines.
              </p>
            </div>

            {/* Corporate Fact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-[#BEE0FF]">
              <div className="p-4 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF]">
                <div className="text-xs font-mono text-[#0284c7] uppercase font-bold mb-1">Company HQ</div>
                <div className="text-sm font-serif font-bold text-[#0B1220]">{COMPANY_INFO.headquarters}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF]">
                <div className="text-xs font-mono text-[#0284c7] uppercase font-bold mb-1">Founding Leadership</div>
                <div className="text-sm font-serif font-bold text-[#0B1220]">{COMPANY_INFO.founder} & {COMPANY_INFO.coFounder}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF]">
                <div className="text-xs font-mono text-[#0284c7] uppercase font-bold mb-1">Core Specialization</div>
                <div className="text-sm font-serif font-bold text-[#0B1220]">AI Models, Software & PWAs</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF]">
                <div className="text-xs font-mono text-[#0284c7] uppercase font-bold mb-1">Engagement Model</div>
                <div className="text-sm font-serif font-bold text-[#0B1220]">Fixed Milestone & Retainers</div>
              </div>
            </div>
          </SectionWrapper>

          <FounderSection />

          {/* Detailed Operating Principles & Business Philosophy */}
          <SectionWrapper className="mt-16 luxury-card p-8 sm:p-14 rounded-3xl border border-[#BEE0FF] space-y-10 bg-white shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-[#0284c7]" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#0284c7] uppercase tracking-widest">Engineering Culture</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220]">
                  Business Model & Operating Principles
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-[#0B1220]">100% Operational Transparency</h3>
                <p className="text-[#334155] text-sm leading-relaxed">
                  We operate as an agile, high-velocity digital partner. Every project is assigned a dedicated technical lead and account manager who maintain daily communication, version-controlled code repositories, and weekly demo releases.
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-[#0B1220] font-semibold">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Fixed-price transparent milestone billing with zero hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#0B1220] font-semibold">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dedicated monthly engineering pods with direct developer access</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#0B1220] font-semibold">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full IP source code ownership transfer upon project completion</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-[#0B1220]">Future Product Vision & Research</h3>
                <p className="text-[#334155] text-sm leading-relaxed">
                  Beyond client custom engineering, SparkIntellect incubates proprietary AI accelerators for document OCR parsing, WhatsApp CRM bots, and vertical-specific business ERP software.
                </p>
                <div className="p-4 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] text-xs text-[#0B1220]">
                  <span className="font-bold text-[#0B1220] block mb-1">Strategic Roadmap 2028</span>
                  Expanding our AI research division to empower 500+ Indian & international enterprises with autonomous workflow automation by 2028.
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#BEE0FF] text-center flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center justify-center gap-2"
              >
                <span>Partner With SparkIntellect</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/process"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm bg-[#F2F9FF] text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] flex items-center justify-center gap-2"
              >
                <span>Explore 9-Step Process</span>
              </Link>
            </div>
          </SectionWrapper>

        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

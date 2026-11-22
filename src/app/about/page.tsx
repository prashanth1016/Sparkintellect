import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  Building2, 
  Award, 
  ArrowRight, 
  CheckCircle, 
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FounderSection } from "@/components/home/FounderSection";
import { COMPANY_INFO } from "@/data/companyData";

export const metadata: Metadata = {
  title: "About SparkIntellect | Founder & CEO Mr. Prashanth & Leadership Vision",
  description: "Learn about SparkIntellect, founded by Mr. Prashanth in Chennai, Tamil Nadu. Dedicated to becoming India's leading AI-first technology and software engineering firm.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#EEEAF8] text-[#2B2A6B] selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 sm:pb-24 w-full max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Company Overview"
            title="Building Intelligent Solutions for"
            highlightTitle="Future-Ready Businesses"
            subtitle="Founded in Chennai, India, SparkIntellect bridges cutting-edge Artificial Intelligence with real-world enterprise software engineering."
          />

          {/* Business Story Card */}
          <SectionWrapper id="company-story" className="glass-panel p-5 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] mb-12 sm:mb-16 space-y-6 sm:space-y-8 shadow-2xl scroll-mt-28">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EEEAF8]/10 border border-[#EEEAF8]/20 flex items-center justify-center shrink-0 text-[#d4a373]">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-medium text-[#d4a373] uppercase tracking-widest">Our Genesis & Journey</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#EEEAF8]">
                  The Complete SparkIntellect Story
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-[#EEEAF8]/85 text-base leading-relaxed">
              <p>
                SparkIntellect was founded in Chennai, Tamil Nadu, India, with a bold vision: to bridge the gap between complex emerging Artificial Intelligence technologies and practical, scalable enterprise software. In a digital landscape saturated with generic offshore software agencies, Founder & CEO <strong className="text-[#2B2A6B]">Mr. Prashanth</strong> and Co-Founder & Managing Director <strong className="text-[#2B2A6B]">Mr. Pranesh Rajagopal</strong> set out to create an AI-first engineering house driven by senior technical leadership, transparent execution, and uncompromising code quality.
              </p>
              <p>
                What started as a focused team of AI architects and full-stack software engineers quickly grew into a trusted technology partner for startups, SMEs, and mid-market enterprises across retail, healthcare, manufacturing, education, and finance. We eliminate operational bottlenecks by building custom enterprise ERP systems, mobile applications, high-converting digital platforms, and autonomous workflow automation pipelines.
              </p>
            </div>

            {/* Corporate Fact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-[#EEEAF8]/20">
              <div className="p-4 rounded-xl bg-[#1E1D4E]/90 border border-[#EEEAF8]/20">
                <div className="text-xs font-mono text-[#d4a373] uppercase font-medium mb-1">Company HQ</div>
                <div className="text-sm font-display font-bold text-[#EEEAF8]">{COMPANY_INFO.headquarters}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#1E1D4E]/90 border border-[#EEEAF8]/20">
                <div className="text-xs font-mono text-[#d4a373] uppercase font-medium mb-1">Founding Leadership</div>
                <div className="text-sm font-display font-bold text-[#EEEAF8]">{COMPANY_INFO.founder} & {COMPANY_INFO.coFounder}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#1E1D4E]/90 border border-[#EEEAF8]/20">
                <div className="text-xs font-mono text-[#d4a373] uppercase font-medium mb-1">Core Specialization</div>
                <div className="text-sm font-display font-bold text-[#EEEAF8]">AI Models, Software & Platforms</div>
              </div>
              <div className="p-4 rounded-xl bg-[#1E1D4E]/90 border border-[#EEEAF8]/20">
                <div className="text-xs font-mono text-[#d4a373] uppercase font-medium mb-1">Engagement Model</div>
                <div className="text-sm font-display font-bold text-[#EEEAF8]">Fixed Milestone & Retainers</div>
              </div>
            </div>
          </SectionWrapper>

          <FounderSection />

          {/* Detailed Operating Principles & Business Philosophy */}
          <SectionWrapper className="mt-16 glass-panel p-8 sm:p-14 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] space-y-10 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EEEAF8]/10 border border-[#EEEAF8]/20 flex items-center justify-center shrink-0 text-[#d4a373]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-medium text-[#d4a373] uppercase tracking-widest">Engineering Culture</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#EEEAF8]">
                  Business Model & Operating Principles
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-display font-bold text-[#EEEAF8]">100% Operational Transparency</h3>
                <p className="text-[#EEEAF8]/80 text-sm leading-relaxed">
                  We operate as an agile, high-velocity digital partner. Every project is assigned a dedicated technical lead and account manager who maintain daily communication, version-controlled code repositories, and weekly demo releases.
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-[#EEEAF8]/90 font-medium">
                    <CheckCircle className="w-4 h-4 text-[#d4a373] shrink-0" />
                    <span>Fixed-price transparent milestone billing with zero hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#EEEAF8]/90 font-medium">
                    <CheckCircle className="w-4 h-4 text-[#d4a373] shrink-0" />
                    <span>Dedicated monthly engineering pods with direct developer access</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#EEEAF8]/90 font-medium">
                    <CheckCircle className="w-4 h-4 text-[#d4a373] shrink-0" />
                    <span>Full IP source code ownership transfer upon project completion</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-display font-bold text-[#EEEAF8]">Future Product Vision & Research</h3>
                <p className="text-[#EEEAF8]/80 text-sm leading-relaxed">
                  Beyond client custom engineering, SparkIntellect incubates proprietary AI accelerators for document parsing, conversational CRM bots, and vertical-specific business ERP software.
                </p>
                <div className="p-4 rounded-xl bg-[#1E1D4E]/90 border border-[#EEEAF8]/20 text-xs text-[#EEEAF8]/90">
                  <span className="font-bold text-[#d4a373] block mb-1">Strategic Roadmap 2028</span>
                  Expanding our AI research division to empower 500+ Indian & international enterprises with autonomous workflow automation by 2028.
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EEEAF8]/20 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm glass-btn-primary flex items-center justify-center gap-2 transition-all shadow-xl"
              >
                <span>Partner With SparkIntellect</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/case-studies"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-sm glass-card text-[#EEEAF8] hover:text-white hover:border-[#d4a373]/50 flex items-center justify-center gap-2 transition-all"
              >
                <span>Explore Case Studies</span>
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

import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { COMPANY_INFO } from "@/data/companyData";
import { Scale, FileCheck, Shield, CheckCircle, ArrowRight, Gavel, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service & Master Agreement | SparkIntellect",
  description: "Official Corporate Terms and Conditions of SparkIntellect. Clear engineering SLAs, IP ownership transfer, payment terms, and governing laws in Chennai, India.",
};

export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#EEEAF8] text-[#2B2A6B] font-sans selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 sm:pb-24 w-full max-w-full overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Master Services Agreement"
            title="SparkIntellect Corporate"
            highlightTitle="Terms of Service"
            subtitle="Last updated: August 2026. Legal terms, service level commitments, intellectual property transfer, and billing frameworks governing software engineering contracts."
          />

          <SectionWrapper className="glass-panel p-8 sm:p-14 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] shadow-2xl space-y-10">
            
            {/* Overview Banner */}
            <div className="p-6 rounded-2xl glass-card border border-[#EEEAF8]/20 bg-[#1E1D4E] flex items-start gap-4">
              <Scale className="w-8 h-8 text-[#d4a373] shrink-0 mt-1" />
              <div className="space-y-1 text-xs sm:text-sm text-[#EEEAF8]/85 leading-relaxed">
                <span className="font-bold text-[#EEEAF8] block text-base font-display">Agreement Overview</span>
                These Terms of Service (&quot;Agreement&quot;) govern the software development, artificial intelligence integration, web/mobile app engineering, cloud infrastructure, and consulting services provided by SparkIntellect (&quot;Company&quot;, &quot;We&quot;, &quot;Us&quot;) to business clients and enterprise entities (&quot;Client&quot;, &quot;You&quot;).
              </div>
            </div>

            {/* Section 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-display font-bold text-[#EEEAF8] flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#d4a373]" />
                <span>1. Engineering Scope & Project Milestones</span>
              </h3>
              <p className="text-[#EEEAF8]/80 text-sm leading-relaxed">
                All client projects are governed by a mutually executed Project Scope Document (Statement of Work - SOW) that outlines deliverables, technical architecture, timeline milestones, and sprint schedules. Any additions or scope modifications will be processed via formal Change Requests (CR).
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4 pt-6 border-t border-[#EEEAF8]/15">
              <h3 className="text-xl font-display font-bold text-[#EEEAF8] flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#d4a373]" />
                <span>2. 100% Intellectual Property (IP) Transfer</span>
              </h3>
              <p className="text-[#EEEAF8]/80 text-sm leading-relaxed">
                At SparkIntellect, we believe in complete client ownership:
              </p>
              <div className="p-5 rounded-2xl glass-card border border-[#EEEAF8]/25 bg-[#1E1D4E] space-y-2 text-xs sm:text-sm text-[#EEEAF8]/85">
                <span className="font-bold block text-sm text-[#d4a373] font-display">Full Source Code & License Guarantee</span>
                Upon 100% completion of milestone payments, all intellectual property rights, custom software source code, visual design assets, database architecture, and compiled binaries created specifically for the project transfer 100% exclusively to the Client.
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-4 pt-6 border-t border-[#EEEAF8]/15">
              <h3 className="text-xl font-display font-bold text-[#EEEAF8] flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#d4a373]" />
                <span>3. Payment Terms & Milestone Invoicing</span>
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#EEEAF8]/80 pl-2">
                <li><strong className="text-[#EEEAF8]">Fixed-Price Contracts:</strong> Invoiced strictly according to completed sprint milestones signed off in UAT testing.</li>
                <li><strong className="text-[#EEEAF8]">Monthly Retainer Pods:</strong> Invoiced on the 1st of each calendar month for dedicated developer resource allocation.</li>
                <li><strong className="text-[#EEEAF8]">Taxes & Banking:</strong> Applicable Goods and Services Tax (GST) or international wire fees apply as stated on tax invoices.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-4 pt-6 border-t border-[#EEEAF8]/15">
              <h3 className="text-xl font-display font-bold text-[#EEEAF8] flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#d4a373]" />
                <span>4. Warranty & Post-Launch Maintenance SLA</span>
              </h3>
              <p className="text-[#EEEAF8]/80 text-sm leading-relaxed">
                SparkIntellect provides a complimentary 30-day bug-fix warranty following production release to ensure smooth operational stabilization. Extended 24/7 server monitoring, performance tuning, and software updates are available via monthly SLA maintenance plans.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-4 pt-6 border-t border-[#EEEAF8]/15">
              <h3 className="text-xl font-display font-bold text-[#EEEAF8] flex items-center gap-2">
                <Gavel className="w-5 h-5 text-[#d4a373]" />
                <span>5. Governing Law & Legal Jurisdiction</span>
              </h3>
              <p className="text-[#EEEAF8]/80 text-sm leading-relaxed">
                This Agreement is governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or in connection with our services shall be subject to the exclusive jurisdiction of the competent courts located in <strong className="text-[#EEEAF8]">Chennai, Tamil Nadu, India</strong>.
              </p>
            </div>

            {/* Contact CTA */}
            <div className="pt-6 border-t border-[#EEEAF8]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EEEAF8]/80">
              <div>
                <span className="font-bold text-[#EEEAF8] text-sm block font-display">Have Questions Regarding Our Terms?</span>
                <span className="text-[#EEEAF8]/70">Contact our legal team at {COMPANY_INFO.email} or call {COMPANY_INFO.phone}.</span>
              </div>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full font-bold text-xs glass-btn-primary shadow-lg flex items-center gap-2 shrink-0 transition-all"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
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

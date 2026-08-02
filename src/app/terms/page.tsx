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
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Master Services Agreement"
            title="SparkIntellect Corporate"
            highlightTitle="Terms of Service"
            subtitle="Last updated: August 2026. Legal terms, service level commitments, intellectual property transfer, and billing frameworks governing software engineering contracts."
          />

          <SectionWrapper className="luxury-card p-8 sm:p-14 rounded-3xl border border-[#BEE0FF] bg-white shadow-xl space-y-10">
            
            {/* Overview Banner */}
            <div className="p-6 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] flex items-start gap-4">
              <Scale className="w-8 h-8 text-[#0284c7] shrink-0 mt-1" />
              <div className="space-y-1 text-xs sm:text-sm text-[#334155] leading-relaxed">
                <span className="font-bold text-[#0B1220] block text-base">Agreement Overview</span>
                These Terms of Service (&quot;Agreement&quot;) govern the software development, artificial intelligence integration, web/mobile app engineering, cloud infrastructure, and consulting services provided by SparkIntellect (&quot;Company&quot;, &quot;We&quot;, &quot;Us&quot;) to business clients and enterprise entities (&quot;Client&quot;, &quot;You&quot;).
              </div>
            </div>

            {/* Section 1 */}
            <div className="space-y-4">
              <h3 className="text-1xl sm:text-xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#0284c7]" />
                <span>1. Engineering Scope & Project Milestones</span>
              </h3>
              <p className="text-[#334155] text-sm leading-relaxed">
                All client projects are governed by a mutually executed Project Scope Document (Statement of Work - SOW) that outlines deliverables, technical architecture, timeline milestones, and sprint schedules. Any additions or scope modifications will be processed via formal Change Requests (CR).
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4 pt-6 border-t border-[#BEE0FF]">
              <h3 className="text-1xl sm:text-xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#0284c7]" />
                <span>2. 100% Intellectual Property (IP) Transfer</span>
              </h3>
              <p className="text-[#334155] text-sm leading-relaxed">
                At SparkIntellect, we believe in complete client ownership:
              </p>
              <div className="p-5 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] space-y-2 text-xs sm:text-sm text-[#0B1220]">
                <span className="font-bold block text-sm">Full Source Code & License Guarantee</span>
                Upon 100% completion of milestone payments, all intellectual property rights, custom software source code, visual design assets, database architecture, and compiled binaries created specifically for the project transfer 100% exclusively to the Client.
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-4 pt-6 border-t border-[#BEE0FF]">
              <h3 className="text-1xl sm:text-xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#0284c7]" />
                <span>3. Payment Terms & Milestone Invoicing</span>
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#334155] pl-2">
                <li><strong className="text-[#0B1220]">Fixed-Price Contracts:</strong> Invoiced strictly according to completed sprint milestones signed off in UAT testing.</li>
                <li><strong className="text-[#0B1220]">Monthly Retainer Pods:</strong> Invoiced on the 1st of each calendar month for dedicated developer resource allocation.</li>
                <li><strong className="text-[#0B1220]">Taxes & Banking:</strong> Applicable Goods and Services Tax (GST) or international wire fees apply as stated on tax invoices.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-4 pt-6 border-t border-[#BEE0FF]">
              <h3 className="text-1xl sm:text-xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#0284c7]" />
                <span>4. Warranty & Post-Launch Maintenance SLA</span>
              </h3>
              <p className="text-[#334155] text-sm leading-relaxed">
                SparkIntellect provides a complimentary 30-day bug-fix warranty following production release to ensure smooth operational stabilization. Extended 24/7 server monitoring, performance tuning, and software updates are available via monthly SLA maintenance plans.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-4 pt-6 border-t border-[#BEE0FF]">
              <h3 className="text-1xl sm:text-xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
                <Gavel className="w-5 h-5 text-[#0284c7]" />
                <span>5. Governing Law & Legal Jurisdiction</span>
              </h3>
              <p className="text-[#334155] text-sm leading-relaxed">
                This Agreement is governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or in connection with our services shall be subject to the exclusive jurisdiction of the competent courts located in <strong className="text-[#0B1220]">Chennai, Tamil Nadu, India</strong>.
              </p>
            </div>

            {/* Contact CTA */}
            <div className="pt-6 border-t border-[#BEE0FF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#334155]">
              <div>
                <span className="font-bold text-[#0B1220] text-sm block">Have Questions Regarding Our Terms?</span>
                <span>Contact our legal team at {COMPANY_INFO.email} or call {COMPANY_INFO.phone}.</span>
              </div>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center gap-2 shrink-0"
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

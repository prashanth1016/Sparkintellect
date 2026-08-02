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
import { ShieldCheck, Lock, Eye, FileText, ArrowRight, Server, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | SparkIntellect Corporate Compliance",
  description: "Official Privacy Policy of SparkIntellect. Learn how we collect, protect, and encrypt corporate data and client project assets in Chennai, India.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Corporate Compliance & Security"
            title="SparkIntellect Corporate"
            highlightTitle="Privacy Policy"
            subtitle="Last updated: August 2026. Your data security, intellectual property confidentiality, and privacy are fundamental operating principles at SparkIntellect."
          />

          <SectionWrapper className="luxury-card p-8 sm:p-14 rounded-3xl border border-[#BEE0FF] bg-white shadow-xl space-y-10">
            
            {/* Overview Banner */}
            <div className="p-6 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-[#0284c7] shrink-0 mt-1" />
              <div className="space-y-1 text-xs sm:text-sm text-[#334155] leading-relaxed">
                <span className="font-bold text-[#0B1220] block text-base">Enterprise Data Protection Guarantee</span>
                At SparkIntellect ({COMPANY_INFO.website}), we prioritize client data confidentiality, proprietary code security, and personal privacy. We strictly adhere to Indian Information Technology Acts, global data protection standards (GDPR principles), and enterprise NDAs.
              </div>
            </div>

            {/* Section 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0284c7]" />
                <span>1. Information We Collect</span>
              </h3>
              <p className="text-[#334155] text-sm leading-relaxed">
                We collect information necessary to fulfill IT consulting contracts, software engineering projects, AI model deployments, and client inquiries:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#334155] pl-2">
                <li><strong className="text-[#0B1220]">Client Identification Data:</strong> Full name, corporate email address, business phone number, company name, and job designation provided via consultation forms.</li>
                <li><strong className="text-[#0B1220]">Technical & System Specifications:</strong> Software architecture blueprints, API keys, database schemas, and cloud deployment configurations shared under Non-Disclosure Agreements (NDAs).</li>
                <li><strong className="text-[#0B1220]">Usage & Technical Logs:</strong> IP addresses, browser types, device specifications, and page navigation metrics collected to optimize web portal performance.</li>
                <li><strong className="text-[#0B1220]">Internship & Application Data:</strong> Resumes, educational credentials, and portfolio submissions submitted by candidates applying for live development tracks.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-4 pt-6 border-t border-[#BEE0FF]">
              <h3 className="text-xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#0284c7]" />
                <span>2. How We Use & Process Your Information</span>
              </h3>
              <p className="text-[#334155] text-sm leading-relaxed">
                We process your information exclusively for legitimate business operations and project delivery:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] space-y-1">
                  <span className="font-bold text-xs text-[#0B1220] block">Service Execution & Delivery</span>
                  <p className="text-xs text-[#334155]">Building, testing, deploying, and maintaining custom web apps, mobile solutions, and enterprise AI workflows.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] space-y-1">
                  <span className="font-bold text-xs text-[#0B1220] block">Confidentiality & Non-Disclosure</span>
                  <p className="text-xs text-[#334155]">All client proprietary algorithms, datasets, and codebase repos are isolated and protected by strict NDAs.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] space-y-1">
                  <span className="font-bold text-xs text-[#0B1220] block">Client Support & Invoicing</span>
                  <p className="text-xs text-[#334155]">Communicating sprint updates, issuing invoice milestones, and managing SLA support requests.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] space-y-1">
                  <span className="font-bold text-xs text-[#0B1220] block">Zero Third-Party Data Sales</span>
                  <p className="text-xs text-[#334155]">SparkIntellect never sells, rents, or monetizes client business data, contact lists, or codebase assets.</p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-4 pt-6 border-t border-[#BEE0FF]">
              <h3 className="text-xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
                <Server className="w-5 h-5 text-[#0284c7]" />
                <span>3. Data Storage & Security Standards</span>
              </h3>
              <p className="text-[#334155] text-sm leading-relaxed">
                SparkIntellect implements enterprise bank-grade security protocols across all infrastructure layer touchpoints:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#334155] pl-2">
                <li>End-to-end 256-bit SSL encryption for data in transit and AES-256 encryption for database storage at rest.</li>
                <li>Role-Based Access Control (RBAC) restricting server access strictly to authorized senior engineers and account managers.</li>
                <li>Daily automated disaster recovery backups stored across geographically redundant AWS and DigitalOcean cloud centers.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-4 pt-6 border-t border-[#BEE0FF]">
              <h3 className="text-xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#0284c7]" />
                <span>4. Your Data Rights & Contact Information</span>
              </h3>
              <p className="text-[#334155] text-sm leading-relaxed">
                Clients and visitors have the right to request access to their personal data, request correction of inaccurate records, or request permanent erasure of contact records.
              </p>
              <div className="p-5 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0B1220]">
                <div>
                  <span className="font-bold block text-sm mb-0.5">SparkIntellect Legal & Privacy Desk</span>
                  <span>Email: {COMPANY_INFO.email} | Address: {COMPANY_INFO.address}</span>
                </div>
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-full font-bold text-xs bg-[#0B1220] text-white hover:bg-[#1e293b] shrink-0"
                >
                  Contact Data Officer
                </Link>
              </div>
            </div>

          </SectionWrapper>
        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

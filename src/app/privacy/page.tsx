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
import { ShieldCheck, Lock, FileText, Server, UserCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | SparkIntellect Corporate Compliance",
  description: "Official Privacy Policy of SparkIntellect. Learn how we collect, protect, and encrypt corporate data and client project assets in Chennai, India.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#EEEAF8] text-[#2B2A6B] font-sans selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 sm:pb-24 w-full max-w-full overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Corporate Compliance & Security"
            title="SparkIntellect Corporate"
            highlightTitle="Privacy Policy"
            subtitle="Last updated: August 2026. Your data security, intellectual property confidentiality, and privacy are fundamental operating principles at SparkIntellect."
          />

          <SectionWrapper className="glass-panel p-8 sm:p-14 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] shadow-2xl space-y-10">
            
            {/* Overview Banner */}
            <div className="p-6 rounded-2xl glass-card border border-[#EEEAF8]/20 bg-[#1E1D4E] flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-[#d4a373] shrink-0 mt-1" />
              <div className="space-y-1 text-xs sm:text-sm text-[#EEEAF8]/85 leading-relaxed">
                <span className="font-bold text-[#EEEAF8] block text-base font-display">Enterprise Data Protection Guarantee</span>
                At SparkIntellect ({COMPANY_INFO.website}), we prioritize client data confidentiality, proprietary code security, and personal privacy. We strictly adhere to Indian Information Technology Acts, global data protection standards (GDPR principles), and enterprise NDAs.
              </div>
            </div>

            {/* Section 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-display font-bold text-[#EEEAF8] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#d4a373]" />
                <span>1. Information We Collect</span>
              </h3>
              <p className="text-[#EEEAF8]/80 text-sm leading-relaxed">
                We collect information necessary to fulfill IT consulting contracts, software engineering projects, AI model deployments, candidate applications, and client inquiries:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#EEEAF8]/80 pl-2">
                <li><strong className="text-[#EEEAF8]">Client Identification Data:</strong> Full name, corporate email address, business phone number, company name, and job designation provided via consultation forms.</li>
                <li><strong className="text-[#EEEAF8]">Technical & System Specifications:</strong> Software architecture blueprints, API keys, database schemas, and cloud deployment configurations shared under Non-Disclosure Agreements (NDAs).</li>
                <li><strong className="text-[#EEEAF8]">Usage & Technical Logs:</strong> IP addresses, browser types, device specifications, and page navigation metrics collected to optimize web portal performance.</li>
                <li><strong className="text-[#EEEAF8]">Career & Internship Application Data:</strong> Candidate resumes, academic records, portfolio links, employment history, and answers submitted through recruitment forms.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-4 pt-6 border-t border-[#EEEAF8]/15">
              <h3 className="text-xl font-display font-bold text-[#EEEAF8] flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#d4a373]" />
                <span>2. How We Use & Process Your Information</span>
              </h3>
              <p className="text-[#EEEAF8]/80 text-sm leading-relaxed">
                We process your information exclusively for legitimate business operations and project delivery:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl glass-card border border-[#EEEAF8]/20 bg-[#1E1D4E] space-y-1">
                  <span className="font-bold text-xs text-[#d4a373] block">Service Execution & Delivery</span>
                  <p className="text-xs text-[#EEEAF8]/80">Building, testing, deploying, and maintaining custom web apps, mobile solutions, and enterprise AI workflows.</p>
                </div>
                <div className="p-4 rounded-xl glass-card border border-[#EEEAF8]/20 bg-[#1E1D4E] space-y-1">
                  <span className="font-bold text-xs text-[#d4a373] block">Confidentiality & Non-Disclosure</span>
                  <p className="text-xs text-[#EEEAF8]/80">All client proprietary algorithms, datasets, and codebase repos are isolated and protected by strict NDAs.</p>
                </div>
                <div className="p-4 rounded-xl glass-card border border-[#EEEAF8]/20 bg-[#1E1D4E] space-y-1">
                  <span className="font-bold text-xs text-[#d4a373] block">Client Support & Invoicing</span>
                  <p className="text-xs text-[#EEEAF8]/80">Communicating sprint updates, issuing invoice milestones, and managing SLA support requests.</p>
                </div>
                <div className="p-4 rounded-xl glass-card border border-[#EEEAF8]/20 bg-[#1E1D4E] space-y-1">
                  <span className="font-bold text-xs text-[#d4a373] block">Zero Third-Party Data Sales</span>
                  <p className="text-xs text-[#EEEAF8]/80">SparkIntellect never sells, rents, or monetizes client business data, contact lists, or codebase assets.</p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-4 pt-6 border-t border-[#EEEAF8]/15">
              <h3 className="text-xl font-display font-bold text-[#EEEAF8] flex items-center gap-2">
                <Server className="w-5 h-5 text-[#d4a373]" />
                <span>3. Data Storage & Security Standards</span>
              </h3>
              <p className="text-[#EEEAF8]/80 text-sm leading-relaxed">
                SparkIntellect implements enterprise security protocols across all infrastructure layer touchpoints:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#EEEAF8]/80 pl-2">
                <li>End-to-end 256-bit SSL encryption for data in transit and AES-256 encryption for database storage at rest.</li>
                <li>Role-Based Access Control (RBAC) restricting server and database access strictly to authorized personnel.</li>
                <li>Cloudflare Turnstile and intelligent rate limiting protecting public endpoints from automated scraping and abuse.</li>
                <li>Daily automated disaster recovery backups stored across secure, geographically redundant cloud facilities.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-4 pt-6 border-t border-[#EEEAF8]/15">
              <h3 className="text-xl font-display font-bold text-[#EEEAF8] flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#d4a373]" />
                <span>4. Your Data Rights & Contact Information</span>
              </h3>
              <p className="text-[#EEEAF8]/80 text-sm leading-relaxed">
                Clients and visitors have the right to request access to their personal data, request correction of inaccurate records, or request permanent erasure of contact records.
              </p>
              <div className="p-5 rounded-2xl glass-card border border-[#EEEAF8]/20 bg-[#1E1D4E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EEEAF8]/85">
                <div>
                  <span className="font-bold block text-sm mb-0.5 text-[#EEEAF8] font-display">SparkIntellect Legal & Privacy Desk</span>
                  <span className="text-[#EEEAF8]/70">Email: {COMPANY_INFO.email} | Address: {COMPANY_INFO.address}</span>
                </div>
                <Link
                  href="/contact"
                  className="px-6 py-2.5 rounded-full font-bold text-xs glass-btn-primary shadow-lg shrink-0 transition-all"
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

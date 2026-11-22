import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { COMPANY_INFO } from "@/data/companyData";
import { 
  Clock, 
  Server, 
  Lock, 
  CheckCircle,
  PhoneCall,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Client Support & Maintenance | SparkIntellect",
  description: "SparkIntellect 24/7 technical support, cloud infrastructure monitoring, security updates, and SLA maintenance packages.",
};

export default function SupportPage() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#EEEAF8] text-[#2B2A6B] selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-32 pb-20 sm:pb-24 w-full max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Post-Launch Security"
            title="24/7 Enterprise Support &"
            highlightTitle="Cloud Maintenance"
            subtitle="We ensure your AI models, databases, web applications, and servers remain secure, fast, and 99.99% available around the clock."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            <GridStaggerItem index={0}>
              <div className="cinematic-card p-8 rounded-3xl border border-[rgba(198,202,208,0.16)] bg-[#0B0B0E]/90 hover:border-[#C8102E]/50 shadow-xl space-y-4 h-full group transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#8B0015]/20 border border-[#C8102E]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Clock className="w-6 h-6 text-[#FF1744]" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">Rapid Response SLA</h3>
                <p className="text-[#A6A9B0] text-sm leading-relaxed">
                  Guaranteed emergency response within 15–30 minutes for mission-critical production outages.
                </p>
                <div className="text-xs font-mono font-bold text-[#FF1744]">P1 Critical Outage Support</div>
              </div>
            </GridStaggerItem>

            <GridStaggerItem index={1}>
              <div className="cinematic-card p-8 rounded-3xl border border-[rgba(198,202,208,0.16)] bg-[#0B0B0E]/90 hover:border-[#C8102E]/50 shadow-xl space-y-4 h-full group transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#8B0015]/20 border border-[#C8102E]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Server className="w-6 h-6 text-[#FF1744]" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">Cloud Health & Backups</h3>
                <p className="text-[#A6A9B0] text-sm leading-relaxed">
                  Automated daily database backups, SSL renewals, Docker container health checks, and server autoscaling.
                </p>
                <div className="text-xs font-mono font-bold text-[#FF1744]">Automated Daily Snapshots</div>
              </div>
            </GridStaggerItem>

            <GridStaggerItem index={2}>
              <div className="cinematic-card p-8 rounded-3xl border border-[rgba(198,202,208,0.16)] bg-[#0B0B0E]/90 hover:border-[#C8102E]/50 shadow-xl space-y-4 h-full group transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#8B0015]/20 border border-[#C8102E]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Lock className="w-6 h-6 text-[#FF1744]" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">Security & Vulnerability Patches</h3>
                <p className="text-[#A6A9B0] text-sm leading-relaxed">
                  Continuous vulnerability scanning, dependency security updates, and firewall configuration.
                </p>
                <div className="text-xs font-mono font-bold text-[#FF1744]">Zero-Trust Hardening</div>
              </div>
            </GridStaggerItem>

          </div>

          {/* SLA Packages Table */}
          <SectionWrapper className="cinematic-card p-8 sm:p-12 rounded-3xl border border-[rgba(198,202,208,0.16)] space-y-6 bg-[#0B0B0E]/90 shadow-2xl relative overflow-hidden">
            <h2 className="text-2xl font-display font-bold text-white text-center">
              Maintenance & SLA Tiers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              
              <div className="p-6 rounded-2xl bg-[#111115] border border-[rgba(198,202,208,0.1)] space-y-4">
                <div className="text-xs font-bold text-[#C6CAD0] uppercase tracking-wider font-mono">Basic Health</div>
                <div className="text-2xl font-display font-extrabold text-white">Essential</div>
                <ul className="space-y-2 text-xs text-[#A6A9B0]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FF1744]" />
                    <span>Monthly Security Patches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FF1744]" />
                    <span>Weekly Data Backups</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FF1744]" />
                    <span>Business Hours Support</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#150a0e] border border-[#C8102E]/50 space-y-4 relative shadow-lg shadow-[#C8102E]/10">
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full btn-ruby text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                  POPULAR
                </div>
                <div className="text-xs font-bold text-[#FF1744] uppercase tracking-wider font-mono">Standard Growth</div>
                <div className="text-2xl font-display font-extrabold text-white">Pro SLA</div>
                <ul className="space-y-2 text-xs text-[#E8EBEF] font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FF1744]" />
                    <span>24-Hour Ticket Response</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FF1744]" />
                    <span>Daily Automated Cloud Backups</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FF1744]" />
                    <span>AI Model API Monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FF1744]" />
                    <span>10 Hours Minor Updates Included</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#111115] border border-[rgba(198,202,208,0.1)] space-y-4">
                <div className="text-xs font-bold text-[#C6CAD0] uppercase tracking-wider font-mono">Enterprise Scale</div>
                <div className="text-2xl font-display font-extrabold text-white">Custom Retainer</div>
                <ul className="space-y-2 text-xs text-[#A6A9B0]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FF1744]" />
                    <span>15-min Emergency Response</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FF1744]" />
                    <span>Dedicated DevOps Engineer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FF1744]" />
                    <span>Multi-Region Cloud Failover</span>
                  </li>
                </ul>
              </div>

            </div>

            <div className="pt-6 border-t border-[rgba(198,202,208,0.1)] text-center flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="btn-ruby px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-[#C8102E]/25 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Support Line: {COMPANY_INFO.phone}</span>
              </a>

              <Link
                href="/contact"
                className="px-6 py-3 rounded-full font-semibold text-xs text-[#C6CAD0] bg-[#111115] border border-[rgba(198,202,208,0.16)] hover:bg-[#1a1a22] hover:text-white flex items-center gap-2 transition-all"
              >
                <span>Submit Support Ticket</span>
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

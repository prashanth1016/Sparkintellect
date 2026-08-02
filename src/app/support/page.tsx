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
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Post-Launch Security"
            title="24/7 Enterprise Support &"
            highlightTitle="Cloud Maintenance"
            subtitle="We ensure your AI models, databases, web applications, and servers remain secure, fast, and 99.99% available around the clock."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            <GridStaggerItem index={0}>
              <div className="luxury-card p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-md space-y-4 h-full">
                <div className="w-12 h-12 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#0284c7]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0B1220]">Rapid Response SLA</h3>
                <p className="text-[#334155] text-sm leading-relaxed">
                  Guaranteed emergency response within 15–30 minutes for mission-critical production outages.
                </p>
                <div className="text-xs font-mono font-bold text-[#0284c7]">P1 Critical Outage Support</div>
              </div>
            </GridStaggerItem>

            <GridStaggerItem index={1}>
              <div className="luxury-card p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-md space-y-4 h-full">
                <div className="w-12 h-12 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center">
                  <Server className="w-6 h-6 text-[#0284c7]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0B1220]">Cloud Health & Backups</h3>
                <p className="text-[#334155] text-sm leading-relaxed">
                  Automated daily database backups, SSL renewals, Docker container health checks, and server autoscaling.
                </p>
                <div className="text-xs font-mono font-bold text-[#0284c7]">Automated Daily Snapshots</div>
              </div>
            </GridStaggerItem>

            <GridStaggerItem index={2}>
              <div className="luxury-card p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-md space-y-4 h-full">
                <div className="w-12 h-12 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center">
                  <Lock className="w-6 h-6 text-[#0284c7]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0B1220]">Security & Vulnerability Patches</h3>
                <p className="text-[#334155] text-sm leading-relaxed">
                  Continuous vulnerability scanning, dependency security updates, and firewall configuration.
                </p>
                <div className="text-xs font-mono font-bold text-[#0284c7]">Zero-Trust Hardening</div>
              </div>
            </GridStaggerItem>

          </div>

          {/* SLA Packages Table */}
          <SectionWrapper className="luxury-card p-8 sm:p-12 rounded-3xl border border-[#BEE0FF] space-y-6 bg-white shadow-xl">
            <h2 className="text-2xl font-serif font-bold text-[#0B1220] text-center">
              Maintenance & SLA Tiers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              
              <div className="p-6 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] space-y-4">
                <div className="text-xs font-bold text-[#0B1220] uppercase tracking-wider">Basic Health</div>
                <div className="text-2xl font-serif font-extrabold text-[#0B1220]">Essential</div>
                <ul className="space-y-2 text-xs text-[#334155]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Monthly Security Patches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Weekly Data Backups</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Business Hours Support</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] space-y-4 relative shadow-md">
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#0B1220] text-[10px] font-bold text-white uppercase tracking-wider">
                  POPULAR
                </div>
                <div className="text-xs font-bold text-[#0B1220] uppercase tracking-wider">Standard Growth</div>
                <div className="text-2xl font-serif font-extrabold text-[#0B1220]">Pro SLA</div>
                <ul className="space-y-2 text-xs text-[#0B1220] font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>24-Hour Ticket Response</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Daily Automated Cloud Backups</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>AI Model API Monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>10 Hours Minor Updates Included</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] space-y-4">
                <div className="text-xs font-bold text-[#0B1220] uppercase tracking-wider">Enterprise Scale</div>
                <div className="text-2xl font-serif font-extrabold text-[#0B1220]">Custom Retainer</div>
                <ul className="space-y-2 text-xs text-[#334155]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>15-min Emergency Response</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Dedicated DevOps Engineer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Multi-Region Cloud Failover</span>
                  </li>
                </ul>
              </div>

            </div>

            <div className="pt-6 border-t border-[#BEE0FF] text-center flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="px-6 py-3 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Support Line: {COMPANY_INFO.phone}</span>
              </a>

              <Link
                href="/contact"
                className="px-6 py-3 rounded-full font-semibold text-xs text-[#0B1220] bg-[#F2F9FF] border border-[#BEE0FF] hover:bg-[#D6EBFF] flex items-center gap-2"
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

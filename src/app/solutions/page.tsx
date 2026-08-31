import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { 
  Building2, 
  Bot, 
  ShoppingBag, 
  Zap, 
  Smartphone, 
  Database, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industry & Business Solutions | SparkIntellect",
  description:
    "Explore SparkIntellect's custom business software solutions: Enterprise ERPs, AI Customer Support Copilots, Automated WhatsApp CRMs, and Digital Operations Portals.",
};

const SOLUTIONS = [
  {
    title: "AI Knowledge & Customer Copilots",
    tag: "AI & Automation",
    icon: Bot,
    desc: "Private RAG pipelines connecting enterprise documents, live ERP databases, and customer channels (Web & WhatsApp) to resolve 80%+ of inquiries autonomously.",
    features: ["Zero public data training", "Multi-lingual document OCR", "WhatsApp Business Cloud integration", "Human-in-the-loop escalation"],
    link: "/services/ai-development",
  },
  {
    title: "Multi-Site Construction ERP",
    tag: "Enterprise Software",
    icon: Building2,
    desc: "Centralized mobile-first construction management tracking material inwards, gate passes, subcontractor measurement book RA bills, and site labor logs.",
    features: ["Subcontractor billing verification", "Real-time material inventory alerts", "Digital gate pass authorization", "Multi-project cash flow dashboards"],
    link: "/industries/construction",
  },
  {
    title: "Omnichannel WhatsApp Commerce",
    tag: "Process Automation",
    icon: Zap,
    desc: "Automated end-to-end sales pipelines handling catalog discovery, instant UPI checkout links, automated GST invoicing, and tracking updates.",
    features: ["Instant WhatsApp order tracking", "Automated payment reconciliation", "Webhook error queue & recovery", "Multi-warehouse dispatch routing"],
    link: "/services/automation",
  },
  {
    title: "Headless E-Commerce Platforms",
    tag: "Web Engineering",
    icon: ShoppingBag,
    desc: "Sub-second Next.js digital storefronts engineered for high conversions with localized payment gateways, instant search, and real-time inventory synchronization.",
    features: ["Sub-second page transitions", "Zero layout shift Core Web Vitals", "Razorpay / Stripe / UPI gateways", "Multi-branch store inventory sync"],
    link: "/services/web-development",
  },
  {
    title: "Field Operations & Logistics Apps",
    tag: "Mobile Apps",
    icon: Smartphone,
    desc: "Offline-first mobile applications for field technicians, inspection engineers, and delivery drivers with real-time GPS tracking and background data sync.",
    features: ["Offline SQLite data caching", "Biometric and PIN login", "Barcode / QR scanning", "Push alerts for urgent job dispatch"],
    link: "/services/mobile-development",
  },
  {
    title: "Secure Client Document Portals",
    tag: "Security & Cloud",
    icon: Database,
    desc: "Encrypted workspaces for chartered accountancies, legal firms, and corporate consultancies with tamper-evident audit logs and automated billing.",
    features: ["Role-based access control", "End-to-end encrypted file sharing", "Automated recurring GST invoicing", "Immutable download audit trails"],
    link: "/industries/finance",
  },
];

export default function SolutionsPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Tailored Systems"
            title="Custom Business & Enterprise"
            highlightTitle="Software Solutions"
            subtitle="Explore how we combine Artificial Intelligence, modern web engineering, and automated workflows into turnkey platforms."
          />

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {SOLUTIONS.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <GridStaggerItem key={sol.title} index={idx}>
                  <div className="luxury-card luxury-card-hover p-8 rounded-3xl border border-[#BEE0FF] h-full flex flex-col justify-between bg-white">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center text-[#0284c7]">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase text-[#334155] px-2.5 py-0.5 rounded-full bg-[#F2F9FF] border border-[#BEE0FF]">
                          {sol.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-[#0B1220]">
                        {sol.title}
                      </h3>

                      <p className="text-xs text-[#334155] leading-relaxed">
                        {sol.desc}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-[#BEE0FF]/60">
                        {sol.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#0B1220]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#BEE0FF]">
                      <Link
                        href={sol.link}
                        className="text-xs font-bold text-[#0B1220] hover:text-[#0284c7] flex items-center gap-1.5 transition-colors group"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#0284c7]" />
                      </Link>
                    </div>
                  </div>
                </GridStaggerItem>
              );
            })}
          </div>

          {/* Bottom Consultation CTA */}
          <SectionWrapper className="luxury-card p-10 sm:p-12 rounded-3xl border border-[#BEE0FF] bg-[#F2F9FF] text-center shadow-lg">
            <h3 className="text-3xl font-serif font-bold text-[#0B1220] mb-3">
              Need a Custom Solution Engineered for Your Team?
            </h3>
            <p className="text-sm text-[#334155] max-w-xl mx-auto mb-6">
              Our technical architects will analyze your existing tools, map your workflows, and build a prototype in rapid 2-week sprints.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md transition-all"
            >
              <span>Schedule Architecture Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </SectionWrapper>

        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

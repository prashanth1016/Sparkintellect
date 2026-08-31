import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { publicApi, CareerItem } from "@/lib/api";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Zap, 
  Users, 
  Building,
  AlertTriangle,
  RefreshCw,
  Mail
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers & Engineering Roles | SparkIntellect",
  description:
    "Build the future of AI & Enterprise Software with SparkIntellect. Explore full-time engineering and product design openings in Guindy, Chennai.",
};

const CULTURE_BENEFITS = [
  {
    title: "AI-First Engineering",
    desc: "Work on cutting-edge generative AI models, enterprise RAG, and high-speed web apps.",
    icon: Sparkles,
  },
  {
    title: "Direct Founder Mentorship",
    desc: "Collaborate closely with technical leadership and senior enterprise architects.",
    icon: Users,
  },
  {
    title: "High Ownership & Impact",
    desc: "No layers of bureaucracy. Ship code to live production in your first sprint.",
    icon: Zap,
  },
  {
    title: "Competitive Compensation",
    desc: "Market-leading salary benchmarks, performance incentives, and career growth.",
    icon: Award,
  },
];

export default async function CareersPage() {
  let careers: CareerItem[] = [];
  let fetchError = false;

  try {
    careers = await publicApi.getCareers();
  } catch (err) {
    fetchError = true;
    careers = [];
  }

  const activeRoles = careers.filter((c) => c.status === "active");

  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero */}
        <SectionWrapper className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#D6EBFF] border border-[#BEE0FF] text-[#0B1220] mb-6">
            <Briefcase className="w-4 h-4 text-[#0284c7]" />
            <span>Join Our Engineering Team</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-[#0B1220] max-w-4xl mx-auto leading-tight mb-6">
            Build the Future of{" "}
            <span className="text-gradient-navy italic font-serif">Intelligent Software</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#334155] max-w-3xl mx-auto leading-relaxed mb-8">
            SparkIntellect is expanding our core engineering team in Guindy, Chennai. We are looking for talented full-stack engineers and AI specialists who value clean code, high speed, and architectural integrity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#open-roles"
              className="px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-lg shadow-[#9FCFFB]/30 hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>View Open Positions ({activeRoles.length})</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/internships"
              className="px-8 py-4 rounded-full font-semibold text-sm bg-[#F2F9FF] text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-all"
            >
              Looking for Internships?
            </Link>
          </div>
        </SectionWrapper>

        {/* Culture & Benefits */}
        <SectionWrapper className="bg-[#F2F9FF] py-20 border-y border-[#BEE0FF] mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Engineering Culture"
              title="Why Build Your Career at"
              highlightTitle="SparkIntellect?"
              subtitle="We cultivate an environment focused on senior craftsmanship, rapid experimentation, and clear ownership."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CULTURE_BENEFITS.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <GridStaggerItem key={b.title} index={idx}>
                    <div className="luxury-card p-6 rounded-3xl border border-[#BEE0FF] h-full flex flex-col justify-between bg-white shadow-sm">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center mb-5 text-[#0284c7]">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-serif font-bold text-[#0B1220] mb-2">{b.title}</h3>
                        <p className="text-xs text-[#334155] leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  </GridStaggerItem>
                );
              })}
            </div>
          </div>
        </SectionWrapper>

        {/* Open Positions */}
        <SectionWrapper id="open-roles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 scroll-mt-28">
          <SectionHeading
            badge="Current Openings"
            title="Open Engineering &"
            highlightTitle="Product Roles"
            subtitle="Explore available full-time positions across our AI and software engineering departments."
          />

          {fetchError ? (
            <div className="luxury-card p-10 rounded-3xl border border-rose-200 bg-rose-50/50 text-center max-w-lg mx-auto space-y-4 shadow-sm">
              <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-[#0B1220]">
                Unable to load current career opportunities
              </h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                We are experiencing a temporary connection issue. Please refresh or try again in a few moments.
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs bg-[#0B1220] text-white hover:bg-slate-800 transition-colors shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </Link>
            </div>
          ) : activeRoles.length === 0 ? (
            <div className="luxury-card p-10 sm:p-14 rounded-3xl border border-[#BEE0FF] bg-gradient-to-br from-white via-[#F2F9FF] to-white text-center max-w-2xl mx-auto space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#D6EBFF] text-[#0284c7] flex items-center justify-center mx-auto shadow-inner">
                <Briefcase className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-[#0B1220]">
                No Current Career Openings
              </h3>
              
              <p className="text-xs sm:text-sm text-[#334155] max-w-md mx-auto leading-relaxed">
                We don&apos;t have any active job openings right now. We are always interested in connecting with outstanding engineers and AI practitioners for future opportunities.
              </p>
              
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Submit General Application</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {activeRoles.map((role) => (
                <div
                  key={role._id || role.id || role.slug}
                  className="luxury-card luxury-card-hover p-8 rounded-3xl border border-[#BEE0FF] bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-[#D6EBFF] text-[#0284c7] font-mono font-bold text-xs">
                        {role.department}
                      </span>
                      <span className="text-xs font-mono text-[#334155]">
                        {role.type} • {role.experience}
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-[#0B1220]">
                      {role.title}
                    </h3>

                    <p className="text-xs text-[#334155] max-w-2xl leading-relaxed">
                      {role.shortDesc}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-[#334155] pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
                        {role.location}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/careers/${role.slug}`}
                    className="px-6 py-3 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center gap-2 shrink-0 transition-all"
                  >
                    <span>View Role & Apply</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>

      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

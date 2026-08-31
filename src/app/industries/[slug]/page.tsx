import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { INDUSTRIES } from "@/data/companyData";
import { 
  Building, 
  Activity, 
  GraduationCap, 
  ShoppingBag, 
  Factory, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Layers
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  "construction": Building,
  "healthcare": Activity,
  "education": GraduationCap,
  "retail": ShoppingBag,
  "manufacturing": Factory,
  "finance": Briefcase,
};

export async function generateStaticParams() {
  return INDUSTRIES.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) {
    return { title: "Industry Not Found | SparkIntellect" };
  }

  return {
    title: `${industry.name} Software & AI Solutions | SparkIntellect`,
    description: industry.tagline,
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  const Icon = INDUSTRY_ICONS[industry.slug] || Sparkles;

  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#334155] mb-8">
            <Link href="/" className="hover:text-[#0B1220]">Home</Link>
            <span>/</span>
            <Link href="/industries" className="hover:text-[#0B1220]">Industries</Link>
            <span>/</span>
            <span className="text-[#0284c7] font-semibold">{industry.name}</span>
          </div>

          {/* Hero Section */}
          <SectionWrapper className="mb-20">
            <div className="luxury-card p-8 sm:p-14 rounded-3xl border border-[#BEE0FF] bg-gradient-to-br from-white via-[#F2F9FF] to-white shadow-xl">
              <div className="max-w-3xl space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center text-[#0284c7]">
                  <Icon className="w-8 h-8" />
                </div>

                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0B1220] leading-tight">
                  {industry.name}
                </h1>

                <p className="text-xl font-medium text-[#0284c7]">
                  {industry.tagline}
                </p>

                <p className="text-base text-[#334155] leading-relaxed">
                  {industry.description}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                  <Link
                    href="/contact"
                    className="px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-lg shadow-[#9FCFFB]/40 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Consult on {industry.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/work"
                    className="px-8 py-4 rounded-full font-semibold text-sm bg-white text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-all text-center"
                  >
                    View Related Case Studies
                  </Link>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Challenges vs Digital Solution Grid */}
          <SectionWrapper className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Challenges */}
              <div className="p-8 rounded-3xl bg-[#FFF5F5] border border-rose-200 space-y-5">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-lg font-serif">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  <span>Key Sector Bottlenecks</span>
                </div>
                <p className="text-xs text-rose-900 leading-relaxed">
                  Common operational friction points we frequently see across the {industry.name} sector:
                </p>
                <div className="space-y-3">
                  {industry.challenges.map((c, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-rose-100 text-xs text-[#0B1220] flex items-start gap-2.5">
                      <span className="font-mono font-bold text-rose-500 shrink-0">0{i + 1}</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div className="p-8 rounded-3xl bg-[#F0FDF4] border border-emerald-200 space-y-5">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg font-serif">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>SparkIntellect Digital Solutions</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Engineered systems designed to streamline workflows and eliminate manual errors:
                </p>
                <div className="space-y-3">
                  {industry.solutions.map((s, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-emerald-100 text-xs text-[#0B1220] flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Featured Technology */}
          <SectionWrapper className="mb-20 p-8 rounded-3xl border border-[#BEE0FF] bg-[#F2F9FF]">
            <h3 className="text-sm font-mono font-bold uppercase text-[#0B1220] mb-4">
              Featured Technologies for {industry.name}:
            </h3>
            <div className="flex flex-wrap gap-2">
              {industry.featuredTech.map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-xl bg-white border border-[#BEE0FF] text-xs font-mono font-bold text-[#0B1220]">
                  {tech}
                </span>
              ))}
            </div>
          </SectionWrapper>

          {/* Bottom CTA */}
          <SectionWrapper className="luxury-card p-10 rounded-3xl border border-[#BEE0FF] bg-gradient-to-r from-[#D6EBFF] to-[#9FCFFB] text-center shadow-lg">
            <h3 className="text-3xl font-serif font-bold text-[#0B1220] mb-3">
              Transform Your {industry.name} Operations
            </h3>
            <p className="text-sm text-[#0B1220]/80 max-w-xl mx-auto mb-6">
              Speak directly with our technical team in Guindy, Chennai to build custom ERPs, mobile apps, or AI pipelines.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-[#0B1220] text-white hover:bg-slate-800 shadow-xl transition-all"
            >
              <span>Schedule Sector Consultation</span>
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

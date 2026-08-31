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
import { SERVICES } from "@/data/companyData";
import { 
  Bot, 
  Globe, 
  Smartphone, 
  Cpu, 
  Zap, 
  Cloud, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  Code2,
  Layers,
  ShieldCheck
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const ICON_MAP: Record<string, React.ElementType> = {
  "ai-development": Bot,
  "web-development": Globe,
  "mobile-development": Smartphone,
  "enterprise-software": Cpu,
  "automation": Zap,
  "cloud-devops": Cloud,
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    return { title: "Service Not Found | SparkIntellect" };
  }

  return {
    title: `${service.title} Solutions | SparkIntellect`,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} | SparkIntellect Engineering`,
      description: service.shortDesc,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = ICON_MAP[service.slug] || Sparkles;

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
            <Link href="/services" className="hover:text-[#0B1220]">Services</Link>
            <span>/</span>
            <span className="text-[#0284c7] font-semibold">{service.title}</span>
          </div>

          {/* Hero Section */}
          <SectionWrapper className="mb-20">
            <div className="luxury-card p-8 sm:p-14 rounded-3xl border border-[#BEE0FF] bg-gradient-to-br from-white via-[#F2F9FF] to-white shadow-xl">
              <div className="max-w-3xl space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center text-[#0284c7]">
                  <Icon className="w-8 h-8" />
                </div>

                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0B1220] leading-tight">
                  {service.title}
                </h1>

                <p className="text-lg sm:text-xl text-[#334155] leading-relaxed">
                  {service.fullDesc}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                  <Link
                    href="/contact"
                    className="px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-lg shadow-[#9FCFFB]/40 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Consult on {service.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`tel:+918977177634`}
                    className="px-8 py-4 rounded-full font-semibold text-sm bg-white text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-all text-center"
                  >
                    Direct Line: +91 8977177634
                  </a>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Capabilities Grid */}
          <SectionWrapper className="mb-20">
            <SectionHeading
              badge="Capabilities"
              title="Full Spectrum Capabilities in"
              highlightTitle={service.title}
              subtitle="End-to-end technical components built into our client software architectures."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.capabilities.map((cap, idx) => (
                <GridStaggerItem key={cap} index={idx}>
                  <div className="p-6 rounded-3xl bg-[#F2F9FF] border border-[#BEE0FF] hover:border-[#9FCFFB] transition-all h-full">
                    <CheckCircle2 className="w-6 h-6 text-[#0284c7] mb-3" />
                    <h3 className="text-base font-bold text-[#0B1220] mb-2">{cap}</h3>
                    <p className="text-xs text-[#334155] leading-relaxed">
                      Engineered for high reliability, strict data compliance, and high throughput.
                    </p>
                  </div>
                </GridStaggerItem>
              ))}
            </div>
          </SectionWrapper>

          {/* Use Cases Section */}
          <SectionWrapper className="mb-20 bg-[#F2F9FF] p-8 sm:p-12 rounded-3xl border border-[#BEE0FF]">
            <h2 className="text-2xl font-serif font-bold text-[#0B1220] mb-6">
              Common Enterprise Use Cases
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.useCases.map((uc, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-[#BEE0FF] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#D6EBFF] text-[#0284c7] font-mono font-bold flex items-center justify-center text-xs shrink-0">
                    0{i + 1}
                  </div>
                  <span className="text-sm font-semibold text-[#0B1220]">{uc}</span>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* Process Timeline */}
          {service.process && service.process.length > 0 && (
            <SectionWrapper className="mb-20">
              <SectionHeading
                badge="Execution Flow"
                title="Our Engineering Process for"
                highlightTitle={service.title}
                subtitle="Structured milestones designed for rapid delivery and predictable quality."
              />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {service.process.map((step, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-white border border-[#BEE0FF] shadow-sm space-y-2">
                    <div className="text-xs font-mono font-bold text-[#0284c7]">Step 0{idx + 1}</div>
                    <h3 className="text-base font-bold text-[#0B1220]">{step.step}</h3>
                    <p className="text-xs text-[#334155] leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          )}

          {/* Tech Stack Bar */}
          <SectionWrapper className="mb-20 p-8 rounded-3xl border border-[#BEE0FF] bg-white">
            <h3 className="text-sm font-mono font-bold uppercase text-[#0B1220] mb-4">
              Technology Stack Used:
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs font-mono font-bold text-[#0B1220]">
                  {tech}
                </span>
              ))}
            </div>
          </SectionWrapper>

          {/* FAQ Section */}
          {service.faqs && service.faqs.length > 0 && (
            <SectionWrapper className="mb-20">
              <h2 className="text-2xl font-serif font-bold text-[#0B1220] mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] space-y-2">
                    <div className="text-sm font-bold text-[#0B1220] flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#0284c7] shrink-0" />
                      <span>{faq.q}</span>
                    </div>
                    <p className="text-xs text-[#334155] leading-relaxed pl-6">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          )}

          {/* Bottom CTA Banner */}
          <SectionWrapper className="luxury-card p-10 rounded-3xl border border-[#BEE0FF] bg-gradient-to-r from-[#D6EBFF] to-[#9FCFFB] text-center shadow-lg">
            <h3 className="text-3xl font-serif font-bold text-[#0B1220] mb-3">
              Ready to Implement {service.title}?
            </h3>
            <p className="text-sm text-[#0B1220]/80 max-w-xl mx-auto mb-6">
              Our engineering team is ready to scope your project, estimate timelines, and provide a clear architectural blueprint.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-[#0B1220] text-white hover:bg-slate-800 shadow-xl transition-all"
            >
              <span>Request Technical Proposal</span>
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

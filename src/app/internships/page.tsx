import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { publicApi, InternshipItem } from "@/lib/api";
import { INTERNSHIP_DOMAINS } from "@/data/companyData";
import { 
  GraduationCap, 
  Briefcase, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Bot, 
  Calendar, 
  MapPin,
  Building,
  Globe,
  Smartphone,
  Cloud,
  Layout,
  AlertTriangle,
  RefreshCw
} from "lucide-react";

export const metadata: Metadata = {
  title: "Internship Programs in Chennai | SparkIntellect",
  description:
    "Launch your technology career with SparkIntellect. Real production projects in AI/ML, Full-Stack Web Development, and Mobile Engineering in Guindy, Chennai.",
};

const DOMAIN_ICONS: Record<string, React.ElementType> = {
  Bot: Bot,
  Globe: Globe,
  Smartphone: Smartphone,
  Cloud: Cloud,
  Layout: Layout,
};

const WHY_INTERN = [
  {
    title: "Live Production Systems",
    desc: "Work on genuine client applications, AI pipelines, and software platforms deployed in production.",
    icon: Briefcase,
  },
  {
    title: "1-on-1 Senior Mentorship",
    desc: "Direct guidance from Founder Prashanth S and senior lead architects in Guindy, Chennai.",
    icon: Users,
  },
  {
    title: "Modern AI & Tech Stack",
    desc: "Hands-on engineering with Next.js, Python LLMs, TypeScript, Docker, and workflow automation.",
    icon: Bot,
  },
  {
    title: "Official Certification & LOR",
    desc: "Receive a verified SparkIntellect Internship Certificate and Letter of Recommendation.",
    icon: Award,
  },
  {
    title: "Pre-Placement Offer (PPO)",
    desc: "Top performing interns receive fast-tracked full-time software engineering offers.",
    icon: Sparkles,
  },
  {
    title: "Flexible Tenure & Mode",
    desc: "3 to 6-month tenures available with remote, hybrid, or on-site execution in Chennai.",
    icon: Calendar,
  },
];

export default async function InternshipsPage() {
  let internships: InternshipItem[] = [];
  let fetchError = false;

  try {
    internships = await publicApi.getInternships();
  } catch (err) {
    fetchError = true;
    internships = [];
  }

  const openInternships = internships.filter(
    (i) => i.published && i.status === "open"
  );

  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        {/* HERO SECTION */}
        <SectionWrapper className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#D6EBFF] border border-[#BEE0FF] text-[#0B1220] mb-6">
            <GraduationCap className="w-4 h-4 text-[#0284c7]" />
            <span>SparkIntellect Internship Program</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-[#0B1220] max-w-4xl mx-auto leading-tight mb-6">
            Learn by Building Real{" "}
            <span className="text-gradient-navy italic font-serif">Production Software</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#334155] max-w-3xl mx-auto leading-relaxed mb-8">
            Gain intensive, real-world engineering depth in Artificial Intelligence, Full-Stack Web Applications, Mobile Platforms, and Cloud Infrastructure with 1-on-1 mentorship in Chennai.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#open-tracks"
              className="px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-lg shadow-[#9FCFFB]/30 hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>View Open Opportunities ({openInternships.length})</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full font-semibold text-sm bg-[#F2F9FF] text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-all"
            >
              Contact Internship Desk
            </Link>
          </div>
        </SectionWrapper>

        {/* OPEN OPPORTUNITIES GRID */}
        <SectionWrapper id="open-tracks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 scroll-mt-28">
          <SectionHeading
            badge="Current Openings"
            title="Available Internship"
            highlightTitle="Opportunities"
            subtitle="Explore our active engineering tracks. Applications are screened on a rolling basis."
          />

          {fetchError ? (
            <div className="luxury-card p-10 rounded-3xl border border-rose-200 bg-rose-50/50 text-center max-w-lg mx-auto space-y-4 shadow-sm">
              <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-[#0B1220]">
                Unable to load current internships
              </h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                We are experiencing a temporary connection issue. Please refresh or try again in a few moments.
              </p>
              <Link
                href="/internships"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs bg-[#0B1220] text-white hover:bg-slate-800 transition-colors shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </Link>
            </div>
          ) : openInternships.length === 0 ? (
            /* Clean Empty State */
            <div className="space-y-12">
              <div className="luxury-card p-10 sm:p-14 rounded-3xl border border-[#BEE0FF] bg-gradient-to-br from-white via-[#F2F9FF] to-white text-center max-w-2xl mx-auto space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#D6EBFF] text-[#0284c7] flex items-center justify-center mx-auto shadow-inner">
                  <GraduationCap className="w-7 h-7" />
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-[#0B1220]">
                  No Current Internship Openings
                </h3>
                
                <p className="text-xs sm:text-sm text-[#334155] max-w-md mx-auto leading-relaxed">
                  Applications for our current internship cohorts are closed at the moment. New opportunities will be published here when applications reopen.
                </p>
                
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md transition-all"
                  >
                    <span>Submit General Talent Enquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Informational Internship Domains Section */}
              <div className="pt-10 border-t border-[#BEE0FF]">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#D6EBFF] text-[#0284c7] mb-3">
                    <span>What We Offer</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220]">
                    Internship Domains & Engineering Tracks
                  </h3>
                  <p className="text-xs sm:text-sm text-[#334155] mt-2">
                    SparkIntellect provides hands-on technical training and mentorship across core technology disciplines.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {INTERNSHIP_DOMAINS.map((domain, idx) => {
                    const Icon = DOMAIN_ICONS[domain.iconName] || Bot;
                    return (
                      <GridStaggerItem key={domain.title} index={idx}>
                        <div className="luxury-card p-6 sm:p-7 rounded-3xl border border-[#BEE0FF] bg-white h-full flex flex-col justify-between shadow-sm">
                          <div>
                            <div className="w-11 h-11 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center mb-4 text-[#0284c7]">
                              <Icon className="w-5 h-5" />
                            </div>

                            <h4 className="text-lg font-serif font-bold text-[#0B1220] mb-2">
                              {domain.title}
                            </h4>

                            <p className="text-xs text-[#334155] leading-relaxed mb-4">
                              {domain.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#BEE0FF]/60">
                            {domain.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 rounded-full bg-[#F2F9FF] border border-[#BEE0FF] text-[10px] font-mono text-[#0B1220]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </GridStaggerItem>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Active Real MongoDB Internship Openings */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {openInternships.map((internship, idx) => (
                <GridStaggerItem key={internship._id || internship.slug} index={idx}>
                  <div className="luxury-card luxury-card-hover rounded-3xl border border-[#BEE0FF] p-8 h-full flex flex-col justify-between bg-white shadow-sm">
                    <div className="space-y-4">
                      {/* Top status */}
                      <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-3">
                        <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                          {internship.status.toUpperCase()}
                        </span>
                        <span className="text-xs font-mono text-[#334155]">
                          {internship.duration}
                        </span>
                      </div>

                      <h3 className="text-2xl font-serif font-bold text-[#0B1220] leading-snug">
                        {internship.title}
                      </h3>

                      <p className="text-xs text-[#334155] leading-relaxed line-clamp-3">
                        {internship.shortDescription}
                      </p>

                      <div className="p-3 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-[#0B1220]">
                          <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
                          <span><strong>Mode:</strong> {internship.mode}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#0B1220]">
                          <Award className="w-3.5 h-3.5 text-[#0284c7]" />
                          <span><strong>Stipend:</strong> {internship.stipend}</span>
                        </div>
                      </div>

                      {internship.skills && internship.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {internship.skills.slice(0, 3).map((skill) => (
                            <span key={skill} className="px-2 py-0.5 rounded-full bg-[#F2F9FF] border border-[#BEE0FF] text-[10px] font-mono text-[#0B1220]">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#BEE0FF] flex items-center justify-between gap-2">
                      <Link
                        href={`/internships/${internship.slug}`}
                        className="text-xs font-bold text-[#334155] hover:text-[#0B1220] transition-colors"
                      >
                        View Details
                      </Link>

                      <Link
                        href={`/internships/${internship.slug}/apply`}
                        className="px-5 py-2.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center gap-1.5 transition-all"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </GridStaggerItem>
              ))}
            </div>
          )}
        </SectionWrapper>

        {/* WHY INTERN WITH US */}
        <SectionWrapper className="bg-[#F2F9FF] py-20 border-y border-[#BEE0FF] mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Growth & Mentorship"
              title="Why Intern With"
              highlightTitle="SparkIntellect?"
              subtitle="Our program is structured for ambitious engineering students and early grads who want real engineering depth, not just mock exercises."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_INTERN.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <GridStaggerItem key={item.title} index={idx}>
                    <div className="luxury-card luxury-card-hover p-7 rounded-2xl border border-[#BEE0FF] h-full flex flex-col justify-between bg-white shadow-sm">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center mb-5 text-[#0284c7]">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-[#0B1220] mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#334155] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </GridStaggerItem>
                );
              })}
            </div>
          </div>
        </SectionWrapper>

      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

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
  ArrowRight, 
  Sparkles, 
  Bot, 
  Calendar, 
  MapPin, 
  Globe, 
  Smartphone, 
  Cloud, 
  Layout, 
  AlertTriangle, 
  RefreshCw, 
  Code2 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Internship Tracks | SparkIntellect",
  description:
    "Launch your engineering journey with SparkIntellect. Real production systems in AI/ML, Full-Stack Architecture, and Mobile Engineering in Chennai, India.",
};

const DOMAIN_ICONS: Record<string, React.ElementType> = {
  Bot: Bot,
  Globe: Globe,
  Smartphone: Smartphone,
  Cloud: Cloud,
  Layout: Layout,
};

export default async function InternshipsPage() {
  let internships: InternshipItem[] = [];
  let fetchError = false;

  try {
    internships = await publicApi.getInternships();
  } catch {
    fetchError = true;
    internships = [];
  }

  const openInternships = internships.filter(
    (i) => i.published && i.status === "open"
  );

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#EEEAF8] text-[#2B2A6B] selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 sm:pb-24 w-full max-w-full overflow-x-hidden">
        {/* HERO SECTION */}
        <SectionWrapper className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider bg-[#2B2A6B] border border-[#EEEAF8]/20 text-[#EEEAF8] mb-6 shadow-sm">
            <GraduationCap className="w-4 h-4 text-[#d4a373]" />
            <span>Technical Mentorship & Production Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#2B2A6B] max-w-4xl mx-auto leading-tight mb-4 sm:mb-6">
            Engineering{" "}
            <span className="text-gradient-yellow italic">Internship Tracks</span>
          </h1>

          <p className="text-base sm:text-lg text-[#2B2A6B]/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Work alongside senior architects on live production software, autonomous AI pipelines, and cloud systems with dedicated 1-on-1 guidance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#open-tracks"
              className="px-8 py-3.5 rounded-full font-bold text-sm glass-btn-primary flex items-center gap-2 group shadow-xl"
            >
              <span>View Open Opportunities ({openInternships.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full font-medium text-sm glass-card text-[#2B2A6B] border border-[#2B2A6B]/20 hover:border-[#2B2A6B]/40 transition-all"
            >
              Contact Internship Desk
            </Link>
          </div>
        </SectionWrapper>

        {/* OPEN OPPORTUNITIES GRID */}
        <SectionWrapper id="open-tracks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-28">
          <SectionHeading
            badge="Current Openings"
            title="Available"
            highlightTitle="Engineering Tracks"
            subtitle="Explore our active engineering cohorts. Applications are reviewed on a rolling basis."
          />

          {fetchError ? (
            <div className="glass-panel p-10 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] text-center max-w-lg mx-auto space-y-4 shadow-xl">
              <AlertTriangle className="w-10 h-10 text-[#d4a373] mx-auto" />
              <h3 className="text-lg font-display font-bold text-[#EEEAF8]">
                Unable to load live internships
              </h3>
              <p className="text-xs text-[#EEEAF8]/80 leading-relaxed">
                We are experiencing a temporary network connection. Please refresh or try again in a few moments.
              </p>
              <Link
                href="/internships"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs glass-btn-primary shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </Link>
            </div>
          ) : openInternships.length === 0 ? (
            /* Clean Empty State with Informational Tracks */
            <div className="space-y-12">
              <div className="glass-panel p-10 sm:p-12 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] text-center max-w-2xl mx-auto space-y-4 shadow-2xl relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[#d4a373] flex items-center justify-center mx-auto shadow-inner">
                  <GraduationCap className="w-7 h-7" />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-[#EEEAF8]">
                  Applications Currently In Review
                </h3>
                
                <p className="text-xs sm:text-sm text-[#EEEAF8]/80 max-w-md mx-auto leading-relaxed">
                  Active cohort slots are currently filled. New engineering tracks open regularly. You can reach out directly to express interest for upcoming cycles.
                </p>
                
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-xs glass-btn-primary shadow-lg"
                  >
                    <span>Send Talent Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Informational Internship Domains */}
              <div className="pt-8 border-t border-[#2B2A6B]/15">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-medium uppercase tracking-wider bg-[#2B2A6B] text-[#EEEAF8] border border-[#2B2A6B]/25 mb-3">
                    <span>Engineering Disciplines</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#2B2A6B]">
                    Core Technical Domains
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B2A6B]/80 mt-2">
                    SparkIntellect provides hands-on technical training and production exposure across key disciplines.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {INTERNSHIP_DOMAINS.map((domain, idx) => {
                    const Icon = DOMAIN_ICONS[domain.iconName] || Bot;
                    return (
                      <GridStaggerItem key={domain.title} index={idx}>
                        <div className="glass-card p-6 sm:p-7 rounded-2xl h-full flex flex-col justify-between bg-[#2B2A6B]/95 text-[#EEEAF8] border border-[#EEEAF8]/20 hover:border-[#d4a373]/50 transition-all">
                          <div>
                            <div className="w-11 h-11 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 flex items-center justify-center mb-4 text-[#d4a373]">
                              <Icon className="w-5 h-5" />
                            </div>

                            <h4 className="text-lg font-display font-bold text-[#EEEAF8] mb-2">
                              {domain.title}
                            </h4>

                            <p className="text-xs text-[#EEEAF8]/80 leading-relaxed mb-4">
                              {domain.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#EEEAF8]/15">
                            {domain.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 py-0.5 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[10px] font-mono text-[#EEEAF8]"
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
            /* Active Live Openings */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openInternships.map((internship, idx) => (
                <GridStaggerItem key={internship._id || internship.slug} index={idx}>
                  <div className="glass-card rounded-2xl p-7 h-full flex flex-col justify-between bg-[#2B2A6B]/95 text-[#EEEAF8] border border-[#EEEAF8]/20 hover:border-[#d4a373]/50 transition-all shadow-xl group">
                    <div className="space-y-4">
                      {/* Top status */}
                      <div className="flex items-center justify-between border-b border-[#EEEAF8]/15 pb-3">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#d4a373] px-2.5 py-0.5 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/20">
                          {internship.status.toUpperCase()}
                        </span>
                        <span className="text-xs font-mono text-[#EEEAF8]/70">
                          {internship.duration}
                        </span>
                      </div>

                      <h3 className="text-xl font-display font-bold text-[#EEEAF8] leading-snug group-hover:text-white transition-colors">
                        {internship.title}
                      </h3>

                      <p className="text-xs text-[#EEEAF8]/80 leading-relaxed line-clamp-3">
                        {internship.shortDescription}
                      </p>

                      <div className="p-3.5 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 space-y-1.5 text-xs">
                        <div className="flex items-center gap-2 text-[#EEEAF8]/85">
                          <MapPin className="w-3.5 h-3.5 text-[#d4a373]" />
                          <span><strong className="text-white">Mode:</strong> {internship.mode}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#EEEAF8]/85">
                          <Award className="w-3.5 h-3.5 text-[#d4a373]" />
                          <span><strong className="text-white">Stipend:</strong> {internship.stipend}</span>
                        </div>
                      </div>

                      {internship.skills && internship.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {internship.skills.slice(0, 3).map((skill) => (
                            <span key={skill} className="px-2.5 py-0.5 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[10px] font-mono text-[#EEEAF8]">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#EEEAF8]/15 flex items-center justify-between gap-2">
                      <Link
                        href={`/internships/${internship.slug}`}
                        className="text-xs font-semibold text-[#EEEAF8]/80 hover:text-[#d4a373] transition-colors"
                      >
                        View Details
                      </Link>

                      <Link
                        href={`/internships/${internship.slug}/apply`}
                        className="px-5 py-2.5 rounded-full font-bold text-xs glass-btn-primary flex items-center gap-1.5 transition-all shadow-md"
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
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

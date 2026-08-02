"use client";

import React, { useState } from "react";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { 
  GraduationCap, 
  Briefcase, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Bot, 
  Code2, 
  Smartphone, 
  LineChart, 
  Palette, 
  Cloud, 
  Zap, 
  Send,
  Calendar,
  Building,
  Check
} from "lucide-react";

const WHY_INTERN = [
  {
    title: "Live Production Projects",
    desc: "Work on real enterprise applications, AI pipelines, and client solutions deployed in production.",
    icon: Briefcase,
  },
  {
    title: "1-on-1 Senior Mentorship",
    desc: "Direct guidance from Founder Prashanth S and senior lead developers in Guindy, Chennai.",
    icon: Users,
  },
  {
    title: "Modern AI & Tech Stack",
    desc: "Gain hands-on experience in Next.js, Python LLMs, React Native, AWS Docker, and automation.",
    icon: Bot,
  },
  {
    title: "Official Certification & LOR",
    desc: "Receive a verified Internship Certificate and Letter of Recommendation based on performance.",
    icon: Award,
  },
  {
    title: "Flexible Tenure (2–6 Months)",
    desc: "Custom duration options designed to align smoothly with your college semester guidelines.",
    icon: Calendar,
  },
  {
    title: "Remote / Hybrid / On-site",
    desc: "Choose between flexible remote execution, hybrid work, or on-site experience in Chennai.",
    icon: Building,
  },
];

const DOMAINS = [
  { name: "AI & Machine Learning", desc: "LLMs, RAG, Chatbots, PyTorch & OpenCV", icon: Bot },
  { name: "Web Development (Full Stack)", desc: "Next.js 14, React, TypeScript & Tailwind CSS", icon: Code2 },
  { name: "Mobile App Development", desc: "Flutter, React Native & Native Android/iOS", icon: Smartphone },
  { name: "Data Science & Analytics", desc: "Data pipelines, predictive analytics & SQL", icon: LineChart },
  { name: "UI/UX Design & Research", desc: "Figma wireframing, design systems & prototyping", icon: Palette },
  { name: "DevOps & Cloud Systems", desc: "AWS, Docker, CI/CD pipelines & Linux admin", icon: Cloud },
  { name: "Business Automation & AI Agents", desc: "n8n, Zapier, WhatsApp CRM & Python bots", icon: Zap },
];

const STEPS = [
  { num: 1, title: "Submit Form", desc: "Fill out the online internship enquiry form below." },
  { num: 2, title: "Screening Call", desc: "Short 15-min call with our engineering lead to discuss your goals." },
  { num: 3, title: "Practical Task", desc: "Small hands-on assignment matching your domain interest." },
  { num: 4, title: "Offer & Onboarding", desc: "Official internship offer letter and team onboarding." },
];

const COURSE_OPTIONS = [
  "AI & Machine Learning",
  "Web Development (Full Stack)",
  "Mobile App Development (React Native / Flutter)",
  "Data Science & Analytics",
  "UI/UX Design",
  "DevOps & Cloud",
  "Business Automation & AI Agents",
  "Other (specify in message)",
];

export default function InternshipsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    college: "",
    year: "",
    course: COURSE_OPTIONS[0],
    domain: DOMAINS[0].name,
    duration: "3–4 months",
    mode: "Hybrid",
    message: "",
  });

  const [redirecting, setRedirecting] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setRedirecting(true);

    const messageText = `Hi SparkIntellect, I'm interested in an internship.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nEducation: ${formData.education}\nCollege: ${formData.college}\nYear of Study: ${formData.year}\nCourse: ${formData.course}\nDomain: ${formData.domain}\nDuration: ${formData.duration}\nMode: ${formData.mode}\nMessage: ${formData.message}`;

    const whatsappUrl = `https://wa.me/918977177634?text=${encodeURIComponent(messageText)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setRedirecting(false);
    }, 800);
  };

  const scrollToForm = () => {
    const el = document.getElementById("apply-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
            Build Real Production Experience at{" "}
            <span className="text-gradient-navy italic">SparkIntellect</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#334155] max-w-3xl mx-auto leading-relaxed mb-8">
            Gain hands-on real-world experience in Artificial Intelligence, Full-Stack Web Development, Mobile Engineering, Cloud Infrastructure, and Business Automation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-lg shadow-[#9FCFFB]/30 hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Apply for Internship</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:+918977177634`}
              className="px-8 py-4 rounded-full font-semibold text-sm bg-[#F2F9FF] text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-all"
            >
              Contact Internship Desk
            </a>
          </div>
        </SectionWrapper>

        {/* WHY INTERN WITH US */}
        <SectionWrapper className="bg-[#F2F9FF] py-20 border-y border-[#BEE0FF] mb-20">
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
                    <div className="luxury-card luxury-card-hover p-7 rounded-2xl border border-[#BEE0FF] h-full flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center mb-5 text-[#0B1220]">
                          <Icon className="w-6 h-6 text-[#0284c7]" />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-[#0B1220] mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#334155] leading-relaxed">
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

        {/* AVAILABLE DOMAINS */}
        <SectionWrapper className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <SectionHeading
            badge="Specialization Tracks"
            title="Available Internship"
            highlightTitle="Domains"
            subtitle="Select your preferred technology track to work alongside senior developers and architects."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOMAINS.map((domain, idx) => {
              const Icon = domain.icon;
              return (
                <GridStaggerItem key={domain.name} index={idx}>
                  <div className="luxury-card luxury-card-hover p-6 rounded-2xl border border-[#BEE0FF] space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#0284c7]" />
                      </div>
                      <h3 className="text-base font-bold text-[#0B1220]">{domain.name}</h3>
                    </div>
                    <p className="text-xs text-[#334155] leading-relaxed">{domain.desc}</p>
                    <button
                      onClick={() => {
                        setFormData({ ...formData, domain: domain.name, course: domain.name });
                        scrollToForm();
                      }}
                      className="text-xs font-semibold text-[#0284c7] hover:underline flex items-center gap-1"
                    >
                      <span>Select Track & Apply</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </GridStaggerItem>
              );
            })}
          </div>
        </SectionWrapper>

        {/* HOW IT WORKS PROCESS */}
        <SectionWrapper className="bg-[#F2F9FF] py-20 border-y border-[#BEE0FF] mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Hiring Process"
              title="4 Simple Steps to"
              highlightTitle="Join Our Team"
              subtitle="From application to offer letter, our onboarding process is transparent and fast-paced."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((step, idx) => (
                <GridStaggerItem key={step.num} index={idx}>
                  <div className="bg-white p-6 rounded-2xl border border-[#BEE0FF] shadow-sm relative space-y-3">
                    <div className="w-10 h-10 rounded-full bg-[#9FCFFB] text-[#0B1220] font-mono font-bold flex items-center justify-center text-sm">
                      0{step.num}
                    </div>
                    <h3 className="text-base font-bold text-[#0B1220]">{step.title}</h3>
                    <p className="text-xs text-[#334155] leading-relaxed">{step.desc}</p>
                  </div>
                </GridStaggerItem>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ENQUIRY / APPLICATION FORM */}
        <SectionWrapper id="apply-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="luxury-card p-8 sm:p-12 rounded-3xl border border-[#BEE0FF] shadow-xl">
            <div className="text-center mb-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D6EBFF] text-[#0B1220]">
                <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Internship Application Form</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-[#0B1220]">
                Apply for Your Internship Track
              </h2>
              <p className="text-sm text-[#334155]">
                Complete your details below to send an instant pre-filled application directly to our WhatsApp recruitment desk.
              </p>
            </div>

            <form onSubmit={handleApply} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Sundaram"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ananya@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                    Phone / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                    Current Degree / Education
                  </label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    placeholder="e.g. B.E Computer Science / B.Tech IT"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                    College / University Name
                  </label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="e.g. Anna University, Guindy"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                    Year of Study / Graduation Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g. 3rd Year (Passing 2026)"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                    Interested Course <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value, domain: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                  >
                    {COURSE_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                    Preferred Internship Domain
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                  >
                    {DOMAINS.map((d) => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                    Duration Preference
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                  >
                    <option value="1–2 months">1–2 months</option>
                    <option value="3–4 months">3–4 months</option>
                    <option value="5–6 months">5–6 months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                    Work Mode Preference
                  </label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site (Guindy, Chennai)">On-site (Guindy, Chennai)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                  Message / Why do you want to intern at SparkIntellect?
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a brief note about your interest, GitHub profile link, or key skills..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={redirecting}
                className="w-full py-4 rounded-xl font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-lg shadow-[#9FCFFB]/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                {redirecting ? (
                  <span>Formatting & Redirecting to WhatsApp...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit & Apply via WhatsApp (+91 8977177634)</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-[#334155]">
                Clicking apply will open WhatsApp with your pre-filled application for instant processing.
              </p>
            </form>
          </div>
        </SectionWrapper>

      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

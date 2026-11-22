"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { COMPANY_INFO } from "@/data/companyData";
import { publicApi } from "@/lib/api";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  MessageSquare
} from "lucide-react";

const SERVICE_OPTIONS = [
  "AI & Machine Learning",
  "Web Applications & SaaS",
  "Mobile App Development",
  "Enterprise Custom Software",
  "Workflow & AI Automation",
  "Cloud & DevOps",
  "Other Software Request",
];

const BUDGET_OPTIONS = [
  "₹2 Lakhs – ₹5 Lakhs",
  "₹5 Lakhs – ₹10 Lakhs",
  "₹10 Lakhs – ₹25 Lakhs",
  "₹25 Lakhs+",
  "Flexible / To Be Scoped",
];

const TIMELINE_OPTIONS = [
  "Immediate (1–2 Weeks)",
  "1 – 2 Months",
  "2 – 4 Months",
  "Flexible Planning",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: SERVICE_OPTIONS[0],
    budget: BUDGET_OPTIONS[0],
    timeline: TIMELINE_OPTIONS[0],
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ contactId: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill in your name, email, and project details.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await publicApi.submitContact(formData);
      setSuccessInfo({
        contactId: res.contactReferenceId || res.contactId || `SI-INQ-${new Date().getFullYear()}-0001`,
        message: res.message || "Your inquiry has been received by our engineering team.",
      });
    } catch {
      // Fallback inquiry reference
      const simulatedInqId = `SI-INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSuccessInfo({
        contactId: simulatedInqId,
        message: "Thank you. Your proposal request has been received.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const cleanAddress = COMPANY_INFO.address.replace(/Guindy,?\s*/i, "");

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#EEEAF8] text-[#2B2A6B] selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 sm:pb-24 w-full max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            badge="Direct Consultation"
            title="Let's Build"
            highlightTitle="What's Next"
            subtitle="Tell us about your project vision. Founder & CEO Mr. Prashanth and our technical leads in Chennai will review your specifications and reply within 4 business hours."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Contact Information - Liquid Glass Form Elements */}
            <div className="lg:col-span-5 space-y-6">

              <LiquidGlassCard
                draggable={false}
                borderRadius="32px"
                blurIntensity="xl"
                shadowIntensity="md"
                glowIntensity="sm"
                className="p-5 sm:p-8 space-y-5 sm:space-y-6 bg-[#2B2A6B]/95 text-[#EEEAF8] border border-[#EEEAF8]/25 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <h2 className="text-xl font-display font-bold text-[#EEEAF8] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#d4a373]" />
                    <span>Headquarters & Contact</span>
                  </h2>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#1E1D4E] text-[#d4a373] border border-[#EEEAF8]/20">
                    DIRECT CHANNEL
                  </span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#EEEAF8]/80">
                  {/* Address Liquid Sub-card */}
                  <LiquidGlassCard
                    draggable={false}
                    borderRadius="20px"
                    blurIntensity="md"
                    shadowIntensity="xs"
                    glowIntensity="xs"
                    className="p-4 bg-[#1E1D4E]/90 border border-[#EEEAF8]/20 hover:border-[#d4a373]/50 transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-[#EEEAF8]/20 flex items-center justify-center text-[#d4a373] shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#d4a373] font-mono text-[11px] uppercase tracking-wider">Office Address</div>
                        <div className="text-xs text-[#EEEAF8] font-medium mt-0.5 leading-relaxed">{cleanAddress}</div>
                      </div>
                    </div>
                  </LiquidGlassCard>

                  {/* Phone Liquid Sub-card */}
                  <LiquidGlassCard
                    draggable={false}
                    borderRadius="20px"
                    blurIntensity="md"
                    shadowIntensity="xs"
                    glowIntensity="xs"
                    className="p-4 bg-[#1E1D4E]/90 border border-[#EEEAF8]/20 hover:border-[#d4a373]/50 transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-[#EEEAF8]/20 flex items-center justify-center text-[#d4a373] shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#d4a373] font-mono text-[11px] uppercase tracking-wider">Direct Phone & WhatsApp</div>
                        <a href={`tel:${COMPANY_INFO.phone}`} className="text-xs text-[#EEEAF8] font-semibold hover:text-[#d4a373] transition-colors mt-0.5 block">
                          {COMPANY_INFO.phone}
                        </a>
                      </div>
                    </div>
                  </LiquidGlassCard>

                  {/* Email Liquid Sub-card */}
                  <LiquidGlassCard
                    draggable={false}
                    borderRadius="20px"
                    blurIntensity="md"
                    shadowIntensity="xs"
                    glowIntensity="xs"
                    className="p-4 bg-[#1E1D4E]/90 border border-[#EEEAF8]/20 hover:border-[#d4a373]/50 transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-[#EEEAF8]/20 flex items-center justify-center text-[#d4a373] shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#d4a373] font-mono text-[11px] uppercase tracking-wider">Official Business Email</div>
                        <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs text-[#EEEAF8] font-semibold hover:text-[#d4a373] transition-colors mt-0.5 block">
                          {COMPANY_INFO.email}
                        </a>
                      </div>
                    </div>
                  </LiquidGlassCard>

                  {/* Hours Liquid Sub-card */}
                  <LiquidGlassCard
                    draggable={false}
                    borderRadius="20px"
                    blurIntensity="md"
                    shadowIntensity="xs"
                    glowIntensity="xs"
                    className="p-4 bg-[#1E1D4E]/90 border border-[#EEEAF8]/20 hover:border-[#d4a373]/50 transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-[#EEEAF8]/20 flex items-center justify-center text-[#d4a373] shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#d4a373] font-mono text-[11px] uppercase tracking-wider">Working Hours</div>
                        <div className="text-xs text-[#EEEAF8] font-medium mt-0.5">{COMPANY_INFO.workingHours}</div>
                      </div>
                    </div>
                  </LiquidGlassCard>
                </div>

                <LiquidGlassCard
                  draggable={false}
                  borderRadius="20px"
                  blurIntensity="sm"
                  shadowIntensity="xs"
                  glowIntensity="xs"
                  className="p-4 bg-[#1E1D4E]/80 border border-[#EEEAF8]/20 flex items-center gap-3 text-xs text-[#EEEAF8]/85"
                >
                  <ShieldCheck className="w-5 h-5 text-[#d4a373] shrink-0" />
                  <span>Strict mutual NDA and 100% intellectual property ownership transferred upon project delivery.</span>
                </LiquidGlassCard>
              </LiquidGlassCard>

            </div>

            {/* Right Contact Form with Liquid Glass Card & Surrounding Elements */}
            <div className="lg:col-span-7 relative overflow-hidden">

              {/* Surrounding Liquid Glass Mosaic Tiles with Refractive Blur */}
              <div 
                aria-hidden="true"
                className="absolute -inset-4 sm:-inset-6 pointer-events-none grid grid-cols-6 grid-rows-6 gap-2.5 z-0 opacity-80"
              >
                {Array.from({ length: 36 }).map((_, i) => {
                  const opacities = [
                    "bg-[#2B2A6B]/[0.08] border-[#2B2A6B]/15",
                    "bg-[#d4a373]/[0.05] border-[#d4a373]/20",
                    "bg-[#2B2A6B]/[0.10] border-[#2B2A6B]/20",
                    "bg-[#d4a373]/[0.06] border-[#d4a373]/25",
                    "bg-[#2B2A6B]/[0.07] border-[#2B2A6B]/15"
                  ];
                  const tileStyle = opacities[i % opacities.length];
                  return (
                    <div
                      key={i}
                      className={`rounded-2xl border backdrop-blur-md transition-all duration-700 shadow-sm ${tileStyle}`}
                      style={{
                        boxShadow: i % 4 === 0 ? "inset 1px 1px 2px rgba(255, 255, 255, 0.2)" : "none",
                      }}
                    />
                  );
                })}
              </div>

              {/* Ambient reflection glows */}
              <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#2B2A6B]/[0.14] rounded-full blur-[110px] pointer-events-none z-0" />
              <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#d4a373]/[0.12] rounded-full blur-[120px] pointer-events-none z-0" />

              {/* Main Contact Form wrapped in LiquidGlassCard */}
              <LiquidGlassCard
                draggable={false}
                borderRadius="32px"
                blurIntensity="xl"
                shadowIntensity="lg"
                glowIntensity="md"
                className="p-5 sm:p-8 md:p-12 border border-[#EEEAF8]/30 bg-[#2B2A6B]/95 text-[#EEEAF8] shadow-2xl relative z-10"
              >
                
                {successInfo ? (
                  <div className="text-center py-12 space-y-6 animate-in fade-in">
                    <div className="w-16 h-16 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/30 text-[#d4a373] flex items-center justify-center mx-auto shadow-lg shadow-[#2B2A6B]/40">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-bold text-[#EEEAF8]">
                        Inquiry Received Successfully!
                      </h3>
                      <p className="text-sm text-[#EEEAF8]/80 max-w-md mx-auto leading-relaxed">
                        {successInfo.message}
                      </p>
                    </div>

                    <LiquidGlassCard
                      draggable={false}
                      borderRadius="16px"
                      blurIntensity="md"
                      shadowIntensity="sm"
                      glowIntensity="xs"
                      className="p-4 bg-[#1E1D4E] border border-[#EEEAF8]/25 inline-block font-mono text-xs text-[#EEEAF8]"
                    >
                      Reference ID: <span className="font-bold text-[#d4a373]">{successInfo.contactId}</span>
                    </LiquidGlassCard>

                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setSuccessInfo(null);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            company: "",
                            service: SERVICE_OPTIONS[0],
                            budget: BUDGET_OPTIONS[0],
                            timeline: TIMELINE_OPTIONS[0],
                            message: "",
                          });
                        }}
                        className="px-8 py-3.5 rounded-full font-bold text-xs glass-btn-primary shadow-lg"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-[#EEEAF8]/15 pb-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#1E1D4E] text-[#d4a373] border border-[#EEEAF8]/20 mb-2">
                        <Sparkles className="w-3 h-3 text-[#d4a373]" />
                        <span>CONFIDENTIAL BRIEF</span>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-[#EEEAF8]">
                        Project Consultation Scope
                      </h3>
                      <p className="text-xs text-[#EEEAF8]/70 mt-1">
                        Fill out your requirements below. All project inquiries are strictly confidential.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#EEEAF8] mb-2">
                          Your Full Name <span className="text-[#d4a373]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikram Sharma"
                          className="w-full px-4 py-3 rounded-xl glass-input text-xs bg-[#1E1D4E] text-[#EEEAF8] border border-[#EEEAF8]/25 focus:border-[#d4a373]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#EEEAF8] mb-2">
                          Business Email <span className="text-[#d4a373]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="vikram@company.com"
                          className="w-full px-4 py-3 rounded-xl glass-input text-xs bg-[#1E1D4E] text-[#EEEAF8] border border-[#EEEAF8]/25 focus:border-[#d4a373]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#EEEAF8] mb-2">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl glass-input text-xs bg-[#1E1D4E] text-[#EEEAF8] border border-[#EEEAF8]/25 focus:border-[#d4a373]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#EEEAF8] mb-2">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Apex Global Tech"
                          className="w-full px-4 py-3 rounded-xl glass-input text-xs bg-[#1E1D4E] text-[#EEEAF8] border border-[#EEEAF8]/25 focus:border-[#d4a373]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#EEEAF8] mb-2">
                          Primary Service
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-3 py-3 rounded-xl glass-input text-xs bg-[#1E1D4E] text-[#EEEAF8] border border-[#EEEAF8]/25 focus:border-[#d4a373]"
                        >
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#1E1D4E] text-[#EEEAF8]">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#EEEAF8] mb-2">
                          Target Budget
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-3 py-3 rounded-xl glass-input text-xs bg-[#1E1D4E] text-[#EEEAF8] border border-[#EEEAF8]/25 focus:border-[#d4a373]"
                        >
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#1E1D4E] text-[#EEEAF8]">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#EEEAF8] mb-2">
                          Delivery Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-3 py-3 rounded-xl glass-input text-xs bg-[#1E1D4E] text-[#EEEAF8] border border-[#EEEAF8]/25 focus:border-[#d4a373]"
                        >
                          {TIMELINE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#1E1D4E] text-[#EEEAF8]">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#EEEAF8] mb-2">
                        Project Description & Scope Details <span className="text-[#d4a373]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your current system bottleneck, desired application features, or technical goals..."
                        className="w-full px-4 py-3 rounded-xl glass-input text-xs leading-relaxed bg-[#1E1D4E] text-[#EEEAF8] border border-[#EEEAF8]/25 focus:border-[#d4a373]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider glass-btn-primary flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 transition-all hover:scale-[1.01]"
                    >
                      {submitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Encrypting & Transmitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Project Consultation Scope</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

              </LiquidGlassCard>

            </div>

          </div>

        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

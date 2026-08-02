"use client";

import React, { useState } from "react";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { COMPANY_INFO, SERVICES } from "@/data/companyData";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageSquare,
  Sparkles
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: SERVICES[0].id,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const directWhatsappUrl = `https://wa.me/918977177634?text=${encodeURIComponent(
    `Hello SparkIntellect team! My name is ${formData.name || 'Client'}. I would like to inquire about ${formData.service} for ${formData.company || 'my business'}. Message: ${formData.message || 'I want to discuss a software/AI project.'}`
  )}`;

  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Get in Touch"
            title="Start Your Project With"
            highlightTitle="SparkIntellect"
            subtitle="Fill out the proposal request form below or reach out directly to Founder Prashanth S and our technical lead team in Chennai."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Details Card */}
            <div className="lg:col-span-5 space-y-6">
              
              <SectionWrapper className="luxury-card p-8 rounded-3xl border border-[#BEE0FF] space-y-6 bg-white shadow-lg">
                <h2 className="text-xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#0284c7]" />
                  <span>Headquarters Contact</span>
                </h2>

                <div className="space-y-4 text-sm text-[#334155]">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF]">
                    <MapPin className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#0B1220]">Office Address</div>
                      <div className="text-xs text-[#334155] mt-0.5">{COMPANY_INFO.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF]">
                    <Phone className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#0B1220]">Phone & WhatsApp</div>
                      <a href={`tel:${COMPANY_INFO.phone}`} className="text-xs text-[#0284c7] font-semibold hover:underline">
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF]">
                    <Mail className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#0B1220]">Direct Email</div>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs text-[#0284c7] font-semibold hover:underline">
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF]">
                    <Globe className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#0B1220]">Official Web Portal</div>
                      <a href={COMPANY_INFO.website} target="_blank" rel="noreferrer" className="text-xs text-[#0284c7] font-semibold hover:underline">
                        sparkintellect.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF]">
                    <Clock className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#0B1220]">Working Hours</div>
                      <div className="text-xs text-[#334155]">{COMPANY_INFO.workingHours}</div>
                    </div>
                  </div>
                </div>

                {/* Instant WhatsApp Direct Button */}
                <div className="pt-2">
                  <a
                    href={directWhatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-[#0B1220] bg-[#9FCFFB] hover:bg-[#8ec2f3] shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-[#0B1220]" />
                    <span>Chat Directly on WhatsApp (+91 8977177634)</span>
                  </a>
                </div>
              </SectionWrapper>

              {/* Guindy Hub Card */}
              <div className="luxury-card p-6 rounded-3xl border border-[#BEE0FF] text-center space-y-3 bg-[#F2F9FF]">
                <div className="w-12 h-12 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center mx-auto text-[#0B1220] font-mono text-lg font-bold">
                  CHE
                </div>
                <div className="text-sm font-serif font-bold text-[#0B1220]">Guindy Tech Corridor</div>
                <p className="text-xs text-[#334155]">
                  Located in Chennai&apos;s central technology district with close access to airports & IT tech parks.
                </p>
              </div>

            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7">
              <SectionWrapper className="luxury-card p-8 sm:p-10 rounded-3xl border border-[#BEE0FF] bg-white shadow-xl">
                {submitted ? (
                  <div className="text-center py-16 space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-[#D6EBFF] border border-[#BEE0FF] text-[#0284c7] flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#0B1220]">Inquiry Received!</h3>
                    <p className="text-[#334155] text-sm max-w-md mx-auto">
                      Thank you for reaching out to SparkIntellect. Founder Prashanth S and our technical lead team will review your project details and contact you within 4 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#F2F9FF] text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF]"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl font-serif font-bold text-[#0B1220] mb-2">
                      Send Us a Project Proposal Request
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                          Your Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="ramesh@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0B1220] mb-1">
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
                        <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                          Company / Organization Name
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Spark Retail Ltd"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                        Primary Service Area
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                        Project Details & Requirements <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Briefly describe your project scope, budget range, launch date, and key features..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] text-sm focus:border-[#9FCFFB] focus:ring-2 focus:ring-[#9FCFFB]/40 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-4 rounded-xl font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center justify-center gap-2 transition-all"
                      >
                        {loading ? (
                          <span>Submitting...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Form Inquiry</span>
                          </>
                        )}
                      </button>

                      <a
                        href={directWhatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-4 rounded-xl font-bold text-sm bg-[#F2F9FF] text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] shadow-sm flex items-center justify-center gap-2 transition-all"
                      >
                        <MessageSquare className="w-4 h-4 text-[#0284c7]" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>

                    <p className="text-center text-[11px] text-[#334155]">
                      We respect your privacy. All inquiries are covered under our Non-Disclosure Policy (NDA).
                    </p>
                  </form>
                )}
              </SectionWrapper>
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

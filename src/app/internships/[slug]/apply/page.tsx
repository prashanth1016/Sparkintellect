"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { publicApi } from "@/lib/api";
import { InternshipItem } from "@/data/companyData";
import {
  GraduationCap,
  Send,
  CheckCircle2,
  UploadCloud,
  FileText,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function DynamicInternshipApplyPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const [internship, setInternship] = useState<InternshipItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{ applicationId: string; message: string } | null>(null);

  // Form field answers state
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const item = await publicApi.getInternshipBySlug(slug);
        if (item && item.published) {
          setInternship(item);
          // Initialize defaults
          const initAnswers: Record<string, string> = {};
          (item.applicationFields || []).forEach((f) => {
            if (f.type === "select" && f.options && f.options.length > 0) {
              initAnswers[f.name] = f.options[0];
            } else {
              initAnswers[f.name] = "";
            }
          });
          setAnswers(initAnswers);
        } else {
          setInternship(null);
        }
      } catch {
        setInternship(null);
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      loadData();
    }
  }, [slug]);

  const handleInputChange = (name: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Resume file size must be less than 5MB.");
      return;
    }

    // Check extension
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowed.includes(ext)) {
      setErrorMsg("Only PDF, DOC, and DOCX files are allowed.");
      return;
    }

    setErrorMsg(null);
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!internship) return;

    if (internship.status !== "open" || !internship.published) {
      setErrorMsg("Applications for this internship track are currently closed.");
      return;
    }

    // Validate required fields
    for (const field of internship.applicationFields || []) {
      if (field.required) {
        if (field.type === "file") {
          if (!selectedFile) {
            setErrorMsg(`Please upload your resume (${field.label}).`);
            return;
          }
        } else if (!answers[field.name] || answers[field.name].trim() === "") {
          setErrorMsg(`Please fill out the required field: ${field.label}`);
          return;
        }
      }
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("internshipId", internship._id || internship.id || internship.slug);
      formData.append("internshipSlug", internship.slug);
      formData.append("internshipTitle", internship.title);
      formData.append("answers", JSON.stringify(answers));

      if (selectedFile) {
        formData.append("resume", selectedFile);
      }

      const res = await publicApi.submitInternshipApplication(
        internship._id || internship.id || internship.slug,
        formData
      );

      setSuccessResult({
        applicationId: res.applicationReferenceId || res.applicationId || "Application Received",
        message: res.message || "Your application has been successfully submitted and stored.",
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit application. Please check your inputs and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEEAF8] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#2B2A6B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-[#2B2A6B]/70">Loading Application Form...</p>
        </div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-[#EEEAF8] flex items-center justify-center p-4">
        <div className="glass-panel p-10 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] text-center space-y-4 max-w-md shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[#1E1D4E] text-[#d4a373] flex items-center justify-center mx-auto border border-[#EEEAF8]/20">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-display font-bold text-[#EEEAF8]">Internship Not Found</h2>
          <p className="text-xs text-[#EEEAF8]/80 leading-relaxed">
            The requested internship track could not be found or is no longer published.
          </p>
          <Link
            href="/internships"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full font-bold text-xs glass-btn-primary transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Internships</span>
          </Link>
        </div>
      </div>
    );
  }

  const isClosed = !internship.published || internship.status !== "open";

  return (
    <div className="relative min-h-screen bg-[#EEEAF8] text-[#2B2A6B] font-sans selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top back button */}
          <div className="mb-6">
            <Link
              href={`/internships/${internship.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B2A6B]/80 hover:text-[#2B2A6B] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {internship.title} Details</span>
            </Link>
          </div>

          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#EEEAF8]/25 bg-[#2B2A6B]/95 text-[#EEEAF8] shadow-2xl relative overflow-hidden">
            {/* Ambient Glow Orb */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#d4a373]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-8 space-y-2 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[#EEEAF8]">
                <GraduationCap className="w-3.5 h-3.5 text-[#d4a373]" />
                <span>Candidate Application Portal</span>
              </div>

              <h1 className="text-3xl font-display font-bold text-[#EEEAF8] tracking-tight">
                Apply for {internship.title}
              </h1>

              <p className="text-xs sm:text-sm text-[#EEEAF8]/80">
                Cohort: {internship.duration} • {internship.mode} • Chennai, India
              </p>
            </div>

            {/* If Closed */}
            {isClosed ? (
              <div className="p-8 rounded-2xl bg-[#1E1D4E] border border-[#EEEAF8]/20 text-center space-y-3 relative z-10">
                <AlertCircle className="w-10 h-10 text-[#d4a373] mx-auto" />
                <h3 className="text-lg font-display font-bold text-[#EEEAF8]">Applications Closed</h3>
                <p className="text-xs text-[#EEEAF8]/80 max-w-md mx-auto">
                  Applications for this internship track are currently closed. Please check other active domains or check back for the next cohort.
                </p>
                <Link
                  href="/internships"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs glass-btn-primary transition-all mt-2"
                >
                  <span>View All Open Tracks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : successResult ? (
              /* Success confirmation state */
              <div className="text-center py-10 space-y-5 animate-fadeIn relative z-10">
                <div className="w-16 h-16 rounded-full bg-[#1E1D4E] border border-[#EEEAF8]/30 text-[#d4a373] flex items-center justify-center mx-auto shadow-lg shadow-[#1E1D4E]/50">
                  <CheckCircle2 className="w-9 h-9 text-[#d4a373]" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-display font-bold text-[#EEEAF8]">
                    Application Submitted Successfully!
                  </h2>
                  <p className="text-xs text-[#EEEAF8]/80 max-w-md mx-auto">
                    {successResult.message} Your resume and responses have been securely recorded.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-card border border-[#EEEAF8]/20 bg-[#1E1D4E] inline-block text-left max-w-sm w-full space-y-1.5">
                  <div className="text-[10px] font-mono uppercase text-[#EEEAF8]/70">Application Reference ID:</div>
                  <div className="text-sm font-mono font-bold text-[#d4a373]">{successResult.applicationId}</div>
                  <div className="text-[11px] text-[#EEEAF8]/80 pt-1">
                    Our technical recruitment team will review your submission and contact you via email or phone.
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/internships"
                    className="px-6 py-2.5 rounded-xl font-semibold text-xs glass-card text-[#EEEAF8]/90 hover:border-[#d4a373]/50 transition-all"
                  >
                    Browse Other Tracks
                  </Link>
                  <Link
                    href="/"
                    className="px-6 py-2.5 rounded-xl font-bold text-xs glass-btn-primary transition-all"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              /* Dynamic Form Builder Renderer */
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Render Dynamic Fields from Database Schema */}
                <div className="space-y-4">
                  {internship.applicationFields
                    .sort((a, b) => a.order - b.order)
                    .map((field) => {
                      if (field.type === "file") {
                        return (
                          <div key={field.id || field.name} className="space-y-1.5">
                            <label className="block text-xs font-semibold text-[#EEEAF8]">
                              {field.label} {field.required && <span className="text-[#d4a373]">*</span>}
                            </label>
                            <div className="border-2 border-dashed border-[#EEEAF8]/20 hover:border-[#d4a373]/50 rounded-2xl p-6 text-center bg-[#1E1D4E]/60 hover:bg-[#1E1D4E] transition-colors relative">
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                required={field.required && !selectedFile}
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                                <UploadCloud className="w-8 h-8 text-[#d4a373]" />
                                {fileName ? (
                                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#EEEAF8]">
                                    <FileText className="w-4 h-4 text-[#d4a373]" />
                                    <span>{fileName}</span>
                                  </div>
                                ) : (
                                  <>
                                    <span className="text-xs font-semibold text-[#EEEAF8]">
                                      Click to upload or drag and drop your Resume
                                    </span>
                                    <span className="text-[10px] text-[#EEEAF8]/60">
                                      PDF, DOC, DOCX (Max size: 5MB)
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      if (field.type === "textarea") {
                        return (
                          <div key={field.id || field.name} className="space-y-1.5">
                            <label className="block text-xs font-semibold text-[#EEEAF8]">
                              {field.label} {field.required && <span className="text-[#d4a373]">*</span>}
                            </label>
                            <textarea
                              rows={3}
                              required={field.required}
                              value={answers[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              placeholder={field.placeholder || ""}
                              className="w-full px-4 py-3 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[#EEEAF8] text-xs focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373] focus:outline-none transition-colors placeholder-[#EEEAF8]/40"
                            />
                          </div>
                        );
                      }

                      if (field.type === "select") {
                        return (
                          <div key={field.id || field.name} className="space-y-1.5">
                            <label className="block text-xs font-semibold text-[#EEEAF8]">
                              {field.label} {field.required && <span className="text-[#d4a373]">*</span>}
                            </label>
                            <select
                              required={field.required}
                              value={answers[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[#EEEAF8] text-xs focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373] focus:outline-none transition-colors"
                            >
                              {field.options?.map((opt) => (
                                <option key={opt} value={opt} className="bg-[#1E1D4E] text-[#EEEAF8]">
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </div>
                        );
                      }

                      return (
                        <div key={field.id || field.name} className="space-y-1.5">
                          <label className="block text-xs font-semibold text-[#EEEAF8]">
                            {field.label} {field.required && <span className="text-[#d4a373]">*</span>}
                          </label>
                          <input
                            type={field.type}
                            required={field.required}
                            value={answers[field.name] || ""}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            placeholder={field.placeholder || ""}
                            className="w-full px-4 py-3 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/20 text-[#EEEAF8] text-xs focus:border-[#d4a373] focus:ring-1 focus:ring-[#d4a373] focus:outline-none transition-colors placeholder-[#EEEAF8]/40"
                          />
                        </div>
                      );
                    })}
                </div>

                {/* Cloudflare Turnstile note */}
                <div className="p-3 rounded-xl bg-[#1E1D4E] border border-[#EEEAF8]/15 flex items-center justify-between text-[11px] text-[#EEEAF8]/70">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#d4a373]" />
                    <span>Protected by Cloudflare Turnstile & Strict Rate Limiting</span>
                  </div>
                  <span className="font-mono text-[#d4a373] font-bold">SECURE</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl font-display font-bold text-sm tracking-wider uppercase glass-btn-primary flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#2B2A6B] border-t-transparent rounded-full animate-spin" />
                      <span>Validating & Uploading Resume...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Application Form</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-[#EEEAF8]/60">
                  By submitting, you confirm that the information provided is accurate and agree to SparkIntellect&apos;s privacy policy.
                </p>
              </form>
            )}

          </div>

        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

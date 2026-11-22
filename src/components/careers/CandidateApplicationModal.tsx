"use client";

import React, { useState } from "react";
import {
  X,
  User,
  GraduationCap,
  Briefcase,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  FileText,
  Sparkles
} from "lucide-react";
import { publicApi, CareerItem } from "@/lib/api";

interface CandidateApplicationModalProps {
  career: CareerItem | null;
  isOpen: boolean;
  onClose: () => void;
  availableCareers?: CareerItem[];
}

export const CandidateApplicationModal: React.FC<CandidateApplicationModalProps> = ({
  career,
  isOpen,
  onClose,
  availableCareers = [],
}) => {
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successReferenceId, setSuccessReferenceId] = useState<string | null>(null);

  // Form State
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    mobile: "",
    location: "Chennai",
  });

  const [academicInfo, setAcademicInfo] = useState({
    highestQualification: "B.Tech / B.E. (Computer Science)",
    institution: "",
    department: "Computer Science & Engineering",
    graduationYear: "2025",
  });

  const [professionalInfo, setProfessionalInfo] = useState({
    position: career?.title || "Full Stack Engineer",
    experienceLevel: career?.experience || "1–3 Years",
    skills: "React, Next.js, TypeScript, Node.js, Python",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Resume file size must be less than 5MB.");
      return;
    }

    const allowed = [".pdf", ".doc", ".docx"];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowed.includes(ext)) {
      setErrorMsg("Only PDF, DOC, and DOCX files are permitted.");
      return;
    }

    setErrorMsg(null);
    setSelectedFile(file);
    setFileName(file.name);
  };

  const validateStep = (currentStep: number): boolean => {
    setErrorMsg(null);
    if (currentStep === 1) {
      if (!personalInfo.fullName.trim() || !personalInfo.email.trim() || !personalInfo.mobile.trim()) {
        setErrorMsg("Please complete all required personal details.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email.trim())) {
        setErrorMsg("Please provide a valid email address.");
        return false;
      }
    } else if (currentStep === 2) {
      if (!academicInfo.institution.trim()) {
        setErrorMsg("Please provide your college or university name.");
        return false;
      }
    } else if (currentStep === 3) {
      if (!professionalInfo.position.trim() || !professionalInfo.skills.trim()) {
        setErrorMsg("Please provide the applying position and core skills.");
        return false;
      }
    } else if (currentStep === 4) {
      if (!selectedFile) {
        setErrorMsg("Please upload your updated resume document.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setErrorMsg(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!selectedFile) {
      setErrorMsg("Please upload your resume.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("careerId", career?._id || career?.id || "general");
      formData.append("careerSlug", career?.slug || "general");
      formData.append("careerTitle", professionalInfo.position || career?.title || "Engineering Role");
      formData.append("personalInfo", JSON.stringify(personalInfo));
      formData.append("academicInfo", JSON.stringify(academicInfo));
      formData.append(
        "professionalInfo",
        JSON.stringify({
          ...professionalInfo,
          skills: professionalInfo.skills.split(",").map((s) => s.trim()).filter(Boolean),
        })
      );
      formData.append("resume", selectedFile);

      const res = await publicApi.submitCareerApplication(formData);
      setSuccessReferenceId(res.applicationReferenceId || `SI-CAR-${new Date().getFullYear()}-0001`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Application submission failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const STEPS_CONFIG = [
    { num: 1, label: "Personal", icon: User },
    { num: 2, label: "Academic", icon: GraduationCap },
    { num: 3, label: "Experience", icon: Briefcase },
    { num: 4, label: "Resume", icon: UploadCloud },
    { num: 5, label: "Review", icon: FileText },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-[#d4a373]/30 bg-[#182019]/95 p-6 sm:p-8 text-[#fefae0] shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ccd5ae]/15 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d4a373]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#d4a373]">
                Candidate Application Pipeline
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#fefae0] mt-1">
              Apply for {career?.title || professionalInfo.position}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#faedcd]/80 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successReferenceId ? (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#ccd5ae]/20 border border-[#ccd5ae]/40 text-[#ccd5ae] flex items-center justify-center mx-auto shadow-lg shadow-[#ccd5ae]/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-display font-bold text-[#fefae0]">
                Application Received!
              </h3>
              <p className="text-xs sm:text-sm text-[#faedcd]/85 max-w-md mx-auto leading-relaxed">
                Your candidate profile and resume have been securely logged in our technical talent pipeline. Our engineering leads will review your portfolio.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#111412] border border-[#ccd5ae]/20 inline-block font-mono text-xs text-[#d4a373]">
              Application Reference: <span className="font-bold text-[#fefae0]">{successReferenceId}</span>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-full font-bold text-xs glass-btn-primary shadow-lg"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Step Progress Bar */}
            <div className="grid grid-cols-5 gap-2 mb-8 border-b border-[#ccd5ae]/15 pb-5">
              {STEPS_CONFIG.map((s) => {
                const Icon = s.icon;
                const isCurrent = step === s.num;
                const isDone = step > s.num;

                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => {
                      if (s.num < step) setStep(s.num);
                    }}
                    disabled={s.num > step}
                    className="flex flex-col items-center gap-1.5 focus:outline-none disabled:opacity-40"
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        isCurrent
                          ? "bg-[#d4a373] text-[#111412] font-bold shadow-md shadow-[#d4a373]/30"
                          : isDone
                          ? "bg-[#ccd5ae]/20 text-[#ccd5ae]"
                          : "bg-white/[0.04] text-[#faedcd]/50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-medium hidden sm:block text-[#faedcd]/70">
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* STEP 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4a373] font-mono">
                    Step 1 — Personal Information
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[#fefae0] mb-1.5">
                      Full Legal Name <span className="text-[#d4a373]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={personalInfo.fullName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                      placeholder="e.g. Arvind Raman"
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#fefae0] mb-1.5">
                        Email Address <span className="text-[#d4a373]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        placeholder="arvind@gmail.com"
                        className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#fefae0] mb-1.5">
                        Mobile Number <span className="text-[#d4a373]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={personalInfo.mobile}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, mobile: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#fefae0] mb-1.5">
                      Current Location / City
                    </label>
                    <input
                      type="text"
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                      placeholder="Chennai, India"
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Academic Information */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4a373] font-mono">
                    Step 2 — Academic Credentials
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[#fefae0] mb-1.5">
                      Highest Qualification <span className="text-[#d4a373]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={academicInfo.highestQualification}
                      onChange={(e) => setAcademicInfo({ ...academicInfo, highestQualification: e.target.value })}
                      placeholder="B.Tech, B.E., M.Tech, M.Sc, etc."
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#fefae0] mb-1.5">
                      College / Institution <span className="text-[#d4a373]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={academicInfo.institution}
                      onChange={(e) => setAcademicInfo({ ...academicInfo, institution: e.target.value })}
                      placeholder="e.g. Anna University, IIT Madras"
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#fefae0] mb-1.5">
                        Department / Major
                      </label>
                      <input
                        type="text"
                        value={academicInfo.department}
                        onChange={(e) => setAcademicInfo({ ...academicInfo, department: e.target.value })}
                        placeholder="Computer Science, IT, AI/DS"
                        className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#fefae0] mb-1.5">
                        Graduation Year
                      </label>
                      <input
                        type="text"
                        value={academicInfo.graduationYear}
                        onChange={(e) => setAcademicInfo({ ...academicInfo, graduationYear: e.target.value })}
                        placeholder="e.g. 2024, 2025"
                        className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Professional Experience */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4a373] font-mono">
                    Step 3 — Professional & Engineering Profile
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#fefae0] mb-1.5">
                        Applying Position <span className="text-[#d4a373]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={professionalInfo.position}
                        onChange={(e) => setProfessionalInfo({ ...professionalInfo, position: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#fefae0] mb-1.5">
                        Experience Level
                      </label>
                      <select
                        value={professionalInfo.experienceLevel}
                        onChange={(e) => setProfessionalInfo({ ...professionalInfo, experienceLevel: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-input text-xs bg-[#182019]"
                      >
                        <option value="Fresher (0–1 Year)">Fresher (0–1 Year)</option>
                        <option value="1–3 Years">1–3 Years</option>
                        <option value="3–5 Years">3–5 Years</option>
                        <option value="5+ Years Senior">5+ Years Senior</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#fefae0] mb-1.5">
                      Core Technical Skills (comma separated) <span className="text-[#d4a373]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={professionalInfo.skills}
                      onChange={(e) => setProfessionalInfo({ ...professionalInfo, skills: e.target.value })}
                      placeholder="React, Next.js, Node.js, Python, MongoDB"
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#fefae0] mb-1.5">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={professionalInfo.githubUrl}
                        onChange={(e) => setProfessionalInfo({ ...professionalInfo, githubUrl: e.target.value })}
                        placeholder="https://github.com/yourhandle"
                        className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#fefae0] mb-1.5">
                        LinkedIn / Portfolio URL
                      </label>
                      <input
                        type="url"
                        value={professionalInfo.linkedinUrl}
                        onChange={(e) => setProfessionalInfo({ ...professionalInfo, linkedinUrl: e.target.value })}
                        placeholder="https://linkedin.com/in/yourhandle"
                        className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Documents (Resume Upload) */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4a373] font-mono">
                    Step 4 — Resume Upload
                  </h3>

                  <div className="p-8 rounded-2xl border-2 border-dashed border-[#ccd5ae]/20 hover:border-[#d4a373]/50 bg-[#111412]/50 text-center space-y-4 transition-colors">
                    <UploadCloud className="w-12 h-12 text-[#d4a373] mx-auto" />
                    <div>
                      <p className="text-sm font-semibold text-[#fefae0]">
                        {fileName ? fileName : "Upload your resume (PDF, DOC, DOCX)"}
                      </p>
                      <p className="text-xs text-[#faedcd]/70 mt-1">Maximum allowed file size: 5MB</p>
                    </div>

                    <label className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold glass-btn-primary cursor-pointer shadow-md">
                      Browse Files
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 5: Review & Submit */}
              {step === 5 && (
                <div className="space-y-4 animate-in fade-in text-xs">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4a373] font-mono">
                    Step 5 — Review & Confirm Submission
                  </h3>

                  <div className="p-4 rounded-2xl bg-[#111412]/80 border border-[#ccd5ae]/20 space-y-2.5">
                    <div className="flex justify-between border-b border-[#ccd5ae]/10 pb-2">
                      <span className="text-[#faedcd]/70">Candidate:</span>
                      <span className="font-bold text-[#fefae0]">{personalInfo.fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#ccd5ae]/10 pb-2">
                      <span className="text-[#faedcd]/70">Email:</span>
                      <span className="font-bold text-[#fefae0]">{personalInfo.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#ccd5ae]/10 pb-2">
                      <span className="text-[#faedcd]/70">Role:</span>
                      <span className="font-bold text-[#d4a373]">{professionalInfo.position}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#ccd5ae]/10 pb-2">
                      <span className="text-[#faedcd]/70">Qualification:</span>
                      <span className="text-[#fefae0]">{academicInfo.highestQualification} ({academicInfo.institution})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#faedcd]/70">Resume:</span>
                      <span className="font-mono text-[#deb68a]">{fileName || "Selected"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#ccd5ae]/15">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold glass-btn-secondary flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold glass-btn-primary flex items-center gap-1.5 shadow-lg"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider glass-btn-primary flex items-center gap-2 shadow-xl disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Transmitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Confirm & Submit Application</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import { ApplicationItem, adminApi } from "@/lib/api";
import { 
  X, 
  Send, 
  Eye, 
  Edit3, 
  Calendar, 
  Clock, 
  Video, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  Link2,
  MapPin,
  Building
} from "lucide-react";
import Image from "next/image";

interface EmailComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: ApplicationItem | null;
  emailType: "shortlisted" | "accepted" | "rejected";
  onSuccess: () => void;
}

export const EmailComposerModal: React.FC<EmailComposerModalProps> = ({
  isOpen,
  onClose,
  application,
  emailType,
  onSuccess,
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Common fields
  const [subject, setSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");

  // Shortlisted specific fields
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewMode, setInterviewMode] = useState("Online");
  const [meetingLink, setMeetingLink] = useState("");
  const [interviewInstructions, setInterviewInstructions] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  // Accepted specific fields
  const [joiningDate, setJoiningDate] = useState("");
  const [joiningTime, setJoiningTime] = useState("");
  const [internshipDuration, setInternshipDuration] = useState("3 Months");
  const [joiningMode, setJoiningMode] = useState("Online");
  const [joiningLink, setJoiningLink] = useState("");
  const [onboardingInstructions, setOnboardingInstructions] = useState("");
  const [requiredDocuments, setRequiredDocuments] = useState("");

  // Rejected specific fields
  const [additionalMessage, setAdditionalMessage] = useState("");

  const candidateName = application?.answers?.fullName || application?.answers?.name || "Candidate";
  const candidateEmail = String(application?.answers?.email || "");
  const trackTitle = application?.internshipTitle || "Internship Program";
  const refId = application?.applicationReferenceId || application?._id || "";

  useEffect(() => {
    if (!application) return;

    setErrorMsg("");
    setSuccessMsg("");
    setIsPreview(false);

    if (emailType === "shortlisted") {
      setSubject("You've Been Shortlisted — SparkIntellect");
      setMessageBody(
        `We are pleased to inform you that your application for the ${trackTitle} opportunity at SparkIntellect has been shortlisted for the next stage.`
      );
      setInterviewMode("Online");
      setInterviewInstructions(
        "Please be ready with a stable internet connection, a quiet environment, and your laptop for a technical discussion."
      );
      setAdditionalDetails(
        "If you need to reschedule due to unavoidable circumstances, please reply to this email at least 24 hours in advance."
      );
    } else if (emailType === "accepted") {
      setSubject("Congratulations! You've Been Selected — SparkIntellect");
      setMessageBody(
        `Congratulations! We are delighted to inform you that you have been selected for the ${trackTitle} opportunity at SparkIntellect.`
      );
      setInternshipDuration("3 Months");
      setJoiningMode("Online");
      setOnboardingInstructions(
        "Please review your onboarding details and join the orientation session on your joining date."
      );
      setRequiredDocuments(
        "1. College ID Card / Letter of Recommendation\n2. Government Photo ID (Aadhaar / Passport)\n3. Updated Resume"
      );
      setAdditionalDetails(
        "Our team will reach out with your team assignment and onboarding access credentials prior to your start date."
      );
    } else if (emailType === "rejected") {
      setSubject("Update Regarding Your SparkIntellect Application");
      setMessageBody(
        `Thank you for taking the time to apply for the ${trackTitle} opportunity at SparkIntellect.\n\nAfter carefully reviewing your application, we regret to inform you that we will not be moving forward with your application for this opportunity.\n\nWe genuinely appreciate your interest in SparkIntellect and the time and effort you invested in the application process.\n\nThis decision does not diminish your skills or potential, and we encourage you to continue developing your abilities and exploring future opportunities that may be a good fit for you.`
      );
      setAdditionalMessage("");
    }
  }, [application, emailType, isOpen]);

  if (!isOpen || !application) return null;

  const handleSend = async () => {
    if (!subject.trim()) {
      setErrorMsg("Email subject cannot be empty.");
      return;
    }

    setIsSending(true);
    setErrorMsg("");

    try {
      let payload: any = {
        subject: subject.trim(),
        messageBody: messageBody.trim(),
      };

      if (emailType === "shortlisted") {
        payload = {
          ...payload,
          interviewDate: interviewDate.trim() || undefined,
          interviewTime: interviewTime.trim() || undefined,
          interviewMode: interviewMode.trim() || undefined,
          meetingLink: meetingLink.trim() || undefined,
          interviewInstructions: interviewInstructions.trim() || undefined,
          additionalDetails: additionalDetails.trim() || undefined,
        };
      } else if (emailType === "accepted") {
        payload = {
          ...payload,
          joiningDate: joiningDate.trim() || undefined,
          joiningTime: joiningTime.trim() || undefined,
          internshipDuration: internshipDuration.trim() || undefined,
          joiningMode: joiningMode.trim() || undefined,
          joiningLink: joiningLink.trim() || undefined,
          onboardingInstructions: onboardingInstructions.trim() || undefined,
          requiredDocuments: requiredDocuments.trim() || undefined,
          additionalDetails: additionalDetails.trim() || undefined,
        };
      } else if (emailType === "rejected") {
        payload = {
          ...payload,
          additionalMessage: additionalMessage.trim() || undefined,
        };
      }

      const res = await adminApi.sendApplicationEmail(application._id, emailType, payload);
      setSuccessMsg(res.message || "Email sent successfully!");

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1400);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send candidate email.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#BEE0FF] flex flex-col max-h-[90vh] overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#BEE0FF] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
              emailType === "shortlisted"
                ? "bg-[#D6EBFF] text-[#0284c7]"
                : emailType === "accepted"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0B1220] capitalize">
                {emailType === "shortlisted"
                  ? "Compose Shortlisted Email"
                  : emailType === "accepted"
                  ? "Compose Selection & Offer Email"
                  : "Compose Rejection Email"}
              </h3>
              <p className="text-[11px] text-[#334155]">
                Sent from <span className="font-semibold text-[#0B1220]">SparkIntellect &lt;no-reply@sparkintellect.in&gt;</span> • Reply-To: <span className="font-semibold text-[#0B1220]">info@sparkintellect.in</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isSending}
            className="p-2 rounded-xl text-[#334155] hover:bg-[#F2F9FF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Read-Only Candidate Information Banner */}
        <div className="bg-[#F2F9FF] px-6 py-3 border-b border-[#BEE0FF] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs shrink-0">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#334155]">Candidate</div>
            <div className="font-bold text-[#0B1220] truncate">{candidateName}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-[#334155]">Recipient Email</div>
            <div className="font-bold text-[#0284c7] truncate">{candidateEmail}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-[#334155]">Track</div>
            <div className="font-semibold text-[#0B1220] truncate">{trackTitle}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-[#334155]">Reference ID</div>
            <div className="font-mono font-bold text-[#0284c7] truncate">{refId}</div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Mode 1: Edit Mode */}
          {!isPreview ? (
            <div className="space-y-4">
              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-[#0B1220] mb-1">
                  Email Subject Line:
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#BEE0FF] text-xs font-semibold text-[#0B1220] focus:bg-white focus:outline-none"
                  placeholder="Enter email subject"
                />
              </div>

              {/* Shortlisted Fields */}
              {emailType === "shortlisted" && (
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#BEE0FF] space-y-3">
                  <div className="text-xs font-bold font-mono uppercase text-[#0284c7] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Interview Schedule & Details</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">Interview Date</label>
                      <input
                        type="text"
                        value={interviewDate}
                        onChange={(e) => setInterviewDate(e.target.value)}
                        placeholder="e.g. Sep 05, 2026"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">Interview Time</label>
                      <input
                        type="text"
                        value={interviewTime}
                        onChange={(e) => setInterviewTime(e.target.value)}
                        placeholder="e.g. 11:30 AM IST"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">Interview Mode</label>
                      <select
                        value={interviewMode}
                        onChange={(e) => setInterviewMode(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220]"
                      >
                        <option value="Online">Online (Google Meet / Zoom)</option>
                        <option value="Offline">Offline (Guindy Office, Chennai)</option>
                        <option value="Telephonic">Telephonic Screening</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#334155] mb-1">Meeting Link / Address</label>
                    <input
                      type="text"
                      value={meetingLink}
                      onChange={(e) => setMeetingLink(e.target.value)}
                      placeholder="https://meet.google.com/... or office address"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#334155] mb-1">Interview Instructions</label>
                    <textarea
                      rows={2}
                      value={interviewInstructions}
                      onChange={(e) => setInterviewInstructions(e.target.value)}
                      placeholder="Specific instructions for candidate..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220]"
                    />
                  </div>
                </div>
              )}

              {/* Accepted Fields */}
              {emailType === "accepted" && (
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#BEE0FF] space-y-3">
                  <div className="text-xs font-bold font-mono uppercase text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Joining & Onboarding Details</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">Joining Date</label>
                      <input
                        type="text"
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}
                        placeholder="e.g. Sep 15, 2026"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">Joining Time</label>
                      <input
                        type="text"
                        value={joiningTime}
                        onChange={(e) => setJoiningTime(e.target.value)}
                        placeholder="e.g. 09:30 AM IST"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">Internship Duration</label>
                      <input
                        type="text"
                        value={internshipDuration}
                        onChange={(e) => setInternshipDuration(e.target.value)}
                        placeholder="e.g. 3 Months"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">Joining Mode</label>
                      <select
                        value={joiningMode}
                        onChange={(e) => setJoiningMode(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220]"
                      >
                        <option value="Online">Online / Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Offline">On-Site (Chennai)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">Joining Link / Location</label>
                      <input
                        type="text"
                        value={joiningLink}
                        onChange={(e) => setJoiningLink(e.target.value)}
                        placeholder="https://meet.google.com/... or office room"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#334155] mb-1">Required Documents</label>
                    <textarea
                      rows={2}
                      value={requiredDocuments}
                      onChange={(e) => setRequiredDocuments(e.target.value)}
                      placeholder="Documents candidate needs to submit..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220]"
                    />
                  </div>
                </div>
              )}

              {/* Message Body */}
              <div>
                <label className="block text-xs font-bold text-[#0B1220] mb-1">
                  Editable Main Message:
                </label>
                <textarea
                  rows={4}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#BEE0FF] text-xs text-[#0B1220] focus:bg-white focus:outline-none"
                  placeholder="Compose message body..."
                />
              </div>

              {/* Additional Remarks */}
              {emailType === "rejected" ? (
                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                    Additional Feedback / Remarks (Optional):
                  </label>
                  <textarea
                    rows={2}
                    value={additionalMessage}
                    onChange={(e) => setAdditionalMessage(e.target.value)}
                    placeholder="Optional personalized remarks..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#BEE0FF] text-xs text-[#0B1220] focus:bg-white focus:outline-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                    Additional Instructions / Details (Optional):
                  </label>
                  <textarea
                    rows={2}
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    placeholder="Any other helpful notes..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#BEE0FF] text-xs text-[#0B1220] focus:bg-white focus:outline-none"
                  />
                </div>
              )}
            </div>
          ) : (
            /* Mode 2: Realistic Email Preview */
            <div className="border border-[#BEE0FF] rounded-2xl overflow-hidden bg-white shadow-sm">
              {/* Email Envelope Header */}
              <div className="bg-[#F8FAFC] p-4 border-b border-[#BEE0FF] space-y-1 text-xs">
                <div><span className="font-semibold text-[#334155]">From:</span> <span className="font-mono text-[#0B1220]">SparkIntellect &lt;no-reply@sparkintellect.in&gt;</span></div>
                <div><span className="font-semibold text-[#334155]">To:</span> <span className="font-mono text-[#0284c7]">{candidateName} &lt;{candidateEmail}&gt;</span></div>
                <div><span className="font-semibold text-[#334155]">Reply-To:</span> <span className="font-mono text-[#0B1220]">info@sparkintellect.in</span></div>
                <div><span className="font-semibold text-[#334155]">Subject:</span> <span className="font-bold text-[#0B1220]">{subject}</span></div>
              </div>

              {/* Realistic Email Render */}
              <div className="p-6 bg-[#F0F4F8]">
                <div className="max-w-[540px] mx-auto bg-white rounded-2xl border border-[#BEE0FF] overflow-hidden shadow-sm">
                  {/* Branded Header */}
                  <div className="bg-[#0B1220] p-5 text-center border-b-2 border-[#0284c7]">
                    <div className="flex items-center justify-center gap-3">
                      <Image
                        src="/logo.png"
                        alt="SparkIntellect"
                        width={36}
                        height={36}
                        className="rounded-lg border border-[#9FCFFB]/40"
                      />
                      <div className="text-left">
                        <div className="text-lg font-serif font-bold text-[#9FCFFB] leading-none">SparkIntellect</div>
                        <div className="text-[9px] uppercase tracking-widest text-[#E2E8F0] mt-1 font-mono">AI & Software Engineering Firm</div>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 text-xs text-[#334155] leading-relaxed">
                    <h4 className="font-bold text-[#0B1220] text-sm">Hi {candidateName},</h4>
                    
                    <p className="whitespace-pre-wrap">{messageBody}</p>

                    <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#BEE0FF] inline-block">
                      <span className="text-[10px] uppercase font-mono text-[#64748B] font-semibold">Application Reference: </span>
                      <span className="font-mono font-bold text-[#0284c7] text-xs">{refId}</span>
                    </div>

                    {/* Shortlisted Box */}
                    {emailType === "shortlisted" && (interviewDate || interviewTime || meetingLink) && (
                      <div className="p-4 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] border-l-4 border-l-[#0284c7] space-y-2">
                        <div className="text-[11px] font-bold uppercase text-[#0284c7] font-mono">Interview Schedule & Information</div>
                        <div className="space-y-1 text-xs">
                          {interviewDate && <div><span className="text-[#64748B]">Date:</span> <span className="font-semibold text-[#0B1220]">{interviewDate}</span></div>}
                          {interviewTime && <div><span className="text-[#64748B]">Time:</span> <span className="font-semibold text-[#0B1220]">{interviewTime}</span></div>}
                          {interviewMode && <div><span className="text-[#64748B]">Mode:</span> <span className="font-semibold text-[#0B1220]">{interviewMode}</span></div>}
                          {meetingLink && <div><span className="text-[#64748B]">Meeting Link:</span> <span className="font-mono text-[#0284c7] font-semibold">{meetingLink}</span></div>}
                        </div>
                      </div>
                    )}

                    {/* Accepted Box */}
                    {emailType === "accepted" && (joiningDate || joiningTime || joiningLink) && (
                      <div className="p-4 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] border-l-4 border-l-emerald-600 space-y-2">
                        <div className="text-[11px] font-bold uppercase text-emerald-700 font-mono">Joining & Onboarding Details</div>
                        <div className="space-y-1 text-xs">
                          {joiningDate && <div><span className="text-[#64748B]">Joining Date:</span> <span className="font-semibold text-[#0B1220]">{joiningDate}</span></div>}
                          {joiningTime && <div><span className="text-[#64748B]">Joining Time:</span> <span className="font-semibold text-[#0B1220]">{joiningTime}</span></div>}
                          {internshipDuration && <div><span className="text-[#64748B]">Duration:</span> <span className="font-semibold text-[#0B1220]">{internshipDuration}</span></div>}
                          {joiningMode && <div><span className="text-[#64748B]">Mode:</span> <span className="font-semibold text-[#0B1220]">{joiningMode}</span></div>}
                          {joiningLink && <div><span className="text-[#64748B]">Link:</span> <span className="font-mono text-[#0284c7] font-semibold">{joiningLink}</span></div>}
                        </div>
                      </div>
                    )}

                    {interviewInstructions && (
                      <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#BEE0FF]">
                        <div className="text-[10px] font-bold uppercase text-[#0B1220] mb-1">Interview Instructions</div>
                        <div className="whitespace-pre-wrap text-xs text-[#334155]">{interviewInstructions}</div>
                      </div>
                    )}

                    {onboardingInstructions && (
                      <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#BEE0FF]">
                        <div className="text-[10px] font-bold uppercase text-[#0B1220] mb-1">Onboarding Instructions</div>
                        <div className="whitespace-pre-wrap text-xs text-[#334155]">{onboardingInstructions}</div>
                      </div>
                    )}

                    {requiredDocuments && (
                      <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#BEE0FF]">
                        <div className="text-[10px] font-bold uppercase text-[#0B1220] mb-1">Required Documents</div>
                        <div className="whitespace-pre-wrap text-xs text-[#334155]">{requiredDocuments}</div>
                      </div>
                    )}

                    {additionalDetails && (
                      <p className="whitespace-pre-wrap text-xs text-[#64748B]">{additionalDetails}</p>
                    )}

                    {additionalMessage && (
                      <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#BEE0FF]">
                        <div className="text-[10px] font-bold uppercase text-[#0B1220] mb-1">Note from Recruitment Team</div>
                        <div className="whitespace-pre-wrap text-xs text-[#334155]">{additionalMessage}</div>
                      </div>
                    )}

                    <hr className="border-[#BEE0FF]" />

                    <div>
                      <strong>SparkIntellect Recruitment Team</strong><br />
                      <span className="text-[#0284c7]">info@sparkintellect.in</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-[#F8FAFC] p-3 text-center text-[10px] text-[#94A3B8] border-t border-[#BEE0FF]">
                    SparkIntellect • AI & Software Engineering • Chennai, India
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#F8FAFC] border-t border-[#BEE0FF] flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            disabled={isSending}
            className="px-4 py-2 rounded-xl border border-[#BEE0FF] bg-white text-[#0B1220] hover:bg-[#F2F9FF] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            {isPreview ? (
              <>
                <Edit3 className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Back to Edit</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Preview Email</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSending}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#334155] hover:bg-[#F2F9FF] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={isSending || Boolean(successMsg)}
              className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm flex items-center gap-2 transition-all disabled:opacity-50 ${
                emailType === "shortlisted"
                  ? "bg-[#0284c7] hover:bg-[#0369a1]"
                  : emailType === "accepted"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-rose-600 hover:bg-rose-700"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSending ? "Sending Email..." : "Send Email"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

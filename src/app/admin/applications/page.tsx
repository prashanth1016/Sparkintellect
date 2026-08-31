"use client";

import React, { useState, useEffect } from "react";
import { adminApi, ApplicationItem } from "@/lib/api";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  X, 
  ChevronLeft,
  ChevronRight,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Send,
  Sparkles,
  Clock
} from "lucide-react";
import { EmailComposerModal } from "@/components/admin/EmailComposerModal";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [internalNotes, setInternalNotes] = useState("");

  // Single Deletion State
  const [deletingApp, setDeletingApp] = useState<ApplicationItem | null>(null);
  const [isDeletingSingle, setIsDeletingSingle] = useState(false);

  // Bulk Track Deletion State
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [internshipsList, setInternshipsList] = useState<{ id: string; title: string; slug: string }[]>([]);
  const [selectedTrackSlug, setSelectedTrackSlug] = useState("");
  const [selectedTrackTitle, setSelectedTrackTitle] = useState("");
  const [trackCount, setTrackCount] = useState<number | null>(null);
  const [isCounting, setIsCounting] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState("");
  const [isDeletingBulk, setIsDeletingBulk] = useState(false);
  const [bulkSuccessMsg, setBulkSuccessMsg] = useState("");

  // Candidate Email Composition State
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerApp, setComposerApp] = useState<ApplicationItem | null>(null);
  const [composerType, setComposerType] = useState<"shortlisted" | "accepted" | "rejected">("shortlisted");
  const [resendConfirmTarget, setResendConfirmTarget] = useState<{
    app: ApplicationItem;
    type: "shortlisted" | "accepted" | "rejected";
  } | null>(null);

  useEffect(() => {
    loadApplications();
  }, [page, statusFilter]);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getApplications({
        page,
        limit: 15,
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: search.trim() ? search.trim() : undefined,
      });
      setApplications(res.applications);
      setTotal(res.total);
      
      // Update selectedApp if open
      if (selectedApp) {
        const updated = res.applications.find(a => a._id === selectedApp._id);
        if (updated) setSelectedApp(updated);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const loadInternshipsList = async () => {
    try {
      const list = await adminApi.getAdminInternships();
      setInternshipsList(list.map((item: any) => ({
        id: item._id || item.id,
        title: item.title,
        slug: item.slug
      })));
    } catch {
      const uniqueTracks = Array.from(new Set(applications.map(a => a.internshipSlug)));
      setInternshipsList(uniqueTracks.map(slug => {
        const found = applications.find(a => a.internshipSlug === slug);
        return {
          id: slug,
          slug: slug,
          title: found?.internshipTitle || slug
        };
      }));
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedApp) return;
    setUpdatingStatus(true);
    try {
      await adminApi.updateApplicationStatus(selectedApp._id, newStatus, internalNotes);
      setSelectedApp({ ...selectedApp, status: newStatus, notes: internalNotes });
      await loadApplications();
    } catch {
      alert("Failed to update application status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteSingle = async () => {
    if (!deletingApp) return;
    setIsDeletingSingle(true);
    try {
      await adminApi.deleteApplication(deletingApp._id);
      setDeletingApp(null);
      if (selectedApp && selectedApp._id === deletingApp._id) {
        setSelectedApp(null);
      }
      await loadApplications();
    } catch (err: any) {
      alert(err.message || "Failed to delete application.");
    } finally {
      setIsDeletingSingle(false);
    }
  };

  const handleSelectTrackForBulk = async (slug: string) => {
    setSelectedTrackSlug(slug);
    setConfirmDeleteText("");
    const matched = internshipsList.find(i => i.slug === slug);
    setSelectedTrackTitle(matched ? matched.title : slug);

    if (!slug) {
      setTrackCount(null);
      return;
    }

    setIsCounting(true);
    try {
      const count = await adminApi.getTrackApplicationCount(slug);
      setTrackCount(count);
    } catch {
      setTrackCount(0);
    } finally {
      setIsCounting(false);
    }
  };

  const handleDeleteBulk = async () => {
    if (!selectedTrackSlug || confirmDeleteText.trim() !== "DELETE") return;
    setIsDeletingBulk(true);
    try {
      const res = await adminApi.deleteTrackApplications(selectedTrackSlug);
      setBulkSuccessMsg(`Successfully deleted ${res.deletedCount} application(s) for this track.`);
      setTimeout(() => {
        setBulkModalOpen(false);
        setBulkSuccessMsg("");
        setSelectedTrackSlug("");
        setConfirmDeleteText("");
        setTrackCount(null);
      }, 1500);
      await loadApplications();
    } catch (err: any) {
      alert(err.message || "Failed to delete track applications.");
    } finally {
      setIsDeletingBulk(false);
    }
  };

  const initiateEmailComposition = (app: ApplicationItem, type: "shortlisted" | "accepted" | "rejected") => {
    const isSent = app.communication?.[type]?.sent;
    if (isSent) {
      setResendConfirmTarget({ app, type });
    } else {
      setComposerApp(app);
      setComposerType(type);
      setComposerOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#BEE0FF] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#0284c7]" />
            <span>Candidate Applications</span>
          </h1>
          <p className="text-xs text-[#334155] mt-1">
            Review candidate submissions, manage applicant statuses, trigger transactional emails, and sync Google Sheets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setBulkModalOpen(true);
              setConfirmDeleteText("");
              setBulkSuccessMsg("");
              setTrackCount(null);
              setSelectedTrackSlug("");
              loadInternshipsList();
            }}
            className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            title="Bulk Delete Applications by Track"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>Delete Track Applications</span>
          </button>

          <button
            onClick={loadApplications}
            className="p-2.5 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] hover:bg-[#F2F9FF] transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#BEE0FF] shadow-sm">
        <div className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-[#334155] absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadApplications()}
            placeholder="Search by candidate name, email, phone, reference ID, or track..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1 text-xs font-semibold text-[#334155] shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] focus:bg-white focus:outline-none w-full sm:w-auto"
          >
            <option value="all">All Submissions</option>
            <option value="pending">Pending Review</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="luxury-card rounded-2xl border border-[#BEE0FF] bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F2F9FF] border-b border-[#BEE0FF] text-[#334155] font-mono uppercase">
              <tr>
                <th className="p-4">Candidate & Reference ID</th>
                <th className="p-4">Internship Track</th>
                <th className="p-4">Applied Date</th>
                <th className="p-4">Candidate Email Status</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BEE0FF]/60 text-[#0B1220]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#334155]">
                    Loading candidate applications...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#334155]">
                    No candidate applications match the selected criteria.
                  </td>
                </tr>
              ) : (
                applications.map((app) => {
                  const answers = app.answers || {};
                  const candidateName = answers.fullName || answers.name || "Candidate";
                  const candidateEmail = answers.email || "No email";
                  const candidatePhone = answers.phone || answers.mobile || "—";

                  // Check email sent status for current state
                  const isShortlistedSent = app.communication?.shortlisted?.sent;
                  const isAcceptedSent = app.communication?.accepted?.sent;
                  const isRejectedSent = app.communication?.rejected?.sent;

                  return (
                    <tr key={app._id} className="hover:bg-[#F2F9FF]/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#0B1220]">{candidateName}</span>
                          {app.applicationReferenceId && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#D6EBFF] text-[#0284c7]">
                              {app.applicationReferenceId}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#334155]">{candidateEmail} • {candidatePhone}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-[#0B1220]">{app.internshipTitle}</div>
                        <div className="text-[10px] font-mono text-[#0284c7]">{app.internshipSlug}</div>
                      </td>
                      <td className="p-4 text-[#334155] font-mono">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        {app.status === "shortlisted" ? (
                          isShortlistedSent ? (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 flex items-center gap-1 w-fit">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Shortlisted Sent</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => initiateEmailComposition(app, "shortlisted")}
                              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#D6EBFF] text-[#0284c7] hover:bg-[#0284c7] hover:text-white transition-colors flex items-center gap-1"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Send Email</span>
                            </button>
                          )
                        ) : app.status === "accepted" ? (
                          isAcceptedSent ? (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Selection Sent</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => initiateEmailComposition(app, "accepted")}
                              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-700 hover:text-white transition-colors flex items-center gap-1"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Send Selection</span>
                            </button>
                          )
                        ) : app.status === "rejected" ? (
                          isRejectedSent ? (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 flex items-center gap-1 w-fit">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Rejection Sent</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => initiateEmailComposition(app, "rejected")}
                              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 hover:bg-rose-700 hover:text-white transition-colors flex items-center gap-1"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Send Rejection</span>
                            </button>
                          )
                        ) : (
                          <span className="text-[10px] font-mono text-[#64748B]">
                            Ack Sent
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                          app.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : app.status === "shortlisted"
                            ? "bg-blue-100 text-blue-800"
                            : app.status === "accepted"
                            ? "bg-emerald-100 text-emerald-800"
                            : app.status === "rejected"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-slate-100 text-slate-800"
                        }`}>
                          {app.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setInternalNotes(app.notes || "");
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#D6EBFF] text-[#0284c7] hover:bg-[#9FCFFB] font-bold text-xs transition-colors"
                          >
                            Review
                          </button>
                          <button
                            onClick={() => setDeletingApp(app)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-800 transition-colors border border-rose-200"
                            title="Delete Application"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#BEE0FF] flex items-center justify-between text-xs text-[#334155]">
          <div>
            Showing {applications.length} of {total} total applications
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="p-1.5 rounded-lg border border-[#BEE0FF] disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold">Page {page}</span>
            <button
              disabled={applications.length < 15}
              onClick={() => setPage(page + 1)}
              className="p-1.5 rounded-lg border border-[#BEE0FF] disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Review Drawer Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto p-6 sm:p-8 space-y-6 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#0284c7] uppercase">Application Review</span>
                <h2 className="text-xl font-serif font-bold text-[#0B1220]">
                  {selectedApp.answers?.fullName || "Candidate Profile"}
                </h2>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-[#334155] hover:bg-[#F2F9FF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Program Track Info */}
            <div className="p-4 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0B1220]">{selectedApp.internshipTitle}</span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#D6EBFF] text-[#0284c7] border border-[#BEE0FF]">
                  {selectedApp.applicationReferenceId || selectedApp._id}
                </span>
              </div>
              <div className="text-[11px] text-[#334155]">Submitted on {new Date(selectedApp.createdAt).toLocaleString()}</div>
            </div>

            {/* Candidate Email Communication Action Card */}
            {(selectedApp.status === "shortlisted" || selectedApp.status === "accepted" || selectedApp.status === "rejected") && (
              <div className={`p-5 rounded-2xl border transition-all ${
                selectedApp.status === "shortlisted"
                  ? "bg-[#F2F9FF] border-[#BEE0FF]"
                  : selectedApp.status === "accepted"
                  ? "bg-emerald-50/70 border-emerald-200"
                  : "bg-rose-50/70 border-rose-200"
              }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-xs font-bold font-mono uppercase flex items-center gap-1.5 text-[#0B1220]">
                      <Mail className="w-4 h-4 text-[#0284c7]" />
                      <span>
                        {selectedApp.status === "shortlisted"
                          ? "Shortlisted Interview Communication"
                          : selectedApp.status === "accepted"
                          ? "Selection & Offer Communication"
                          : "Rejection Communication"}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#334155]">
                      {selectedApp.status === "shortlisted"
                        ? "Compose and send structured interview schedule, meeting link, and candidate instructions via Resend."
                        : selectedApp.status === "accepted"
                        ? "Compose and send formal selection notice, joining date, onboarding instructions, and document requirements."
                        : "Send a polite, respectful application update notice to the candidate."}
                    </p>
                  </div>

                  {selectedApp.communication?.[selectedApp.status as "shortlisted" | "accepted" | "rejected"]?.sent ? (
                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Email Sent</span>
                      </span>
                      <div className="text-[10px] text-[#64748B] mt-0.5">
                        {new Date(selectedApp.communication[selectedApp.status as "shortlisted" | "accepted" | "rejected"]!.sentAt!).toLocaleDateString()}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                  <div className="text-[11px] text-[#64748B]">
                    Recipient: <span className="font-semibold text-[#0B1220]">{selectedApp.answers?.email || "—"}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => initiateEmailComposition(selectedApp, selectedApp.status as "shortlisted" | "accepted" | "rejected")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm flex items-center gap-1.5 transition-all ${
                      selectedApp.status === "shortlisted"
                        ? "bg-[#0284c7] hover:bg-[#0369a1]"
                        : selectedApp.status === "accepted"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-rose-600 hover:bg-rose-700"
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {selectedApp.communication?.[selectedApp.status as "shortlisted" | "accepted" | "rejected"]?.sent
                        ? "Resend Email"
                        : selectedApp.status === "shortlisted"
                        ? "Send Shortlisted Email"
                        : selectedApp.status === "accepted"
                        ? "Send Selection Email"
                        : "Send Rejection Email"}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Dynamic Question Responses */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase text-[#334155]">Submitted Responses</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(selectedApp.answers || {}).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#BEE0FF]">
                    <div className="text-[10px] font-mono text-[#334155] uppercase">{key}</div>
                    <div className="text-xs font-semibold text-[#0B1220] mt-0.5 break-words">
                      {String(val) || "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Access */}
            {selectedApp.resumeUrl && (
              <div className="p-4 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0B1220]">Uploaded Resume</div>
                  <div className="text-[10px] text-[#334155]">{selectedApp.resumeFileName || "Candidate_Resume.pdf"}</div>
                </div>
                <a
                  href={adminApi.getResumeDownloadUrl(selectedApp.resumeUrl || selectedApp._id)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl font-bold text-xs bg-white text-[#0284c7] hover:bg-[#9FCFFB] shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </a>
              </div>
            )}

            {/* Status & Review Controls */}
            <div className="space-y-3 pt-4 border-t border-[#BEE0FF]">
              <h3 className="text-xs font-mono font-bold uppercase text-[#334155]">Decision & Status</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {["pending", "reviewed", "shortlisted", "rejected", "accepted"].map((st) => (
                  <button
                    key={st}
                    disabled={updatingStatus}
                    onClick={() => handleStatusChange(st)}
                    className={`py-2 px-2.5 rounded-xl text-[11px] font-bold font-mono transition-all ${
                      selectedApp.status === st
                        ? "bg-[#0B1220] text-white shadow-md"
                        : "bg-[#F2F9FF] text-[#334155] border border-[#BEE0FF] hover:bg-[#D6EBFF]"
                    }`}
                  >
                    {st.toUpperCase()}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                  Internal Recruitment Notes
                </label>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Add evaluation comments, interview feedback..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
                <button
                  type="button"
                  disabled={updatingStatus}
                  onClick={() => handleStatusChange(selectedApp.status)}
                  className="mt-2 px-4 py-1.5 rounded-lg bg-[#9FCFFB] text-[#0B1220] font-bold text-xs shadow-sm"
                >
                  Save Internal Notes
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Single Application Delete Modal */}
      {deletingApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 space-y-5 animate-fadeIn">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0B1220]">Delete Application?</h3>
                <p className="text-xs text-[#334155]">This action cannot be undone.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2 text-xs">
              <div>
                <span className="font-mono text-[#334155] uppercase text-[10px]">Candidate:</span>
                <div className="font-bold text-[#0B1220] text-sm">
                  {deletingApp.answers?.fullName || deletingApp.answers?.name || "Candidate"}
                </div>
              </div>

              <div>
                <span className="font-mono text-[#334155] uppercase text-[10px]">Application Reference:</span>
                <div className="font-mono font-bold text-[#0284c7]">
                  {deletingApp.applicationReferenceId || deletingApp._id}
                </div>
              </div>

              <div>
                <span className="font-mono text-[#334155] uppercase text-[10px]">Track:</span>
                <div className="font-semibold text-[#0B1220]">
                  {deletingApp.internshipTitle}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#334155]">
              Permanently removes this candidate application from MongoDB, deletes any associated resume files, and cleans up the synchronized row from Google Sheets.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeletingSingle}
                onClick={() => setDeletingApp(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#334155] bg-[#F2F9FF] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeletingSingle}
                onClick={handleDeleteSingle}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
              >
                {isDeletingSingle ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Track Delete Modal */}
      {bulkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 space-y-5 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1220]">Delete Track Applications</h3>
                  <p className="text-xs text-[#334155]">Bulk cleanup seeded/test applications by track</p>
                </div>
              </div>
              <button
                onClick={() => setBulkModalOpen(false)}
                className="p-1.5 rounded-lg text-[#334155] hover:bg-[#F2F9FF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bulkSuccessMsg ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="font-bold text-sm text-emerald-900">{bulkSuccessMsg}</p>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Track Selector */}
                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                    Select Internship Track:
                  </label>
                  <select
                    value={selectedTrackSlug}
                    onChange={(e) => handleSelectTrackForBulk(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] focus:bg-white focus:outline-none"
                  >
                    <option value="">-- Choose a Track to Clean Up --</option>
                    {internshipsList.map((track) => (
                      <option key={track.slug} value={track.slug}>
                        {track.title} ({track.slug})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Track Count Preview */}
                {selectedTrackSlug && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-rose-900">Track:</span>
                      <span className="font-bold text-[#0B1220]">{selectedTrackTitle}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-rose-900">Applications found:</span>
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-rose-200 text-rose-900 text-xs">
                        {isCounting ? "Counting..." : trackCount ?? 0}
                      </span>
                    </div>

                    {trackCount === 0 && (
                      <p className="text-[11px] text-[#334155] pt-1">
                        No applications found for this track. Nothing to delete.
                      </p>
                    )}
                  </div>
                )}

                {/* Confirmation Input Guard */}
                {selectedTrackSlug && trackCount !== null && trackCount > 0 && (
                  <div className="space-y-2 pt-2 border-t border-rose-100">
                    <div className="text-xs text-rose-700 font-semibold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>This will permanently delete all {trackCount} applications and associated files from MongoDB and Google Sheets.</span>
                    </div>

                    <label className="block text-xs font-bold text-[#0B1220]">
                      To confirm, type <span className="font-mono font-black text-rose-600">DELETE</span> below:
                    </label>
                    <input
                      type="text"
                      value={confirmDeleteText}
                      onChange={(e) => setConfirmDeleteText(e.target.value)}
                      placeholder="Type DELETE"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-rose-300 text-xs font-mono font-bold text-[#0B1220] focus:outline-none focus:border-rose-600 uppercase"
                    />
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#BEE0FF]">
                  <button
                    type="button"
                    disabled={isDeletingBulk}
                    onClick={() => setBulkModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#334155] bg-[#F2F9FF] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={
                      !selectedTrackSlug ||
                      trackCount === 0 ||
                      confirmDeleteText.trim() !== "DELETE" ||
                      isDeletingBulk ||
                      isCounting
                    }
                    onClick={handleDeleteBulk}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-40 flex items-center gap-1.5"
                  >
                    {isDeletingBulk ? "Deleting Track Data..." : `Delete ${trackCount || 0} Applications`}
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* Resend Confirmation Dialog */}
      {resendConfirmTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#BEE0FF] space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3 text-[#0284c7]">
              <div className="w-10 h-10 rounded-2xl bg-[#D6EBFF] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#0284c7]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0B1220]">Resend Email Confirmation</h3>
                <p className="text-xs text-[#334155]">This candidate was previously sent an email.</p>
              </div>
            </div>

            <p className="text-xs text-[#334155] leading-relaxed">
              Are you sure you want to resend the <strong className="capitalize">{resendConfirmTarget.type}</strong> email to{" "}
              <strong className="text-[#0284c7]">{resendConfirmTarget.app.answers?.email || "the candidate"}</strong>?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setResendConfirmTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#334155] bg-[#F2F9FF] border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = resendConfirmTarget;
                  setResendConfirmTarget(null);
                  setComposerApp(target.app);
                  setComposerType(target.type);
                  setComposerOpen(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] transition-colors shadow-sm"
              >
                Proceed to Edit &amp; Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Composer & Preview Modal */}
      {composerOpen && composerApp && (
        <EmailComposerModal
          isOpen={composerOpen}
          onClose={() => setComposerOpen(false)}
          application={composerApp}
          emailType={composerType}
          onSuccess={loadApplications}
        />
      )}

    </div>
  );
}

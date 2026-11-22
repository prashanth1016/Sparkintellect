"use client";

import React, { useState, useEffect } from "react";
import { adminApi, CareerItem, CareerApplicationItem } from "@/lib/api";
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  MapPin, 
  FileText, 
  Download, 
  Users, 
  ExternalLink,
  Search,
  Filter
} from "lucide-react";

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<"postings" | "applications">("postings");
  
  // Postings state
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loadingCareers, setLoadingCareers] = useState(true);
  const [editingCareer, setEditingCareer] = useState<Partial<CareerItem> | null>(null);
  const [savingCareer, setSavingCareer] = useState(false);

  // Applications state
  const [applications, setApplications] = useState<CareerApplicationItem[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [selectedApp, setSelectedApp] = useState<CareerApplicationItem | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [appSearch, setAppSearch] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusNotes, setStatusNotes] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    loadCareers();
  }, []);

  useEffect(() => {
    if (activeTab === "applications") {
      loadApplications();
    }
  }, [activeTab, statusFilter]);

  const loadCareers = async () => {
    setLoadingCareers(true);
    try {
      const data = await adminApi.getAdminCareers();
      setCareers(data);
    } catch {
      // ignore
    } finally {
      setLoadingCareers(false);
    }
  };

  const loadApplications = async () => {
    setLoadingApps(true);
    try {
      const res = await adminApi.getCareerApplications({
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: appSearch || undefined,
      });
      setApplications(res.applications || []);
    } catch {
      // ignore
    } finally {
      setLoadingApps(false);
    }
  };

  const handleCreateNew = () => {
    setEditingCareer({
      title: "",
      slug: "",
      department: "Engineering",
      location: "Chennai (Hybrid)",
      type: "Full-Time",
      experience: "2–4 Years",
      shortDesc: "",
      description: "",
      responsibilities: ["Develop production-grade software", "Write clean, modular TypeScript & Python"],
      requirements: ["Strong foundation in web architecture", "Experience with relational/NoSQL databases"],
      benefits: ["Competitive compensation", "Health coverage", "Mentorship from senior architects"],
      status: "active",
    });
  };

  const handleSaveCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCareer) return;

    setSavingCareer(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (editingCareer._id) {
        await adminApi.updateCareer(editingCareer._id, editingCareer);
        setSuccessMsg("Career posting updated successfully.");
      } else {
        await adminApi.createCareer(editingCareer);
        setSuccessMsg("Career posting published successfully.");
      }
      setEditingCareer(null);
      await loadCareers();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to save career opening.");
      }
    } finally {
      setSavingCareer(false);
    }
  };

  const handleDeleteCareer = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await adminApi.deleteCareer(id);
      await loadCareers();
      setSuccessMsg("Job posting deleted.");
    } catch {
      alert("Failed to delete career posting.");
    }
  };

  const handleUpdateAppStatus = async (appId: string) => {
    if (!newStatus) return;
    setUpdatingStatus(true);
    try {
      await adminApi.updateCareerApplicationStatus(appId, {
        status: newStatus,
        notes: statusNotes,
      });
      setSuccessMsg("Candidate application status updated.");
      setSelectedApp(null);
      await loadApplications();
    } catch (err: unknown) {
      alert("Failed to update status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteApp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this candidate application?")) return;
    try {
      await adminApi.deleteCareerApplication(id);
      await loadApplications();
      setSuccessMsg("Application deleted.");
    } catch {
      alert("Failed to delete application.");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Tab Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#BEE0FF] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#0284c7]" />
            <span>Careers & Talent Management</span>
          </h1>
          <p className="text-xs text-[#334155] mt-1">
            Publish job openings and manage candidate talent profiles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Tab selector */}
          <div className="inline-flex rounded-xl p-1 bg-[#F2F9FF] border border-[#BEE0FF]">
            <button
              onClick={() => setActiveTab("postings")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "postings"
                  ? "bg-[#9FCFFB] text-[#0B1220] shadow-sm"
                  : "text-[#334155] hover:text-[#0B1220]"
              }`}
            >
              Job Openings ({careers.length})
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "applications"
                  ? "bg-[#9FCFFB] text-[#0B1220] shadow-sm"
                  : "text-[#334155] hover:text-[#0B1220]"
              }`}
            >
              Candidate Applications
            </button>
          </div>

          {activeTab === "postings" && (
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 rounded-xl font-bold text-xs bg-[#0284c7] text-white hover:bg-[#0369a1] shadow-md flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Job</span>
            </button>
          )}
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TAB 1: JOB OPENINGS CMS */}
      {activeTab === "postings" && (
        <div className="space-y-6">
          {/* Career Editor Modal */}
          {editingCareer && (
            <div className="luxury-card p-6 sm:p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-2xl space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-4">
                <h2 className="text-xl font-serif font-bold text-[#0B1220]">
                  {editingCareer._id ? "Edit Job Posting" : "Create New Job Opening"}
                </h2>
                <button
                  onClick={() => setEditingCareer(null)}
                  className="p-1 rounded-lg text-[#334155] hover:bg-[#F2F9FF]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveCareer} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1220] mb-1">Job Title *</label>
                    <input
                      type="text"
                      required
                      value={editingCareer.title || ""}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                        setEditingCareer({ ...editingCareer, title, slug: editingCareer.slug || slug });
                      }}
                      placeholder="e.g. Senior Full Stack AI Engineer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B1220] mb-1">URL Slug *</label>
                    <input
                      type="text"
                      required
                      value={editingCareer.slug || ""}
                      onChange={(e) => setEditingCareer({ ...editingCareer, slug: e.target.value })}
                      placeholder="e.g. senior-full-stack-ai-engineer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1220] mb-1">Department</label>
                    <input
                      type="text"
                      value={editingCareer.department || ""}
                      onChange={(e) => setEditingCareer({ ...editingCareer, department: e.target.value })}
                      placeholder="Engineering / Product"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B1220] mb-1">Location</label>
                    <input
                      type="text"
                      value={editingCareer.location || ""}
                      onChange={(e) => setEditingCareer({ ...editingCareer, location: e.target.value })}
                      placeholder="Chennai (Hybrid)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B1220] mb-1">Status</label>
                    <select
                      value={editingCareer.status || "active"}
                      onChange={(e) => setEditingCareer({ ...editingCareer, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                    >
                      <option value="active">Active (Accepting Resumes)</option>
                      <option value="closed">Closed</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1">Short Summary *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingCareer.shortDesc || ""}
                    onChange={(e) => setEditingCareer({ ...editingCareer, shortDesc: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1220] mb-1">Full Job Description</label>
                  <textarea
                    rows={4}
                    value={editingCareer.description || ""}
                    onChange={(e) => setEditingCareer({ ...editingCareer, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#BEE0FF]">
                  <button
                    type="button"
                    onClick={() => setEditingCareer(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#F2F9FF] text-[#334155] border border-[#BEE0FF]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingCareer}
                    className="px-7 py-2.5 rounded-xl font-bold text-xs bg-[#0284c7] text-white hover:bg-[#0369a1] shadow-md"
                  >
                    {savingCareer ? "Saving..." : "Save Job Opening"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Careers Table */}
          <div className="luxury-card rounded-2xl border border-[#BEE0FF] bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F2F9FF] border-b border-[#BEE0FF] text-[#334155] font-mono uppercase">
                  <tr>
                    <th className="p-4">Position Title</th>
                    <th className="p-4">Department & Experience</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#BEE0FF]/60 text-[#0B1220]">
                  {careers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-[#334155]">
                        No job postings yet.
                      </td>
                    </tr>
                  ) : (
                    careers.map((c) => (
                      <tr key={c._id || c.slug} className="hover:bg-[#F2F9FF]/50 transition-colors">
                        <td className="p-4 font-bold text-[#0B1220]">{c.title}</td>
                        <td className="p-4 text-[#334155]">{c.department} • {c.experience}</td>
                        <td className="p-4 text-[#334155]">{c.location}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                            c.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                          }`}>
                            {c.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingCareer(c)}
                              className="p-1.5 rounded-lg text-[#0284c7] hover:bg-[#D6EBFF]"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => c._id && handleDeleteCareer(c._id)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CANDIDATE APPLICATIONS */}
      {activeTab === "applications" && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#BEE0FF]">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-[#0284c7]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
              >
                <option value="all">All Application Statuses</option>
                <option value="new">New</option>
                <option value="under_review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview_scheduled">Interview Scheduled</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-72">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search candidate or ref ID..."
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && loadApplications()}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
                <Search className="w-3.5 h-3.5 text-[#334155] absolute left-2.5 top-3" />
              </div>
              <button
                onClick={loadApplications}
                className="px-4 py-2 rounded-xl bg-[#9FCFFB] text-[#0B1220] font-bold text-xs"
              >
                Search
              </button>
            </div>
          </div>

          {/* Applications Table */}
          <div className="luxury-card rounded-2xl border border-[#BEE0FF] bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F2F9FF] border-b border-[#BEE0FF] text-[#334155] font-mono uppercase">
                  <tr>
                    <th className="p-4">Reference & Date</th>
                    <th className="p-4">Candidate Details</th>
                    <th className="p-4">Position Applied</th>
                    <th className="p-4">Academic & Exp</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#BEE0FF]/60 text-[#0B1220]">
                  {loadingApps ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[#334155]">
                        <div className="w-6 h-6 border-2 border-[#0284c7] border-t-transparent rounded-full animate-spin mx-auto" />
                        <span className="text-xs mt-2 block">Loading candidate applications...</span>
                      </td>
                    </tr>
                  ) : applications.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[#334155]">
                        No candidate applications found matching the selected filter.
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr key={app._id} className="hover:bg-[#F2F9FF]/50 transition-colors">
                        <td className="p-4">
                          <span className="font-mono font-bold text-[#0284c7] block">
                            {app.applicationReferenceId}
                          </span>
                          <span className="text-[10px] text-[#334155]">
                            {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "Recent"}
                          </span>
                        </td>
                        <td className="p-4">
                          <strong className="text-[#0B1220] block">{app.personalInfo?.fullName || "Candidate"}</strong>
                          <span className="text-[11px] text-[#334155] block">{app.personalInfo?.email}</span>
                          <span className="text-[10px] text-[#334155]">{app.personalInfo?.mobile} • {app.personalInfo?.location}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-[#0B1220] block">
                            {app.careerTitle || app.professionalInfo?.position || "General Profile"}
                          </span>
                          <span className="text-[10px] font-mono text-[#334155]">
                            Exp: {app.professionalInfo?.experienceLevel || "Entry"}
                          </span>
                        </td>
                        <td className="p-4 text-[#334155]">
                          <span className="block font-medium text-[#0B1220]">
                            {app.academicInfo?.highestQualification} ({app.academicInfo?.graduationYear})
                          </span>
                          <span className="text-[10px] text-[#334155] block">
                            {app.academicInfo?.institution}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                            app.status === "selected" ? "bg-emerald-100 text-emerald-800" :
                            app.status === "shortlisted" ? "bg-blue-100 text-blue-800" :
                            app.status === "interview_scheduled" ? "bg-amber-100 text-amber-800" :
                            app.status === "rejected" ? "bg-rose-100 text-rose-800" :
                            "bg-slate-100 text-slate-700"
                          }`}>
                            {app.status ? app.status.replace("_", " ").toUpperCase() : "NEW"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {(app.resumeUrl || app.resumeFileName || app.resumeFileId) && (
                              <a
                                href={app.resumeUrl || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/admin/career-applications/${app._id}/resume`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50"
                                title="Download Resume"
                              >
                                <Download className="w-4 h-4" />
                              </a>
                            )}
                            <button
                              onClick={() => {
                                setSelectedApp(app);
                                setNewStatus(app.status || "new");
                                setStatusNotes(app.notes || "");
                              }}
                              className="p-1.5 rounded-lg text-[#0284c7] hover:bg-[#D6EBFF]"
                              title="Update Status & Notes"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteApp(app._id)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                              title="Delete Application"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Status Update Modal */}
          {selectedApp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
              <div className="luxury-card p-6 sm:p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-2xl space-y-4 max-w-lg w-full">
                <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-3">
                  <h3 className="text-lg font-serif font-bold text-[#0B1220]">
                    Manage Candidate Status
                  </h3>
                  <button onClick={() => setSelectedApp(null)} className="p-1 text-[#334155] hover:bg-[#F2F9FF] rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1 text-xs text-[#334155]">
                  <div><strong>Candidate:</strong> {selectedApp.personalInfo?.fullName}</div>
                  <div><strong>Email:</strong> {selectedApp.personalInfo?.email}</div>
                  <div><strong>Position:</strong> {selectedApp.careerTitle || selectedApp.professionalInfo?.position}</div>
                  <div><strong>Reference ID:</strong> <span className="font-mono text-[#0284c7]">{selectedApp.applicationReferenceId}</span></div>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1220] mb-1">Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                    >
                      <option value="new">New</option>
                      <option value="under_review">Under Review</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interview_scheduled">Interview Scheduled</option>
                      <option value="selected">Selected</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B1220] mb-1">Internal Review Notes</label>
                    <textarea
                      rows={3}
                      value={statusNotes}
                      onChange={(e) => setStatusNotes(e.target.value)}
                      placeholder="Add recruiter notes or evaluation feedback..."
                      className="w-full px-3 py-2 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#BEE0FF]">
                  <button
                    type="button"
                    onClick={() => setSelectedApp(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#F2F9FF] text-[#334155]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={updatingStatus}
                    onClick={() => handleUpdateAppStatus(selectedApp._id)}
                    className="px-6 py-2 rounded-xl font-bold text-xs bg-[#0284c7] text-white hover:bg-[#0369a1] shadow-md"
                  >
                    {updatingStatus ? "Saving..." : "Update Status"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
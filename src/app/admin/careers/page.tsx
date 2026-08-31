"use client";

import React, { useState, useEffect } from "react";
import { adminApi, CareerItem } from "@/lib/api";
import { Briefcase, Plus, Edit, Trash2, CheckCircle2, AlertCircle, X, MapPin } from "lucide-react";

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCareer, setEditingCareer] = useState<Partial<CareerItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getAdminCareers();
      setCareers(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingCareer({
      title: "",
      slug: "",
      department: "Engineering",
      location: "Guindy, Chennai (Hybrid)",
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCareer) return;

    setSaving(true);
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
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await adminApi.deleteCareer(id);
      await loadCareers();
    } catch {
      alert("Failed to delete career posting.");
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#BEE0FF] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#0284c7]" />
            <span>Careers & Job Postings CMS</span>
          </h1>
          <p className="text-xs text-[#334155] mt-1">
            Publish and manage full-time engineering and product design vacancies.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job Opening</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

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

          <form onSubmit={handleSave} className="space-y-4">
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
                  placeholder="Guindy, Chennai (Hybrid)"
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
                disabled={saving}
                className="px-7 py-2.5 rounded-xl font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md"
              >
                {saving ? "Saving..." : "Save Job Opening"}
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
                          onClick={() => c._id && handleDelete(c._id)}
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
  );
}

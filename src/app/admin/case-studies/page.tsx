"use client";

import React, { useState, useEffect } from "react";
import { adminApi, CaseStudyItem } from "@/lib/api";
import { Layers, Plus, Edit, Trash2, CheckCircle2, AlertCircle, X } from "lucide-react";

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<CaseStudyItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getAdminCaseStudies();
      setCaseStudies(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingItem({
      title: "",
      slug: "",
      client: "",
      industry: "Construction",
      service: "Enterprise ERP & Automation",
      summary: "",
      challenge: "",
      solution: "",
      results: ["Reduced manual entry by 75%", "Sub-second database latency"],
      techStack: ["Next.js", "Node.js", "MongoDB Atlas"],
      metrics: [{ label: "Time Saved", value: "70%" }],
      featured: true,
      order: 1
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (editingItem._id) {
        await adminApi.updateCaseStudy(editingItem._id, editingItem);
        setSuccessMsg("Case study updated successfully.");
      } else {
        await adminApi.createCaseStudy(editingItem);
        setSuccessMsg("Case study published successfully.");
      }
      setEditingItem(null);
      await loadCaseStudies();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to save case study.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    try {
      await adminApi.deleteCaseStudy(id);
      await loadCaseStudies();
    } catch {
      alert("Failed to delete case study.");
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#BEE0FF] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#0284c7]" />
            <span>Case Studies & Client Work CMS</span>
          </h1>
          <p className="text-xs text-[#334155] mt-1">
            Publish enterprise case studies, operational challenges, metrics, and architecture summaries.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Case Study</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Editor Modal */}
      {editingItem && (
        <div className="luxury-card p-6 sm:p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-4">
            <h2 className="text-xl font-serif font-bold text-[#0B1220]">
              {editingItem._id ? "Edit Case Study" : "Create New Case Study"}
            </h2>
            <button
              onClick={() => setEditingItem(null)}
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
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ""}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                    setEditingItem({ ...editingItem, title, slug: editingItem.slug || slug });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={editingItem.slug || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">Client / Project Name</label>
                <input
                  type="text"
                  value={editingItem.client || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">Industry</label>
                <input
                  type="text"
                  value={editingItem.industry || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, industry: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">Service Type</label>
                <input
                  type="text"
                  value={editingItem.service || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1220] mb-1">Summary *</label>
              <textarea
                rows={2}
                required
                value={editingItem.summary || ""}
                onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">Operational Challenge</label>
                <textarea
                  rows={3}
                  value={editingItem.challenge || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, challenge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">Engineered Solution</label>
                <textarea
                  rows={3}
                  value={editingItem.solution || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, solution: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#BEE0FF]">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#F2F9FF] text-[#334155] border border-[#BEE0FF]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-7 py-2.5 rounded-xl font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md"
              >
                {saving ? "Saving..." : "Save Case Study"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Case Studies Table */}
      <div className="luxury-card rounded-2xl border border-[#BEE0FF] bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F2F9FF] border-b border-[#BEE0FF] text-[#334155] font-mono uppercase">
              <tr>
                <th className="p-4">Case Study</th>
                <th className="p-4">Client & Industry</th>
                <th className="p-4">Service</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BEE0FF]/60 text-[#0B1220]">
              {caseStudies.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[#334155]">
                    No case studies created yet.
                  </td>
                </tr>
              ) : (
                caseStudies.map((cs) => (
                  <tr key={cs._id || cs.slug} className="hover:bg-[#F2F9FF]/50 transition-colors">
                    <td className="p-4 font-bold text-[#0B1220]">{cs.title}</td>
                    <td className="p-4 text-[#334155]">{cs.client} ({cs.industry})</td>
                    <td className="p-4 text-[#334155]">{cs.service}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingItem(cs)}
                          className="p-1.5 rounded-lg text-[#0284c7] hover:bg-[#D6EBFF]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => cs._id && handleDelete(cs._id)}
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

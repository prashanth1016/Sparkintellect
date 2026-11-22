"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { adminApi, InternshipItem } from "@/lib/api";
import {
  GraduationCap,
  Plus,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  Sparkles,
  Layers,
  MoveUp,
  MoveDown,
  AlertCircle,
  CheckCircle2,
  Settings2
} from "lucide-react";

export default function AdminInternshipsPage() {
  const [internships, setInternships] = useState<InternshipItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<InternshipItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    loadInternships();
  }, []);

  const loadInternships = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getAdminInternships();
      setInternships(data);
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
      shortDescription: "",
      fullDescription: "",
      duration: "3 Months",
      mode: "Hybrid (Chennai / Remote)",
      stipend: "Performance-Based / Competitive",
      location: "Chennai",
      eligibility: "B.E / B.Tech / MCA / BCA / M.Sc Students & Fresh Graduates",
      skills: ["React", "TypeScript", "Node.js", "AI Integration"],
      technologies: ["Next.js", "Python", "MongoDB", "Docker"],
      benefits: [
        "Live Production Client Software Experience",
        "Official Verified Certificate & Letter of Recommendation",
        "Fast-Track Pre-Placement Offer (PPO) Evaluation"
      ],
      status: "open",
      published: true,
      applicationFields: [
        { id: "f1", name: "fullName", label: "Full Name", type: "text", required: true, order: 1, placeholder: "e.g. Rahul Sharma" },
        { id: "f2", name: "email", label: "Email Address", type: "email", required: true, order: 2, placeholder: "rahul@college.edu" },
        { id: "f3", name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, order: 3, placeholder: "+91 98765 43210" },
        { id: "f4", name: "college", label: "College / University", type: "text", required: true, order: 4, placeholder: "e.g. Anna University" },
        { id: "f5", name: "degree", label: "Degree & Specialization", type: "text", required: true, order: 5, placeholder: "B.Tech Computer Science" },
        { id: "f6", name: "github", label: "GitHub Profile", type: "text", required: false, order: 6, placeholder: "https://github.com/username" },
        { id: "f7", name: "statement", label: "Why do you want to join this track?", type: "textarea", required: true, order: 7, placeholder: "Describe your technical passion and goals..." },
        { id: "f8", name: "resume", label: "Resume (PDF/DOCX)", type: "file", required: true, order: 8 }
      ]
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
        await adminApi.updateInternship(editingItem._id, editingItem);
        setSuccessMsg("Internship track updated successfully.");
      } else {
        await adminApi.createInternship(editingItem);
        setSuccessMsg("Internship track created successfully.");
      }
      setEditingItem(null);
      await loadInternships();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to save internship track.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete or archive this internship?")) return;
    try {
      await adminApi.deleteInternship(id);
      await loadInternships();
    } catch {
      alert("Failed to delete internship.");
    }
  };

  // Dynamic Form Field Builder helpers
  const addField = () => {
    if (!editingItem) return;
    const current = editingItem.applicationFields || [];
    const newField = {
      id: `f_${Date.now()}`,
      name: `field_${current.length + 1}`,
      label: `New Question ${current.length + 1}`,
      type: "text" as const,
      required: true,
      order: current.length + 1,
      placeholder: ""
    };
    setEditingItem({
      ...editingItem,
      applicationFields: [...current, newField]
    });
  };

  const removeField = (index: number) => {
    if (!editingItem) return;
    const current = [...(editingItem.applicationFields || [])];
    current.splice(index, 1);
    setEditingItem({ ...editingItem, applicationFields: current });
  };

  const updateFieldProp = (index: number, prop: string, val: any) => {
    if (!editingItem) return;
    const current = [...(editingItem.applicationFields || [])];
    current[index] = { ...current[index], [prop]: val };
    setEditingItem({ ...editingItem, applicationFields: current });
  };

  return (
    <div className="space-y-6">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#BEE0FF] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[#0284c7]" />
            <span>Internship Programs CMS</span>
          </h1>
          <p className="text-xs text-[#334155] mt-1">
            Create, edit, publish, and manage dynamic application form fields for all internship cohorts.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Internship Track</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Editor Modal / Drawer */}
      {editingItem && (
        <div className="luxury-card p-6 sm:p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-4">
            <h2 className="text-xl font-serif font-bold text-[#0B1220]">
              {editingItem._id ? "Edit Internship Track" : "New Internship Track"}
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

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                  Internship Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ""}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                    setEditingItem({ ...editingItem, title, slug: editingItem.slug || slug });
                  }}
                  placeholder="e.g. AI & Machine Learning Engineering Intern"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.slug || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                  placeholder="e.g. ai-machine-learning"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={editingItem.duration || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                  placeholder="3 to 6 Months"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                  Mode
                </label>
                <input
                  type="text"
                  value={editingItem.mode || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, mode: e.target.value })}
                  placeholder="Hybrid (Chennai / Remote)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                  Status
                </label>
                <select
                  value={editingItem.status || "open"}
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                >
                  <option value="open">Open (Accepting Applications)</option>
                  <option value="closed">Closed (Applications Ended)</option>
                  <option value="draft">Draft (Not Visible to Public)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                Short Overview Summary *
              </label>
              <textarea
                rows={2}
                required
                value={editingItem.shortDescription || ""}
                onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
                placeholder="Brief summary shown on cards..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                Full Description & Syllabus
              </label>
              <textarea
                rows={4}
                value={editingItem.fullDescription || ""}
                onChange={(e) => setEditingItem({ ...editingItem, fullDescription: e.target.value })}
                placeholder="Detailed curriculum, live project scope..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
              />
            </div>

            {/* DYNAMIC APPLICATION FORM FIELD BUILDER */}
            <div className="p-6 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#0B1220] flex items-center gap-1.5">
                    <Settings2 className="w-4 h-4 text-[#0284c7]" />
                    <span>Dynamic Candidate Form Builder</span>
                  </h3>
                  <p className="text-[11px] text-[#334155]">
                    Customize the fields rendered on the public application page for this track.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addField}
                  className="px-3 py-1.5 rounded-xl bg-[#9FCFFB] text-[#0B1220] font-bold text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Question Field</span>
                </button>
              </div>

              <div className="space-y-3">
                {editingItem.applicationFields?.map((field, fIdx) => (
                  <div key={field.id || fIdx} className="p-3.5 rounded-xl bg-white border border-[#BEE0FF] flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateFieldProp(fIdx, "label", e.target.value)}
                        placeholder="Question Label"
                        className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#BEE0FF] text-xs text-[#0B1220]"
                      />
                      <input
                        type="text"
                        value={field.name}
                        onChange={(e) => updateFieldProp(fIdx, "name", e.target.value)}
                        placeholder="Database Key"
                        className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#BEE0FF] text-xs font-mono text-[#0B1220]"
                      />
                      <select
                        value={field.type}
                        onChange={(e) => updateFieldProp(fIdx, "type", e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#BEE0FF] text-xs text-[#0B1220]"
                      >
                        <option value="text">Single-line Text</option>
                        <option value="email">Email Address</option>
                        <option value="tel">Phone / WhatsApp</option>
                        <option value="textarea">Multi-line Paragraph</option>
                        <option value="file">File / Resume Upload</option>
                        <option value="select">Dropdown Select</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <label className="flex items-center gap-1 text-xs text-[#334155] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => updateFieldProp(fIdx, "required", e.target.checked)}
                          className="rounded border-[#BEE0FF] text-[#0284c7]"
                        />
                        <span>Required</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => removeField(fIdx)}
                        className="text-rose-600 hover:text-rose-800 p-1"
                        title="Remove Field"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
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
                {saving ? "Saving Changes..." : "Save Internship Track"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Internships Table */}
      <div className="luxury-card rounded-2xl border border-[#BEE0FF] bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F2F9FF] border-b border-[#BEE0FF] text-[#334155] font-mono uppercase">
              <tr>
                <th className="p-4">Internship Track</th>
                <th className="p-4">Duration & Mode</th>
                <th className="p-4">Form Fields</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BEE0FF]/60 text-[#0B1220]">
              {internships.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#334155]">
                    No internship tracks created yet. Click &quot;Create New Internship Track&quot; above.
                  </td>
                </tr>
              ) : (
                internships.map((item) => (
                  <tr key={item._id || item.slug} className="hover:bg-[#F2F9FF]/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-[#0B1220]">{item.title}</div>
                      <div className="text-[11px] font-mono text-[#0284c7]">{item.slug}</div>
                    </td>
                    <td className="p-4 text-[#334155]">
                      <div>{item.duration}</div>
                      <div className="text-[11px]">{item.mode}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#D6EBFF] text-[#0284c7] font-mono font-semibold text-[11px]">
                        {item.applicationFields?.length || 0} Dynamic Fields
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${item.status === "open"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.status === "closed"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/internships/${item.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-[#334155] hover:bg-[#D6EBFF] hover:text-[#0B1220]"
                          title="Preview Public Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-1.5 rounded-lg text-[#0284c7] hover:bg-[#D6EBFF]"
                          title="Edit Track"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => item._id && handleDelete(item._id)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                          title="Delete Track"
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

"use client";

import React, { useState, useEffect } from "react";
import { adminApi, FAQItem } from "@/lib/api";
import { HelpCircle, Plus, Edit, Trash2, CheckCircle2, AlertCircle, X } from "lucide-react";

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getAdminFAQs();
      setFaqs(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingFaq({
      question: "",
      answer: "",
      category: "general",
      order: faqs.length + 1,
      published: true
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (editingFaq._id) {
        await adminApi.updateFAQ(editingFaq._id, editingFaq);
        setSuccessMsg("FAQ updated successfully.");
      } else {
        await adminApi.createFAQ(editingFaq);
        setSuccessMsg("FAQ created successfully.");
      }
      setEditingFaq(null);
      await loadFaqs();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to save FAQ.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ item?")) return;
    try {
      await adminApi.deleteFAQ(id);
      await loadFaqs();
    } catch {
      alert("Failed to delete FAQ.");
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#BEE0FF] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#0284c7]" />
            <span>Frequently Asked Questions CMS</span>
          </h1>
          <p className="text-xs text-[#334155] mt-1">
            Manage global and service-specific FAQ items.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Editor Modal */}
      {editingFaq && (
        <div className="luxury-card p-6 sm:p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-4">
            <h2 className="text-xl font-serif font-bold text-[#0B1220]">
              {editingFaq._id ? "Edit FAQ" : "New FAQ Item"}
            </h2>
            <button
              onClick={() => setEditingFaq(null)}
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
            <div>
              <label className="block text-xs font-semibold text-[#0B1220] mb-1">Question *</label>
              <input
                type="text"
                required
                value={editingFaq.question || ""}
                onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">Category</label>
                <select
                  value={editingFaq.category || "general"}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                >
                  <option value="general">General Company</option>
                  <option value="services">Engineering Services</option>
                  <option value="internships">Internship Programs</option>
                  <option value="support">SLA & Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingFaq.order || 1}
                  onChange={(e) => setEditingFaq({ ...editingFaq, order: parseInt(e.target.value, 10) || 1 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1220] mb-1">Answer *</label>
              <textarea
                rows={4}
                required
                value={editingFaq.answer || ""}
                onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#BEE0FF]">
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#F2F9FF] text-[#334155] border border-[#BEE0FF]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-7 py-2.5 rounded-xl font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md"
              >
                {saving ? "Saving..." : "Save FAQ"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FAQs Table */}
      <div className="luxury-card rounded-2xl border border-[#BEE0FF] bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F2F9FF] border-b border-[#BEE0FF] text-[#334155] font-mono uppercase">
              <tr>
                <th className="p-4">Question</th>
                <th className="p-4">Category</th>
                <th className="p-4">Answer Preview</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BEE0FF]/60 text-[#0B1220]">
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[#334155]">
                    No FAQs added yet.
                  </td>
                </tr>
              ) : (
                faqs.map((f) => (
                  <tr key={f._id || f.question} className="hover:bg-[#F2F9FF]/50 transition-colors">
                    <td className="p-4 font-bold text-[#0B1220] max-w-xs">{f.question}</td>
                    <td className="p-4 font-mono text-[#0284c7]">{f.category}</td>
                    <td className="p-4 text-[#334155] max-w-sm truncate">{f.answer}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingFaq(f)}
                          className="p-1.5 rounded-lg text-[#0284c7] hover:bg-[#D6EBFF]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => f._id && handleDelete(f._id)}
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

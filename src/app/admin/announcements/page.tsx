"use client";

import React, { useState, useEffect } from "react";
import { adminApi, AnnouncementItem } from "@/lib/api";
import { Bell, Plus, Edit, Trash2, CheckCircle2, AlertCircle, X } from "lucide-react";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<AnnouncementItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getAdminAnnouncements();
      setAnnouncements(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingItem({
      title: "",
      content: "",
      link: "/internships",
      type: "info",
      active: true,
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
        await adminApi.updateAnnouncement(editingItem._id, editingItem);
        setSuccessMsg("Announcement banner updated successfully.");
      } else {
        await adminApi.createAnnouncement(editingItem);
        setSuccessMsg("Announcement banner published successfully.");
      }
      setEditingItem(null);
      await loadAnnouncements();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to save announcement.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement banner?")) return;
    try {
      await adminApi.deleteAnnouncement(id);
      await loadAnnouncements();
    } catch {
      alert("Failed to delete announcement.");
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#BEE0FF] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#0284c7]" />
            <span>Top Bar Announcements CMS</span>
          </h1>
          <p className="text-xs text-[#334155] mt-1">
            Publish site-wide header alerts, new cohort notifications, and webinar alerts.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
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
              {editingItem._id ? "Edit Announcement" : "New Announcement Alert"}
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
            <div>
              <label className="block text-xs font-semibold text-[#0B1220] mb-1">Title / Headline *</label>
              <input
                type="text"
                required
                value={editingItem.title || ""}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                placeholder="e.g. Q4 2026 AI Engineering Internship Applications Open!"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">Target Link</label>
                <input
                  type="text"
                  value={editingItem.link || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                  placeholder="/internships"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">Banner Style</label>
                <select
                  value={editingItem.type || "info"}
                  onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                >
                  <option value="info">Information (Blue)</option>
                  <option value="success">Highlight (Emerald)</option>
                  <option value="warning">Urgent / Deadline (Amber)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1220] mb-1">Content / Message</label>
              <textarea
                rows={3}
                value={editingItem.content || ""}
                onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
              />
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
                {saving ? "Saving..." : "Publish Banner"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements Table */}
      <div className="luxury-card rounded-2xl border border-[#BEE0FF] bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F2F9FF] border-b border-[#BEE0FF] text-[#334155] font-mono uppercase">
              <tr>
                <th className="p-4">Announcement</th>
                <th className="p-4">Link</th>
                <th className="p-4">Type</th>
                <th className="p-4">Active</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BEE0FF]/60 text-[#0B1220]">
              {announcements.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#334155]">
                    No announcement alerts published yet.
                  </td>
                </tr>
              ) : (
                announcements.map((a) => (
                  <tr key={a._id} className="hover:bg-[#F2F9FF]/50 transition-colors">
                    <td className="p-4 font-bold text-[#0B1220]">{a.title}</td>
                    <td className="p-4 font-mono text-[#0284c7]">{a.link || "None"}</td>
                    <td className="p-4 font-mono uppercase text-[10px]">{a.type}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                        a.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                      }`}>
                        {a.active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingItem(a)}
                          className="p-1.5 rounded-lg text-[#0284c7] hover:bg-[#D6EBFF]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => a._id && handleDelete(a._id)}
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

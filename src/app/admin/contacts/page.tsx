"use client";

import React, { useState, useEffect } from "react";
import { adminApi, ContactItem } from "@/lib/api";
import { 
  Mail, 
  Search, 
  Filter, 
  MessageSquare, 
  Phone, 
  Building, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadContacts();
  }, [page, statusFilter]);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getContacts({
        page,
        limit: 15,
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: search.trim() ? search.trim() : undefined,
      });
      setContacts(res.contacts);
      setTotal(res.total);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedContact) return;
    setUpdating(true);
    try {
      await adminApi.updateContactStatus(selectedContact._id, newStatus, notes);
      setSelectedContact({ ...selectedContact, status: newStatus, notes });
      await loadContacts();
    } catch {
      alert("Failed to update contact status.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#BEE0FF] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#0284c7]" />
            <span>Client Leads & Inquiries</span>
          </h1>
          <p className="text-xs text-[#334155] mt-1">
            Track business proposals, project scopes, budgets, and manage lead communications.
          </p>
        </div>

        <button
          onClick={loadContacts}
          className="p-2.5 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] hover:bg-[#F2F9FF] transition-colors"
          title="Refresh Data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#BEE0FF] shadow-sm">
        <div className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-[#334155] absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadContacts()}
            placeholder="Search by client name, email, company, or message..."
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
            className="px-3 py-2 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] focus:bg-white focus:outline-none"
          >
            <option value="all">All Inquiries</option>
            <option value="new">New (Unread)</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified Proposal</option>
            <option value="closed">Closed / Won</option>
          </select>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="luxury-card rounded-2xl border border-[#BEE0FF] bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F2F9FF] border-b border-[#BEE0FF] text-[#334155] font-mono uppercase">
              <tr>
                <th className="p-4">Client Name & Company</th>
                <th className="p-4">Service Required</th>
                <th className="p-4">Budget & Timeline</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BEE0FF]/60 text-[#0B1220]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#334155]">
                    Loading leads...
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#334155]">
                    No client leads match the selected filter.
                  </td>
                </tr>
              ) : (
                contacts.map((c) => (
                  <tr key={c._id} className="hover:bg-[#F2F9FF]/50 transition-colors">
                    <td className="p-4">
                      {c.contactReferenceId && (
                        <div className="font-mono text-[10px] font-bold text-[#0284c7] mb-0.5">{c.contactReferenceId}</div>
                      )}
                      <div className="font-bold text-[#0B1220]">{c.name}</div>
                      <div className="text-[11px] text-[#334155]">{c.email} {c.company ? `• ${c.company}` : ""}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-[#0B1220]">{c.service || "General Scope"}</span>
                    </td>
                    <td className="p-4 text-[#334155]">
                      <div>{c.budget || "Flexible"}</div>
                      <div className="text-[10px]">{c.timeline || "Immediate"}</div>
                    </td>
                    <td className="p-4 text-[#334155] font-mono">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                        c.status === "new"
                          ? "bg-[#D6EBFF] text-[#0284c7]"
                          : c.status === "qualified"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {c.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedContact(c);
                          setNotes(c.notes || "");
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#D6EBFF] text-[#0284c7] hover:bg-[#9FCFFB] font-bold text-xs transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#BEE0FF] flex items-center justify-between text-xs text-[#334155]">
          <div>
            Showing {contacts.length} of {total} total leads
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
              disabled={contacts.length < 15}
              onClick={() => setPage(page + 1)}
              className="p-1.5 rounded-lg border border-[#BEE0FF] disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail & Response Drawer */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto p-6 sm:p-8 space-y-6 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#0284c7] uppercase">
                  {selectedContact.contactReferenceId ? `Lead Ref: ${selectedContact.contactReferenceId}` : "Lead Information"}
                </span>
                <h2 className="text-xl font-serif font-bold text-[#0B1220]">
                  {selectedContact.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-1.5 rounded-lg text-[#334155] hover:bg-[#F2F9FF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Chips */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`mailto:${selectedContact.email}`}
                className="p-3 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] flex items-center gap-2 text-xs font-semibold text-[#0B1220] hover:bg-[#D6EBFF]"
              >
                <Mail className="w-4 h-4 text-[#0284c7]" />
                <span className="truncate">{selectedContact.email}</span>
              </a>

              {selectedContact.phone && (
                <a
                  href={`tel:${selectedContact.phone}`}
                  className="p-3 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] flex items-center gap-2 text-xs font-semibold text-[#0B1220] hover:bg-[#D6EBFF]"
                >
                  <Phone className="w-4 h-4 text-[#0284c7]" />
                  <span className="truncate">{selectedContact.phone}</span>
                </a>
              )}
            </div>

            {/* Scope & Details */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#BEE0FF] space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#BEE0FF]/60 pb-2">
                <span className="text-[#334155]">Service Needed:</span>
                <span className="font-bold text-[#0B1220]">{selectedContact.service}</span>
              </div>
              <div className="flex justify-between border-b border-[#BEE0FF]/60 pb-2">
                <span className="text-[#334155]">Expected Budget:</span>
                <span className="font-bold text-[#0B1220]">{selectedContact.budget || "Flexible"}</span>
              </div>
              <div className="flex justify-between border-b border-[#BEE0FF]/60 pb-2">
                <span className="text-[#334155]">Timeline:</span>
                <span className="font-bold text-[#0B1220]">{selectedContact.timeline || "Immediate"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#334155]">Company:</span>
                <span className="font-bold text-[#0B1220]">{selectedContact.company || "Not specified"}</span>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-mono font-bold uppercase text-[#334155]">Project Requirements</h3>
              <div className="p-4 rounded-2xl bg-white border border-[#BEE0FF] text-xs text-[#0B1220] leading-relaxed whitespace-pre-wrap">
                {selectedContact.message}
              </div>
            </div>

            {/* Lead Status & Notes */}
            <div className="space-y-3 pt-4 border-t border-[#BEE0FF]">
              <h3 className="text-xs font-mono font-bold uppercase text-[#334155]">Pipeline Status</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["new", "contacted", "qualified", "closed"].map((st) => (
                  <button
                    key={st}
                    disabled={updating}
                    onClick={() => handleStatusChange(st)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold font-mono transition-all ${
                      selectedContact.status === st
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
                  Lead Management Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record client discussions, quote numbers..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleStatusChange(selectedContact.status)}
                  className="mt-2 px-4 py-1.5 rounded-lg bg-[#9FCFFB] text-[#0B1220] font-bold text-xs shadow-sm"
                >
                  Save Notes
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

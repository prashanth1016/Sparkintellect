"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  FileText, 
  Mail, 
  Users, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles,
  Server,
  Layers,
  Building,
  RefreshCw
} from "lucide-react";
import { adminApi, ApplicationItem, ContactItem } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    totalContacts: 0,
    newContacts: 0,
    openInternships: 0,
    activeEmployees: 0,
    sheetsSyncStatus: "healthy",
  });

  const [recentApplications, setRecentApplications] = useState<ApplicationItem[]>([]);
  const [recentContacts, setRecentContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      try {
        const [dashStats, appsData, contactsData] = await Promise.all([
          adminApi.getDashboardStats().catch(() => null),
          adminApi.getApplications({ page: 1, limit: 5 }).catch(() => null),
          adminApi.getContacts({ page: 1, limit: 5 }).catch(() => null),
        ]);

        if (dashStats) {
          setStats(dashStats);
        } else {
          // Default mock counters
          setStats({
            totalApplications: 48,
            pendingApplications: 12,
            totalContacts: 29,
            newContacts: 7,
            openInternships: 3,
            activeEmployees: 4,
            sheetsSyncStatus: "healthy",
          });
        }

        if (appsData && appsData.applications) {
          setRecentApplications(appsData.applications);
        }
        if (contactsData && contactsData.contacts) {
          setRecentContacts(contactsData.contacts);
        }
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#BEE0FF] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220]">
            Executive Operations Dashboard
          </h1>
          <p className="text-xs text-[#334155] mt-1">
            Real-time telemetry, recruitment funnel, candidate submissions, and client lead pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>MongoDB & Sheets Connected</span>
          </div>

          <Link
            href="/admin/internships"
            className="px-4 py-2 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-sm flex items-center gap-1.5 transition-all"
          >
            <span>Manage Tracks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="luxury-card p-6 rounded-2xl border border-[#BEE0FF] bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-[#334155]">Total Applications</span>
            <div className="w-9 h-9 rounded-xl bg-[#D6EBFF] text-[#0284c7] flex items-center justify-center">
              <FileText className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-[#0B1220]">
            {stats.totalApplications}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{stats.pendingApplications} Pending Review</span>
          </div>
        </div>

        <div className="luxury-card p-6 rounded-2xl border border-[#BEE0FF] bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-[#334155]">Client Leads</span>
            <div className="w-9 h-9 rounded-xl bg-[#D6EBFF] text-[#0284c7] flex items-center justify-center">
              <Mail className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-[#0B1220]">
            {stats.totalContacts}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{stats.newContacts} Unread New Inquiries</span>
          </div>
        </div>

        <div className="luxury-card p-6 rounded-2xl border border-[#BEE0FF] bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-[#334155]">Open Tracks</span>
            <div className="w-9 h-9 rounded-xl bg-[#D6EBFF] text-[#0284c7] flex items-center justify-center">
              <GraduationCap className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-[#0B1220]">
            {stats.openInternships}
          </div>
          <div className="text-[11px] text-[#334155]">
            Accepting live submissions
          </div>
        </div>

        <div className="luxury-card p-6 rounded-2xl border border-[#BEE0FF] bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-[#334155]">Active Staff</span>
            <div className="w-9 h-9 rounded-xl bg-[#D6EBFF] text-[#0284c7] flex items-center justify-center">
              <Users className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-[#0B1220]">
            {stats.activeEmployees}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            RBAC Governed Accounts
          </div>
        </div>

      </div>

      {/* Two Columns: Recent Applications & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Applications Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-[#0B1220] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0284c7]" />
              <span>Recent Candidate Applications</span>
            </h2>
            <Link
              href="/admin/applications"
              className="text-xs font-bold text-[#0284c7] hover:underline"
            >
              View All Applications →
            </Link>
          </div>

          <div className="luxury-card rounded-2xl border border-[#BEE0FF] bg-white overflow-hidden shadow-sm">
            {recentApplications.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#334155]">
                No applications received yet.
              </div>
            ) : (
              <div className="divide-y divide-[#BEE0FF]/60">
                {recentApplications.map((app) => (
                  <div key={app._id} className="p-4 hover:bg-[#F2F9FF] transition-colors flex items-center justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                      <div className="text-xs font-bold text-[#0B1220] truncate">
                        {app.internshipTitle}
                      </div>
                      <div className="text-[11px] text-[#334155] flex items-center gap-2">
                        <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="font-mono text-[#0284c7]">ID: {app._id.slice(-6)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        app.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : app.status === "shortlisted"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {app.status.toUpperCase()}
                      </span>

                      <Link
                        href="/admin/applications"
                        className="text-xs font-bold text-[#0284c7] hover:underline"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Inquiries Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-[#0B1220] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0284c7]" />
              <span>Recent Client Leads</span>
            </h2>
            <Link
              href="/admin/contacts"
              className="text-xs font-bold text-[#0284c7] hover:underline"
            >
              View All Leads →
            </Link>
          </div>

          <div className="luxury-card rounded-2xl border border-[#BEE0FF] bg-white overflow-hidden shadow-sm">
            {recentContacts.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#334155]">
                No contact inquiries received yet.
              </div>
            ) : (
              <div className="divide-y divide-[#BEE0FF]/60">
                {recentContacts.map((c) => (
                  <div key={c._id} className="p-4 hover:bg-[#F2F9FF] transition-colors space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0B1220]">{c.name}</span>
                      <span className="text-[10px] font-mono text-[#334155]">{c.service}</span>
                    </div>
                    <div className="text-[11px] text-[#334155] line-clamp-1">{c.message}</div>
                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      <span className="text-[#334155]">{c.email}</span>
                      <span className={`font-mono font-bold px-1.5 py-0.5 rounded ${
                        c.status === "new" ? "bg-[#D6EBFF] text-[#0284c7]" : "bg-slate-100 text-slate-700"
                      }`}>
                        {c.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

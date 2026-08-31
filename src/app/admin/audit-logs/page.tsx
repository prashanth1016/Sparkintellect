"use client";

import React, { useState, useEffect } from "react";
import { adminApi, AuditLogItem } from "@/lib/api";
import { ShieldCheck, Search, Filter, RefreshCw, Clock, ChevronLeft, ChevronRight, User, Key } from "lucide-react";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, [page]);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAuditLogs({ page, limit: 20 });
      setLogs(res.logs);
      setTotal(res.total);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#BEE0FF] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#0284c7]" />
            <span>Immutable Security Audit Logs</span>
          </h1>
          <p className="text-xs text-[#334155] mt-1">
            Tamper-evident append-only ledger tracking all administrative access, employee changes, and data modifications.
          </p>
        </div>

        <button
          onClick={loadLogs}
          className="p-2.5 rounded-xl bg-white border border-[#BEE0FF] text-[#0B1220] hover:bg-[#F2F9FF] transition-colors"
          title="Refresh Log Stream"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Audit Logs Table */}
      <div className="luxury-card rounded-2xl border border-[#BEE0FF] bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F2F9FF] border-b border-[#BEE0FF] text-[#334155] font-mono uppercase">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Actor & Role</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Action Event</th>
                <th className="p-4">Resource Target</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BEE0FF]/60 font-mono text-[11px] text-[#0B1220]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#334155]">
                    Loading audit stream...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#334155]">
                    No audit records recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-[#F2F9FF]/50 transition-colors">
                    <td className="p-4 text-[#334155]">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-[#0B1220]">{log.actorEmail}</div>
                      <div className="text-[10px] text-[#0284c7]">{log.actorRole}</div>
                    </td>
                    <td className="p-4 text-[#334155]">{log.ipAddress}</td>
                    <td className="p-4 font-bold text-[#0B1220]">{log.action}</td>
                    <td className="p-4 text-[#334155] truncate max-w-xs">{log.targetResource || "System"}</td>
                    <td className="p-4 text-right">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        log.status === "success"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}>
                        {log.status.toUpperCase()}
                      </span>
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
            Showing {logs.length} of {total} total audit events
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
              disabled={logs.length < 20}
              onClick={() => setPage(page + 1)}
              className="p-1.5 rounded-lg border border-[#BEE0FF] disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { adminApi, UserItem } from "@/lib/api";
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Edit, 
  Trash2, 
  AlertCircle,
  X,
  Key,
  Mail,
  User,
  Shield
} from "lucide-react";

const AVAILABLE_PERMISSIONS = [
  { id: "internship.read", label: "View Internships" },
  { id: "internship.create", label: "Create Internships" },
  { id: "internship.update", label: "Edit Internships" },
  { id: "internship.publish", label: "Publish / Close Tracks" },
  { id: "application.read", label: "View Applications & Resumes" },
  { id: "application.update", label: "Update Application Status" },
  { id: "application.export", label: "Export Candidate Data" },
  { id: "contact.read", label: "View Client Leads" },
  { id: "contact.update", label: "Update Lead Status & Notes" },
  { id: "career.read", label: "View Careers CMS" },
  { id: "career.create", label: "Post New Job Openings" },
  { id: "career.update", label: "Edit Careers" },
  { id: "content.read", label: "View Case Studies & FAQs" },
  { id: "content.create", label: "Create Case Studies & FAQs" },
  { id: "content.update", label: "Edit Case Studies & FAQs" },
  { id: "audit.read", label: "View Security Audit Logs" },
  { id: "settings.manage", label: "Manage Site Configuration" },
];

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEmp, setEditingEmp] = useState<Partial<UserItem> & { password?: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getEmployees();
      setEmployees(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingEmp({
      name: "",
      email: "",
      role: "STAFF",
      status: "active",
      permissions: [
        "internship.read",
        "application.read",
        "application.update",
        "contact.read",
        "contact.update"
      ],
      password: ""
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmp) return;

    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (editingEmp._id) {
        await adminApi.updateEmployee(editingEmp._id, editingEmp);
        setSuccessMsg("Employee account updated successfully.");
      } else {
        if (!editingEmp.name || !editingEmp.email || !editingEmp.password || editingEmp.password.length < 8) {
          setErrorMsg("Name, email, and a password of at least 8 characters are required.");
          setSaving(false);
          return;
        }
        await adminApi.createEmployee({
          name: editingEmp.name,
          email: editingEmp.email,
          role: editingEmp.role || "STAFF",
          permissions: editingEmp.permissions || [],
          password: editingEmp.password,
        });
        setSuccessMsg("Employee account created successfully.");
      }
      setEditingEmp(null);
      await loadEmployees();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to save employee record.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (emp: UserItem) => {
    if (emp.role === "CEO") {
      alert("The CEO root account cannot be deactivated.");
      return;
    }
    const newStatus = emp.status === "active" ? "inactive" : "active";
    if (!confirm(`Are you sure you want to change ${emp.name}'s status to ${newStatus}?`)) return;

    try {
      await adminApi.updateEmployee(emp._id, { status: newStatus });
      await loadEmployees();
    } catch {
      alert("Failed to update status.");
    }
  };

  const togglePermission = (permId: string) => {
    if (!editingEmp) return;
    const current = editingEmp.permissions || [];
    const exists = current.includes(permId);
    const updated = exists
      ? current.filter((p) => p !== permId)
      : [...current, permId];
    setEditingEmp({ ...editingEmp, permissions: updated });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#BEE0FF] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#0284c7]" />
            <span>Employee & RBAC Governance</span>
          </h1>
          <p className="text-xs text-[#334155] mt-1">
            CEO-restricted interface. Create staff accounts, configure granular permissions, and revoke active sessions.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center gap-2 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite New Employee</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Editor Drawer */}
      {editingEmp && (
        <div className="luxury-card p-6 sm:p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-4">
            <h2 className="text-xl font-serif font-bold text-[#0B1220]">
              {editingEmp._id ? `Edit Permissions: ${editingEmp.name}` : "Create Employee Account"}
            </h2>
            <button
              onClick={() => setEditingEmp(null)}
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
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingEmp.name || ""}
                  onChange={(e) => setEditingEmp({ ...editingEmp, name: e.target.value })}
                  placeholder="e.g. Anand Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={editingEmp.email || ""}
                  onChange={(e) => setEditingEmp({ ...editingEmp, email: e.target.value })}
                  placeholder="anand@sparkintellect.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>
            </div>

            {!editingEmp._id && (
              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1">
                  Temporary Password (Min 8 Chars) *
                </label>
                <input
                  type="password"
                  required
                  value={editingEmp.password || ""}
                  onChange={(e) => setEditingEmp({ ...editingEmp, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
                />
              </div>
            )}

            {/* Granular Permissions Matrix */}
            <div className="p-6 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#0B1220] flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#0284c7]" />
                  <span>Granular Role-Based Permissions (RBAC)</span>
                </h3>
                <p className="text-[11px] text-[#334155]">
                  Select the specific operations this staff member is authorized to perform.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {AVAILABLE_PERMISSIONS.map((perm) => {
                  const isChecked = editingEmp.permissions?.includes(perm.id);
                  return (
                    <label
                      key={perm.id}
                      className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                        isChecked
                          ? "bg-white border-[#0284c7] shadow-sm"
                          : "bg-white/60 border-[#BEE0FF] hover:bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePermission(perm.id)}
                        className="mt-0.5 rounded border-[#BEE0FF] text-[#0284c7]"
                      />
                      <div>
                        <div className="text-xs font-semibold text-[#0B1220]">{perm.label}</div>
                        <div className="text-[10px] font-mono text-[#334155]">{perm.id}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#BEE0FF]">
              <button
                type="button"
                onClick={() => setEditingEmp(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#F2F9FF] text-[#334155] border border-[#BEE0FF]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-7 py-2.5 rounded-xl font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md"
              >
                {saving ? "Saving..." : "Save Employee Record"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Employees Table */}
      <div className="luxury-card rounded-2xl border border-[#BEE0FF] bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F2F9FF] border-b border-[#BEE0FF] text-[#334155] font-mono uppercase">
              <tr>
                <th className="p-4">Employee Name</th>
                <th className="p-4">Corporate Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Permissions Count</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BEE0FF]/60 text-[#0B1220]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#334155]">
                    Loading staff accounts...
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-[#F2F9FF]/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-[#0B1220] flex items-center gap-2">
                        <span>{emp.name}</span>
                        {emp.role === "CEO" && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-mono font-bold">
                            FOUNDER & CEO
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-mono text-[#334155]">{emp.email}</td>
                    <td className="p-4">
                      <span className="font-mono font-bold text-xs text-[#0284c7]">{emp.role}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#D6EBFF] text-[#0284c7] font-mono font-semibold text-[11px]">
                        {emp.role === "CEO" ? "ALL (*)" : `${emp.permissions?.length || 0} Grants`}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                        emp.status === "active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}>
                        {emp.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {emp.role !== "CEO" && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingEmp(emp)}
                            className="p-1.5 rounded-lg text-[#0284c7] hover:bg-[#D6EBFF]"
                            title="Edit Permissions"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(emp)}
                            className={`p-1.5 rounded-lg font-bold text-xs ${
                              emp.status === "active"
                                ? "text-rose-600 hover:bg-rose-50"
                                : "text-emerald-600 hover:bg-emerald-50"
                            }`}
                            title={emp.status === "active" ? "Deactivate" : "Activate"}
                          >
                            {emp.status === "active" ? "Deactivate" : "Re-activate"}
                          </button>
                        </div>
                      )}
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

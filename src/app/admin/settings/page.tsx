"use client";

import React, { useState, useEffect } from "react";
import { adminApi, WebsiteSettings } from "@/lib/api";
import { Settings, Save, CheckCircle2, AlertCircle, ShieldCheck, Mail, Globe, Phone, MapPin } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<WebsiteSettings>>({
    siteName: "SparkIntellect",
    tagline: "AI • Software • Automation",
    contactEmail: "info@sparkintellect.in",
    contactPhone: "+91 9943177634",
    officeAddress: "Chennai, Tamil Nadu - 600032, India",
    workingHours: "Monday – Saturday: 9:00 AM – 7:00 PM IST",
    maintenanceMode: false,
    googleSheetsAutoSync: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getSettings();
      if (data) setSettings(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await adminApi.updateSettings(settings);
      setSuccessMsg("System configuration updated successfully.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to update settings.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">

      <div className="border-b border-[#BEE0FF] pb-6">
        <h1 className="text-2xl font-serif font-bold text-[#0B1220] flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#0284c7]" />
          <span>System & Website Settings</span>
        </h1>
        <p className="text-xs text-[#334155] mt-1">
          Configure global corporate contact details, Google Sheets sync switches, and system modes.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">

        {/* Company Identity */}
        <div className="luxury-card p-6 sm:p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-sm space-y-4">
          <h2 className="text-base font-serif font-bold text-[#0B1220] flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#0284c7]" />
            <span>Corporate Identity & Metadata</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B1220] mb-1">Company Name</label>
              <input
                type="text"
                value={settings.siteName || ""}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1220] mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline || ""}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B1220] mb-1">Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail || ""}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1220] mb-1">Phone / WhatsApp</label>
              <input
                type="text"
                value={settings.contactPhone || ""}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0B1220] mb-1">Official Address</label>
            <input
              type="text"
              value={settings.officeAddress || ""}
              onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220]"
            />
          </div>
        </div>

        {/* Cloud & Integration Switches */}
        <div className="luxury-card p-6 sm:p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-sm space-y-4">
          <h2 className="text-base font-serif font-bold text-[#0B1220] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
            <span>Integrations & Telemetry</span>
          </h2>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] cursor-pointer">
              <div>
                <div className="text-xs font-bold text-[#0B1220]">Google Sheets Auto-Sync Queue</div>
                <div className="text-[11px] text-[#334155]">Automatically append all new candidate applications to Google Sheets</div>
              </div>
              <input
                type="checkbox"
                checked={settings.googleSheetsAutoSync ?? true}
                onChange={(e) => setSettings({ ...settings, googleSheetsAutoSync: e.target.checked })}
                className="w-4 h-4 text-[#0284c7] rounded border-[#BEE0FF]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F2F9FF] border border-[#BEE0FF] cursor-pointer">
              <div>
                <div className="text-xs font-bold text-[#0B1220]">Maintenance Mode</div>
                <div className="text-[11px] text-[#334155]">Display temporary maintenance banner on public endpoints</div>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenanceMode ?? false}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="w-4 h-4 text-[#0284c7] rounded border-[#BEE0FF]"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Settings..." : "Save System Settings"}</span>
          </button>
        </div>

      </form>

    </div>
  );
}

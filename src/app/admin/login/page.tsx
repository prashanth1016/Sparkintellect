"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { adminApi } from "@/lib/api";
import { Lock, Mail, Key, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [showMfa, setShowMfa] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await adminApi.login({
        email,
        password,
        mfaCode: mfaCode || undefined,
      });

      if (res.requiresMfa) {
        setShowMfa(true);
        setLoading(false);
        return;
      }

      // Success
      router.push("/admin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Invalid email or password.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] font-sans selection:bg-[#C8102E] selection:text-white flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Decorative Red Blur Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#C8102E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8B0015]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center justify-center">
            <div className="relative h-12 w-auto flex items-center justify-center">
              <Image
                src="/images/sparkintellect-logo-v2.png"
                alt="SparkIntellect"
                width={200}
                height={40}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
          </Link>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">
            SparkIntellect Admin
          </h1>
          <p className="text-xs text-[#A6A9B0]">
            Authorized Personnel & Management Portal
          </p>
        </div>

        {/* Login Box */}
        <div className="cinematic-card p-8 rounded-3xl border border-[rgba(198,202,208,0.16)] bg-[#0B0B0E]/90 backdrop-blur-xl shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-[rgba(198,202,208,0.1)] pb-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF1744]">
              <Lock className="w-3.5 h-3.5" />
              <span>SECURE ACCESS GATEWAY</span>
            </div>
            <span className="text-[10px] font-mono text-[#A6A9B0]">Argon2id + RBAC</span>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-[#8B0015]/20 border border-[#C8102E]/40 text-[#FF1744] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#C6CAD0] mb-1.5">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A6A9B0] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ceo@sparkintellect.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111115] border border-[rgba(198,202,208,0.16)] text-xs text-white placeholder-[#A6A9B0]/50 focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#C6CAD0]">
                  Password
                </label>
                <Link
                  href="/admin/forgot-password"
                  className="text-[11px] text-[#FF1744] font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-[#A6A9B0] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111115] border border-[rgba(198,202,208,0.16)] text-xs text-white placeholder-[#A6A9B0]/50 focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {showMfa && (
              <div className="p-4 rounded-2xl bg-[#150a0e] border border-[#C8102E]/40 space-y-2 animate-fadeIn">
                <label className="block text-xs font-bold text-white">
                  Two-Factor Authentication Code (TOTP)
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder="6-digit code"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111115] border border-[rgba(198,202,208,0.2)] text-center font-mono font-bold tracking-widest text-sm text-[#FF1744] focus:outline-none focus:border-[#C8102E]"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-ruby w-full py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-[#C8102E]/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="pt-2 border-t border-[rgba(198,202,208,0.1)] text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-[#A6A9B0]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Protected against brute-force & credential stuffing</span>
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-[#A6A9B0] hover:text-white transition-colors"
          >
            ← Return to SparkIntellect Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}

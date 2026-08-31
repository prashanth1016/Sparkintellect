"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { adminApi } from "@/lib/api";
import { Lock, Mail, Key, ShieldCheck, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

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
    <div className="min-h-screen bg-[#F2F9FF] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#D6EBFF] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#BEE0FF] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0B1220] p-1.5 shadow-lg flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="SparkIntellect"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#0B1220]">
            SparkIntellect Admin
          </h1>
          <p className="text-xs text-[#334155]">
            Authorized Personnel & Management Portal
          </p>
        </div>

        {/* Login Box */}
        <div className="luxury-card p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0284c7]">
              <Lock className="w-3.5 h-3.5" />
              <span>SECURE ACCESS GATEWAY</span>
            </div>
            <span className="text-[10px] font-mono text-[#334155]">Argon2id + RBAC</span>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#334155] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ceo@sparkintellect.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] focus:bg-white focus:border-[#9FCFFB] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#0B1220]">
                  Password
                </label>
                <Link
                  href="/admin/forgot-password"
                  className="text-[11px] text-[#0284c7] font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-[#334155] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] focus:bg-white focus:border-[#9FCFFB] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {showMfa && (
              <div className="p-4 rounded-2xl bg-[#D6EBFF] border border-[#BEE0FF] space-y-2 animate-fadeIn">
                <label className="block text-xs font-bold text-[#0B1220]">
                  Two-Factor Authentication Code (TOTP)
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder="6-digit code"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#BEE0FF] text-center font-mono font-bold tracking-widest text-sm text-[#0B1220] focus:outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0B1220] border-t-transparent rounded-full animate-spin" />
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
          <div className="pt-2 border-t border-[#BEE0FF] text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-[#334155]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Protected against brute-force & credential stuffing</span>
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-[#334155] hover:text-[#0B1220] transition-colors"
          >
            ← Return to SparkIntellect Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}

"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { adminApi } from "@/lib/api";
import { Key, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (!token) {
      setErrorMsg("Missing or invalid reset token.");
      return;
    }

    setLoading(true);

    try {
      await adminApi.resetPassword(token, password);
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to reset password. The link may have expired.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] font-sans selection:bg-[#C8102E] selection:text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Red ambient blur */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#C8102E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">
            Set New Password
          </h1>
          <p className="text-xs text-[#A6A9B0]">
            Create a strong, unique password for your SparkIntellect account.
          </p>
        </div>

        <div className="cinematic-card p-8 rounded-3xl border border-[rgba(198,202,208,0.16)] bg-[#0B0B0E]/90 backdrop-blur-xl shadow-2xl space-y-6">
          
          {success ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-[#8B0015]/20 border border-[#C8102E]/30 text-[#FF1744] flex items-center justify-center mx-auto shadow-lg shadow-[#C8102E]/20">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-display font-bold text-white">Password Updated!</h2>
              <p className="text-xs text-[#A6A9B0]">
                Your password has been successfully changed using Argon2id encryption.
              </p>
              <Link
                href="/admin/login"
                className="btn-ruby inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white shadow-md transition-all mt-2"
              >
                <span>Proceed to Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-[#8B0015]/20 border border-[#C8102E]/40 text-[#FF1744] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#C6CAD0] mb-1.5">
                  New Password (Min 8 Characters)
                </label>
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

              <div>
                <label className="block text-xs font-semibold text-[#C6CAD0] mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-[#A6A9B0] absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111115] border border-[rgba(198,202,208,0.16)] text-xs text-white placeholder-[#A6A9B0]/50 focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-ruby w-full py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-[#C8102E]/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>Hashing & Updating Password...</span>
                ) : (
                  <>
                    <span>Update Account Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-white text-xs font-mono">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

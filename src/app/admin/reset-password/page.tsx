"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { adminApi } from "@/lib/api";
import { Lock, Key, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-[#F2F9FF] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-6">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-bold text-[#0B1220]">
            Set New Password
          </h1>
          <p className="text-xs text-[#334155]">
            Create a strong, unique password for your SparkIntellect account.
          </p>
        </div>

        <div className="luxury-card p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-xl space-y-6">
          
          {success ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-[#D6EBFF] text-[#0284c7] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-[#0B1220]">Password Updated!</h2>
              <p className="text-xs text-[#334155]">
                Your password has been successfully changed using Argon2id encryption.
              </p>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md transition-all mt-2"
              >
                <span>Proceed to Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                  New Password (Min 8 Characters)
                </label>
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

              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-[#334155] absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-xs text-[#0B1220] focus:bg-white focus:border-[#9FCFFB] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md flex items-center justify-center gap-2 transition-all"
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
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

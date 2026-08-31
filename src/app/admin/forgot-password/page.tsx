"use client";

import React, { useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/api";
import { Lock, Mail, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminApi.forgotPassword(email);
    } catch {
      // Always generic response to prevent account enumeration
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F9FF] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-6">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-bold text-[#0B1220]">
            Password Recovery
          </h1>
          <p className="text-xs text-[#334155]">
            Enter your registered email to receive a secure one-time reset link.
          </p>
        </div>

        <div className="luxury-card p-8 rounded-3xl border border-[#BEE0FF] bg-white shadow-xl space-y-6">
          
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-[#D6EBFF] text-[#0284c7] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-[#0B1220]">Recovery Email Dispatched</h2>
              <p className="text-xs text-[#334155] leading-relaxed">
                If an active account exists for <strong className="text-[#0B1220]">{email}</strong>, a cryptographically signed reset token has been emailed.
              </p>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7] hover:underline pt-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1220] mb-1.5">
                  Your Account Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#334155] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="employee@sparkintellect.in"
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
                  <span>Generating Secure Token...</span>
                ) : (
                  <>
                    <span>Send Password Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="pt-2 border-t border-[#BEE0FF] text-center">
            <Link
              href="/admin/login"
              className="text-xs font-semibold text-[#334155] hover:text-[#0B1220] flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

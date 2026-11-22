"use client";

import React, { useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/api";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

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
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] font-sans selection:bg-[#C8102E] selection:text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Red ambient blur */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#C8102E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">
            Password Recovery
          </h1>
          <p className="text-xs text-[#A6A9B0]">
            Enter your registered email to receive a secure one-time reset link.
          </p>
        </div>

        <div className="cinematic-card p-8 rounded-3xl border border-[rgba(198,202,208,0.16)] bg-[#0B0B0E]/90 backdrop-blur-xl shadow-2xl space-y-6">
          
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-[#8B0015]/20 border border-[#C8102E]/30 text-[#FF1744] flex items-center justify-center mx-auto shadow-lg shadow-[#C8102E]/20">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-display font-bold text-white">Recovery Email Dispatched</h2>
              <p className="text-xs text-[#A6A9B0] leading-relaxed">
                If an active account exists for <strong className="text-white">{email}</strong>, a cryptographically signed reset token has been emailed.
              </p>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF1744] hover:underline pt-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#C6CAD0] mb-1.5">
                  Your Account Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A6A9B0] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="employee@sparkintellect.in"
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

          <div className="pt-2 border-t border-[rgba(198,202,208,0.1)] text-center">
            <Link
              href="/admin/login"
              className="text-xs font-semibold text-[#A6A9B0] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
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

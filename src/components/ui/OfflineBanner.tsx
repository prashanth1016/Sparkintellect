"use client";

import React, { useState, useEffect } from "react";
import { WifiOff, RefreshCw, CheckCircle2 } from "lucide-react";

export const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [justReconnected, setJustReconnected] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setJustReconnected(true);
      const timer = setTimeout(() => setJustReconnected(false), 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setJustReconnected(false);
    };

    // Check initial state
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setIsOffline(true);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = async () => {
    setChecking(true);
    try {
      // Ping a reliable lightweight public endpoint with cache-busting
      const res = await fetch(`/api/public/settings?_t=${Date.now()}`, {
        method: "HEAD",
        cache: "no-store",
      }).catch(() => null);

      if (res && (res.ok || res.status < 500)) {
        setIsOffline(false);
        setJustReconnected(true);
        setTimeout(() => setJustReconnected(false), 3000);
      } else if (navigator.onLine) {
        setIsOffline(false);
      } else {
        setIsOffline(true);
      }
    } catch {
      if (!navigator.onLine) {
        setIsOffline(true);
      }
    } finally {
      setChecking(false);
    }
  };

  if (!isOffline && !justReconnected) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      {isOffline ? (
        <div className="glass-panel p-4 rounded-2xl border border-[#ede0d4]/40 bg-[#0d262d]/95 text-[#ede0d4] shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#17475e]/30 border border-[#ede0d4]/30 flex items-center justify-center text-[#ede0d4] shrink-0">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#ede0d4]">Connection Lost</p>
              <p className="text-[11px] text-[#ede0d4]/80">You are currently browsing offline.</p>
            </div>
          </div>
          <button
            onClick={handleRetry}
            disabled={checking}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#ede0d4] text-[#071519] hover:bg-white transition-all flex items-center gap-1.5 shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${checking ? "animate-spin" : ""}`} />
            <span>{checking ? "Checking..." : "Retry"}</span>
          </button>
        </div>
      ) : (
        <div className="glass-panel p-3.5 rounded-2xl border border-[#ede0d4]/40 bg-[#0d262d]/95 text-[#ede0d4] shadow-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#17475e]/30 border border-[#ede0d4]/30 flex items-center justify-center text-[#ede0d4] shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold text-[#ede0d4]">
            Connection Restored. Online and synchronized.
          </div>
        </div>
      )}
    </div>
  );
};

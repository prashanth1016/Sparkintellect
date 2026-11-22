"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const NavigationProgress: React.FC = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Flash a subtle top progress pulse on route change
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] h-[2.5px] pointer-events-none overflow-hidden bg-transparent"
    >
      <div className="h-full bg-gradient-to-r from-[#17475e] via-[#ede0d4] to-[#17475e] shadow-[0_0_12px_#ede0d4] animate-pulse w-full transition-all duration-300" />
    </div>
  );
};

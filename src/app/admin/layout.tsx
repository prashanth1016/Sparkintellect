"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  Users, 
  Mail, 
  Briefcase, 
  Layers, 
  HelpCircle, 
  Bell, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  UserCheck,
  Lock
} from "lucide-react";
import { adminApi } from "@/lib/api";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login or password reset pages, render plain layout
  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/forgot-password" ||
    pathname.startsWith("/admin/reset-password");

  useEffect(() => {
    if (isAuthPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const me = await adminApi.getMe();
        if (me) {
          setUser(me);
        } else {
          // If no active session, redirect to login
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [isAuthPage, router]);

  const handleLogout = async () => {
    try {
      await adminApi.logout();
    } catch {
      // ignore
    }
    router.push("/admin/login");
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F9FF] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#0284c7] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono font-bold text-[#0B1220]">Authenticating Session...</p>
        </div>
      </div>
    );
  }

  const isCEO = user?.role === "CEO";
  const userPerms = user?.permissions || [];

  const hasPerm = (perm: string) => isCEO || userPerms.includes(perm) || userPerms.includes("*");

  const NAV_SECTIONS = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      show: true,
    },
    {
      name: "Internships",
      href: "/admin/internships",
      icon: GraduationCap,
      show: hasPerm("internship.read"),
    },
    {
      name: "Applications",
      href: "/admin/applications",
      icon: FileText,
      show: hasPerm("application.read"),
    },
    {
      name: "Contact Leads",
      href: "/admin/contacts",
      icon: Mail,
      show: hasPerm("contact.read"),
    },
    {
      name: "Careers CMS",
      href: "/admin/careers",
      icon: Briefcase,
      show: hasPerm("career.read"),
    },
    {
      name: "Case Studies",
      href: "/admin/case-studies",
      icon: Layers,
      show: hasPerm("content.read"),
    },
    {
      name: "FAQs CMS",
      href: "/admin/faqs",
      icon: HelpCircle,
      show: hasPerm("content.read"),
    },
    {
      name: "Announcements",
      href: "/admin/announcements",
      icon: Bell,
      show: hasPerm("content.read"),
    },
    {
      name: "Employees & Roles",
      href: "/admin/employees",
      icon: Users,
      show: isCEO || hasPerm("employee.read"),
      badge: isCEO ? "CEO" : undefined,
    },
    {
      name: "Website Settings",
      href: "/admin/settings",
      icon: Settings,
      show: isCEO || hasPerm("settings.manage"),
    },
    {
      name: "Audit Logs",
      href: "/admin/audit-logs",
      icon: ShieldCheck,
      show: isCEO || hasPerm("audit.read"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1220] flex">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#BEE0FF] shrink-0 sticky top-0 h-screen z-40">
        
        {/* Top Brand Header */}
        <div className="p-5 border-b border-[#BEE0FF] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B1220] p-1 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="SparkIntellect"
                width={28}
                height={28}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-serif font-bold text-[#0B1220]">
                Spark<span className="text-[#0284c7]">Admin</span>
              </span>
              <span className="text-[9px] font-mono text-[#334155] uppercase">
                Enterprise Portal
              </span>
            </div>
          </Link>
          
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
            isCEO ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-[#D6EBFF] text-[#0284c7]"
          }`}>
            {user?.role || "USER"}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_SECTIONS.filter((s) => s.show).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#9FCFFB] text-[#0B1220] font-bold shadow-sm"
                    : "text-[#334155] hover:bg-[#F2F9FF] hover:text-[#0B1220]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#0B1220]" : "text-[#0284c7]"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout Footer */}
        <div className="p-3 border-t border-[#BEE0FF] bg-[#F2F9FF] space-y-2">
          <div className="flex items-center gap-2.5 px-2 py-1">
            <div className="w-8 h-8 rounded-full bg-[#0284c7] text-white flex items-center justify-center font-bold text-xs font-serif">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#0B1220] truncate">{user?.name}</div>
              <div className="text-[10px] text-[#334155] truncate">{user?.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <Link
              href="/"
              target="_blank"
              className="flex-1 text-center py-2 px-2 rounded-lg bg-white border border-[#BEE0FF] text-[11px] font-semibold text-[#0B1220] hover:bg-[#D6EBFF] transition-colors"
            >
              Public Site
            </Link>
            <button
              onClick={handleLogout}
              className="py-2 px-3 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors flex items-center gap-1 text-[11px] font-bold"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Mobile Bar */}
        <header className="lg:hidden bg-white border-b border-[#BEE0FF] p-4 flex items-center justify-between sticky top-0 z-30">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-base font-serif font-bold text-[#0B1220]">
              Spark<span className="text-[#0284c7]">Admin</span>
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-[#0B1220]"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Sidebar Modal */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex">
            <div className="w-72 bg-white h-full flex flex-col p-4 space-y-4 shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#BEE0FF] pb-3">
                <span className="text-base font-serif font-bold text-[#0B1220]">
                  Spark<span className="text-[#0284c7]">Admin</span>
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg text-[#334155]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto space-y-1">
                {NAV_SECTIONS.filter((s) => s.show).map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold ${
                        isActive
                          ? "bg-[#9FCFFB] text-[#0B1220] font-bold"
                          : "text-[#334155] hover:bg-[#F2F9FF]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#0284c7]" />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>

              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

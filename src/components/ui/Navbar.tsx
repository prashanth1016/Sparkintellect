"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Bot,
  Zap,
  Cpu,
  Globe,
  Smartphone,
  Cloud
} from "lucide-react";
import { SERVICES } from "@/data/companyData";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "ai-development": Bot,
  "automation": Zap,
  "enterprise-software": Cpu,
  "web-development": Globe,
  "mobile-development": Smartphone,
  "cloud-devops": Cloud,
};

const NAV_LINKS = [
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Internships", href: "/internships" },
  { name: "Contact", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full ${
        scrolled
          ? "bg-[#2B2A6B]/95 backdrop-blur-xl py-2.5 sm:py-3 border-b border-[#EEEAF8]/20 shadow-xl shadow-[#2B2A6B]/25"
          : "bg-gradient-to-b from-[#2B2A6B]/95 via-[#2B2A6B]/60 to-transparent backdrop-blur-md py-3 sm:py-4 border-b border-[#EEEAF8]/15"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-9 sm:h-11 md:h-12 w-auto flex items-center">
              <Image
                src="/images/sparkintellect-logo-v2.png"
                alt="SparkIntellect Logo"
                width={220}
                height={45}
                className="h-8 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#2B2A6B] p-1.5 rounded-full border border-[#EEEAF8]/25 backdrop-blur-xl shadow-lg">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                        isActive
                          ? "bg-[#d4a373] text-[#2B2A6B] font-bold shadow-sm border border-[#d4a373]"
                          : "text-[#EEEAF8]/85 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3 h-3 text-[#EEEAF8]/70 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                    </Link>

                    {/* Services Dropdown */}
                    {servicesOpen && (
                      <div 
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                        className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-2"
                      >
                        <div className="bg-[#2B2A6B] rounded-2xl border border-[#EEEAF8]/30 shadow-2xl p-2 backdrop-blur-2xl">
                          <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase text-[#d4a373] tracking-wider border-b border-[#EEEAF8]/15 mb-1 flex items-center justify-between">
                            <span>Capabilities</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373]" />
                          </div>
                          {SERVICES.map((s) => {
                            const Icon = SERVICE_ICONS[s.slug] || Sparkles;
                            return (
                              <Link
                                key={s.slug}
                                href={`/services/${s.slug}`}
                                onClick={() => setServicesOpen(false)}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#1E1D4E] transition-colors group/item"
                              >
                                <div className="w-7 h-7 rounded-lg bg-[#EEEAF8]/10 border border-[#EEEAF8]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:border-[#d4a373] group-hover/item:bg-[#d4a373]/20 transition-colors">
                                  <Icon className="w-3.5 h-3.5 text-[#d4a373]" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-[#EEEAF8] group-hover/item:text-[#d4a373] transition-colors">
                                    {s.title}
                                  </div>
                                  <div className="text-[10px] text-[#EEEAF8]/70 line-clamp-1">
                                    {s.shortDesc}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-[#d4a373] text-[#2B2A6B] font-bold shadow-sm border border-[#d4a373]"
                      : "text-[#EEEAF8]/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/internships"
              className="text-xs font-semibold text-[#EEEAF8] px-4 py-2 rounded-full bg-[#2B2A6B] border border-[#EEEAF8]/25 hover:border-[#d4a373] hover:text-[#d4a373] transition-all items-center gap-1.5 hidden xl:flex shadow-sm backdrop-blur-md"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#d4a373]" />
              <span>Internships</span>
            </Link>

            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full font-bold text-xs glass-btn-primary flex items-center gap-1.5 group"
            >
              <span>Start Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#2B2A6B] border border-[#EEEAF8]/25 text-[#EEEAF8] hover:border-[#d4a373] focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#EEEAF8]" /> : <Menu className="w-6 h-6 text-[#EEEAF8]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#2B2A6B]/98 backdrop-blur-2xl border-t border-b border-[#EEEAF8]/20 px-5 pt-4 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

              if (link.hasDropdown) {
                return (
                  <div key={link.name} className="flex flex-col">
                    <div className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                      isActive ? "bg-[#d4a373] text-[#2B2A6B] font-bold" : "text-[#EEEAF8]/85 hover:bg-white/10 hover:text-white"
                    }`}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1"
                      >
                        {link.name}
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobileServicesOpen(!mobileServicesOpen);
                        }}
                        className="p-1 -mr-1 rounded-lg hover:bg-white/10"
                        aria-label="Toggle services list"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="pl-3 pr-1 py-1.5 space-y-1 border-l-2 border-[#d4a373]/40 ml-4 my-1">
                        {SERVICES.map((s) => {
                          const Icon = SERVICE_ICONS[s.slug] || Sparkles;
                          return (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-[#EEEAF8]/80 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <Icon className="w-3.5 h-3.5 text-[#d4a373]" />
                              <span>{s.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? "bg-[#d4a373] text-[#2B2A6B] font-bold"
                      : "text-[#EEEAF8]/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-[#2B2A6B]" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#EEEAF8]/20 flex flex-col gap-2.5">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3.5 rounded-xl font-bold text-xs glass-btn-primary flex items-center justify-center gap-2"
            >
              <span>Start Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

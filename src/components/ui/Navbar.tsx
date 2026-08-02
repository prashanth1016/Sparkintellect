"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, ArrowRight, PhoneCall, GraduationCap } from "lucide-react";
import { COMPANY_INFO } from "@/data/companyData";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Industries", href: "/industries" },
  { name: "Process", href: "/process" },
  { name: "About Us", href: "/about" },
  { name: "Internships", href: "/internships" },
  { name: "Contact", href: "/contact" },
  { name: "Support", href: "/support" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "luxury-nav py-3.5 shadow-sm" : "bg-white/80 backdrop-blur-md py-5 border-b border-[#BEE0FF]/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-[#0B1220] p-1 shadow-md shadow-[#0B1220]/20 group-hover:scale-105 transition-transform border border-[#9FCFFB]/40 overflow-hidden flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="SparkIntellect Logo"
                width={44}
                height={44}
                className="w-full h-full object-cover rounded-lg"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-tight text-[#0B1220] flex items-center gap-1">
                Spark<span className="text-[#0284c7] font-serif italic">Intellect</span>
              </span>
              <span className="text-[10px] text-[#334155] tracking-widest font-sans uppercase -mt-1 font-medium">
                AI & Software Enterprise
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#F2F9FF] p-1.5 rounded-full border border-[#BEE0FF]">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-[#9FCFFB] text-[#0B1220] shadow-sm font-bold"
                      : "text-[#334155] hover:text-[#0B1220] hover:bg-[#D6EBFF]/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="text-xs font-medium text-[#334155] hover:text-[#0B1220] flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F2F9FF] border border-[#BEE0FF] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            
            <Link
              href="/internships"
              className="hidden lg:flex text-xs font-semibold text-[#0B1220] px-3.5 py-2 rounded-full bg-[#D6EBFF] border border-[#BEE0FF] hover:bg-[#BEE0FF] transition-colors items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Internships</span>
            </Link>

            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full font-bold text-xs bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-md shadow-[#9FCFFB]/40 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Get Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF] text-[#0B1220] hover:bg-[#D6EBFF] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-b border-[#BEE0FF] px-4 pt-4 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between ${
                    isActive
                      ? "bg-[#D6EBFF] text-[#0B1220] border border-[#BEE0FF]"
                      : "text-[#334155] hover:bg-[#F2F9FF] hover:text-[#0B1220]"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-[#0284c7]" />}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-[#BEE0FF] flex flex-col gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full text-center text-xs text-[#0B1220] font-semibold flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F2F9FF] border border-[#BEE0FF]"
            >
              <PhoneCall className="w-4 h-4 text-[#0284c7]" />
              <span>Call Us: {COMPANY_INFO.phone}</span>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3.5 rounded-xl font-bold text-xs bg-[#9FCFFB] text-[#0B1220] shadow-md flex items-center justify-center gap-2"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

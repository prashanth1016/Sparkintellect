import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  GraduationCap
} from "lucide-react";
import { COMPANY_INFO, SERVICES } from "@/data/companyData";
import { LinkedInIcon, TwitterXIcon, InstagramIcon, FacebookIcon, YouTubeIcon } from "./SocialIcons";

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#F2F9FF] border-t border-[#BEE0FF] pt-20 pb-12 overflow-hidden">
      {/* Top Gradient Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[2px] bg-gradient-to-r from-transparent via-[#9FCFFB] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-xl bg-[#0B1220] p-1 shadow-md shadow-[#0B1220]/20 group-hover:scale-105 transition-transform border border-[#9FCFFB]/40 overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="SparkIntellect Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-tight text-[#0B1220]">
                  Spark<span className="text-[#0284c7] font-serif italic">Intellect</span>
                </span>
                <span className="text-[10px] text-[#334155] tracking-widest font-sans uppercase font-medium">
                  AI & Software Enterprise
                </span>
              </div>
            </Link>

            <p className="text-[#334155] text-sm leading-relaxed max-w-md">
              {COMPANY_INFO.tagline}. We empower startups, SMEs, and global enterprises with AI agents, custom software engineering, high-performance web/mobile platforms, and internship programs.
            </p>

            <div className="pt-2 flex items-center gap-4 text-[#334155]">
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-[#BEE0FF] flex items-center justify-center hover:text-[#0B1220] hover:bg-[#D6EBFF] transition-colors shadow-sm"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4 text-[#0B1220]" />
              </a>
              <a
                href={COMPANY_INFO.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-[#BEE0FF] flex items-center justify-center hover:text-[#0B1220] hover:bg-[#D6EBFF] transition-colors shadow-sm"
                aria-label="Twitter / X"
              >
                <TwitterXIcon className="w-4 h-4 text-[#0B1220]" />
              </a>
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-[#BEE0FF] flex items-center justify-center hover:text-[#0B1220] hover:bg-[#D6EBFF] transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4 text-[#0B1220]" />
              </a>
              <a
                href={COMPANY_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-[#BEE0FF] flex items-center justify-center hover:text-[#0B1220] hover:bg-[#D6EBFF] transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4 text-[#0B1220]" />
              </a>
              <a
                href={COMPANY_INFO.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-[#BEE0FF] flex items-center justify-center hover:text-[#0B1220] hover:bg-[#D6EBFF] transition-colors shadow-sm"
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-4 h-4 text-[#0B1220]" />
              </a>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#BEE0FF] text-xs font-semibold text-[#0B1220] shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
              <span>Registered IT & AI Engineering Firm • Chennai, India</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-[#0B1220] text-xs font-bold uppercase tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-[#334155] font-medium">
              <li>
                <Link href="/" className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                  <span>Our Services</span>
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                  <span>Industries Served</span>
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                  <span>Development Process</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                  <span>About SparkIntellect</span>
                </Link>
              </li>
              <li>
                <Link href="/internships" className="hover:text-[#0B1220] font-bold text-[#0284c7] transition-colors flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>Internship Programs</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                  <span>Contact & Inquiry</span>
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                  <span>Client Support & SLA</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div className="space-y-4">
            <h3 className="text-[#0B1220] text-xs font-bold uppercase tracking-widest">
              Core Capabilities
            </h3>
            <ul className="space-y-2.5 text-sm text-[#334155] font-medium">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#0284c7]" />
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office Info */}
          <div className="space-y-4">
            <h3 className="text-[#0B1220] text-xs font-bold uppercase tracking-widest">
              Headquarters & Contact
            </h3>
            <ul className="space-y-3 text-sm text-[#334155] font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0284c7] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-[#0B1220] transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0284c7] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#0B1220] transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#0284c7] shrink-0" />
                <a href={COMPANY_INFO.website} target="_blank" rel="noreferrer" className="hover:text-[#0B1220] transition-colors">
                  sparkintellect.in
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                <span className="text-xs text-[#334155]">{COMPANY_INFO.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#BEE0FF] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#334155]">
          <p>© {new Date().getFullYear()} SparkIntellect. All rights reserved. Founded & Directed by {COMPANY_INFO.founder}.</p>
          <div className="flex items-center gap-6 font-medium">
            <Link href="/privacy" className="hover:text-[#0B1220] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#0B1220] transition-colors">
              Terms of Service
            </Link>
            <Link href="/support" className="hover:text-[#0B1220] transition-colors">
              Support Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

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
  GraduationCap,
  Lock
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
              <div className="relative w-11 h-11 rounded-xl bg-[#0B1220] p-1 shadow-md shadow-[#0B1220]/20 group-hover:scale-105 transition-transform border border-[#9FCFFB]/40 overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="SparkIntellect Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold tracking-tight text-[#0B1220]">
                  Spark<span className="text-[#0284c7] font-serif italic">Intellect</span>
                </span>
                <span className="text-[10px] text-[#334155] tracking-widest font-mono uppercase font-semibold">
                  AI • Software • Automation
                </span>
              </div>
            </Link>

            <p className="text-[#334155] text-sm leading-relaxed max-w-md">
              We build intelligent software for businesses ready to grow. SparkIntellect designs and develops AI-powered applications, enterprise platforms, and digital solutions that turn complex challenges into simple, scalable systems.
            </p>

            <div className="pt-1 flex items-center gap-3 text-[#334155]">
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-[#BEE0FF] flex items-center justify-center hover:text-[#0B1220] hover:bg-[#D6EBFF] transition-colors shadow-sm"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-[#0B1220]" />
              </a>
              <a
                href={COMPANY_INFO.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-[#BEE0FF] flex items-center justify-center hover:text-[#0B1220] hover:bg-[#D6EBFF] transition-colors shadow-sm"
                aria-label="Twitter / X"
              >
                <TwitterXIcon className="w-3.5 h-3.5 text-[#0B1220]" />
              </a>
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-[#BEE0FF] flex items-center justify-center hover:text-[#0B1220] hover:bg-[#D6EBFF] transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#0B1220]" />
              </a>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#BEE0FF] text-[11px] font-semibold text-[#0B1220] shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Registered Technology Firm • Guindy, Chennai, India</span>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-4">
            <h3 className="text-[#0B1220] text-xs font-mono font-bold uppercase tracking-widest">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs text-[#334155] font-medium">
              <li>
                <Link href="/about" className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                  <span>Work & Case Studies</span>
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                  <span>Solutions</span>
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                  <span>Industries</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                  <span>Careers</span>
                </Link>
              </li>
              <li>
                <Link href="/internships" className="hover:text-[#0B1220] font-semibold text-[#0284c7] transition-colors flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>Internships</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0284c7]" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h3 className="text-[#0B1220] text-xs font-mono font-bold uppercase tracking-widest">
              Services
            </h3>
            <ul className="space-y-2.5 text-xs text-[#334155] font-medium">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-[#0B1220] transition-colors flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#0284c7]" />
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Resources */}
          <div className="space-y-4">
            <h3 className="text-[#0B1220] text-xs font-mono font-bold uppercase tracking-widest">
              Contact & Location
            </h3>
            <ul className="space-y-3 text-xs text-[#334155] font-medium">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0284c7] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-[#0B1220] transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#0B1220] transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#0284c7] shrink-0 mt-0.5" />
                <span className="text-[11px] text-[#334155]">{COMPANY_INFO.workingHours}</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-[11px] text-[#334155] hover:text-[#0B1220] px-3 py-1.5 rounded-lg bg-white border border-[#BEE0FF] hover:bg-[#D6EBFF] transition-colors"
              >
                <Lock className="w-3 h-3 text-[#0284c7]" />
                <span>Team Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#BEE0FF] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#334155]">
          <p>© {new Date().getFullYear()} SparkIntellect. All rights reserved. Directed by {COMPANY_INFO.founder}.</p>
          <div className="flex items-center gap-6 font-medium">
            <Link href="/privacy" className="hover:text-[#0B1220] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#0B1220] transition-colors">
              Terms of Service
            </Link>
            <Link href="/support" className="hover:text-[#0B1220] transition-colors">
              Support & SLA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

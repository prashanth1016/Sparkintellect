import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, PhoneCall, Mail, GraduationCap } from "lucide-react";
import { COMPANY_INFO } from "@/data/companyData";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const CTASection: React.FC = () => {
  return (
    <SectionWrapper className="relative z-10 py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Glow Box Background */}
        <div className="relative luxury-card rounded-3xl p-8 sm:p-16 border border-[#BEE0FF] overflow-hidden text-center shadow-xl bg-gradient-to-b from-[#F2F9FF] to-white">
          
          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D6EBFF] border border-[#BEE0FF] text-xs font-semibold uppercase tracking-wider text-[#0B1220]">
              <Sparkles className="w-4 h-4 text-[#0284c7]" />
              <span>Ready for Digital Transformation?</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#0B1220] leading-tight">
              Ready to Accelerate Your Enterprise With{" "}
              <span className="text-gradient-navy italic">AI & Modern Software?</span>
            </h2>

            <p className="text-[#334155] text-base sm:text-lg leading-relaxed">
              Schedule a free consultation with Founder Prashanth S and our technical lead team. We will analyze your workflows, map architectural specs, and provide a clear execution roadmap.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm bg-[#9FCFFB] text-[#0B1220] hover:bg-[#8ec2f3] shadow-lg shadow-[#9FCFFB]/30 flex items-center justify-center gap-3 group"
              >
                <span>Request Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/internships"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm bg-[#D6EBFF] text-[#0B1220] border border-[#BEE0FF] hover:bg-[#BEE0FF] flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-[#0284c7]" />
                <span>Apply for Internships</span>
              </Link>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm bg-[#F2F9FF] text-[#0B1220] border border-[#BEE0FF] hover:bg-[#D6EBFF] flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#0284c7]" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#334155]">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Direct Mail: {COMPANY_INFO.email}</span>
              </span>
              <span>•</span>
              <span>Mon–Sat 9AM–7PM IST</span>
              <span>•</span>
              <span>Guindy, Chennai HQ</span>
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

"use client";

import React from "react";
import { Layout, Server, Bot, Database, Cloud, ShieldCheck } from "lucide-react";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";

const TECH_CATEGORIES = [
  {
    category: "Frontend",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"],
    icon: Layout,
    desc: "Lightning-fast, accessible, and responsive user interfaces.",
  },
  {
    category: "Backend",
    techs: ["Node.js", "NestJS", "FastAPI", "Python", "REST & GraphQL"],
    icon: Server,
    desc: "Type-safe, modular, and high-throughput server architectures.",
  },
  {
    category: "AI & Intelligence",
    techs: ["PyTorch", "LangChain", "OpenAI / Claude", "pgvector", "Computer Vision"],
    icon: Bot,
    desc: "Enterprise RAG pipelines, model fine-tuning, and automated agents.",
  },
  {
    category: "Databases",
    techs: ["MongoDB Atlas", "PostgreSQL", "Redis", "Mongoose"],
    icon: Database,
    desc: "ACID transactions, structured indexing, and automated backups.",
  },
  {
    category: "Cloud & Security",
    techs: ["AWS", "Render", "Docker", "Cloudflare WAF", "GitHub Actions"],
    icon: Cloud,
    desc: "Zero-downtime CI/CD, edge caching, and bank-grade security headers.",
  },
];

export const TechStackSection: React.FC = () => {
  return (
    <SectionWrapper className="py-20 bg-[#F2F9FF] border-y border-[#BEE0FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Technical Capabilities"
          title="Engineered With Modern"
          highlightTitle="Production Technologies"
          subtitle="We select battle-tested, high-performance open-source and enterprise frameworks that guarantee longevity and scalability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {TECH_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <GridStaggerItem key={cat.category} index={idx}>
                <div className="luxury-card p-6 rounded-3xl border border-[#BEE0FF] h-full flex flex-col justify-between bg-white">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#D6EBFF] border border-[#BEE0FF] flex items-center justify-center mb-4 text-[#0284c7]">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base font-bold text-[#0B1220] mb-2 font-serif">
                      {cat.category}
                    </h3>
                    
                    <p className="text-[11px] text-[#334155] leading-relaxed mb-4">
                      {cat.desc}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-[#BEE0FF]/60">
                      {cat.techs.map((tech) => (
                        <div key={tech} className="text-xs font-mono font-semibold text-[#0B1220] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GridStaggerItem>
            );
          })}
        </div>

      </div>
    </SectionWrapper>
  );
};

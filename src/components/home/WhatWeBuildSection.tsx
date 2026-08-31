"use client";

import React from "react";
import Link from "next/link";
import { 
  Bot, 
  Building2, 
  Users, 
  Layout, 
  ShoppingBag, 
  Smartphone, 
  Zap, 
  Database,
  ArrowRight
} from "lucide-react";
import { SectionWrapper, GridStaggerItem } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PRODUCTS_WE_BUILD = [
  {
    name: "AI Assistants & Copilots",
    desc: "Domain-trained chatbots, internal knowledge assistants, and voice agents for customer support and sales.",
    icon: Bot,
    category: "AI & Intelligence",
  },
  {
    name: "Custom ERP Systems",
    desc: "Tailored enterprise resource platforms for inventory, material procurement, site logs, and financial approvals.",
    icon: Building2,
    category: "Enterprise Systems",
  },
  {
    name: "CRM & Lead Platforms",
    desc: "Intelligent customer relationship managers with automated lead routing, scoring, and WhatsApp pipelines.",
    icon: Users,
    category: "Sales Automation",
  },
  {
    name: "Customer & Vendor Portals",
    desc: "Secure self-service client portals for invoice access, ticket status, progress tracking, and file exchange.",
    icon: Layout,
    category: "Web Applications",
  },
  {
    name: "E-Commerce Platforms",
    desc: "High-speed headless storefronts with instant checkout, multi-vendor support, and automated inventory sync.",
    icon: ShoppingBag,
    category: "Digital Commerce",
  },
  {
    name: "Native Mobile Applications",
    desc: "Fluid iOS and Android applications built with Flutter and React Native for on-site field staff and consumers.",
    icon: Smartphone,
    category: "Mobile Engineering",
  },
  {
    name: "Workflow Automation Engines",
    desc: "Webhook and API pipelines connecting billing, messaging, CRMs, and databases with automated error recovery.",
    icon: Zap,
    category: "Process Automation",
  },
  {
    name: "Centralized Data Platforms",
    desc: "Consolidated business intelligence pipelines, real-time analytics dashboards, and structured reporting engines.",
    icon: Database,
    category: "Data & Analytics",
  },
];

export const WhatWeBuildSection: React.FC = () => {
  return (
    <SectionWrapper className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Product Portfolio"
          title="What We Build for"
          highlightTitle="Growing Enterprises"
          subtitle="Clear, tangible business software solutions engineered for seamless adoption and high ROI."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PRODUCTS_WE_BUILD.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GridStaggerItem key={item.name} index={idx}>
                <div className="p-6 rounded-3xl bg-[#F2F9FF] border border-[#BEE0FF] hover:border-[#9FCFFB] transition-all hover:shadow-lg flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#BEE0FF] flex items-center justify-center text-[#0284c7] group-hover:bg-[#9FCFFB] group-hover:text-[#0B1220] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-[#334155] uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#0B1220] mb-2 group-hover:text-[#0284c7] transition-colors">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-[#334155] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#BEE0FF]/60 flex items-center justify-between text-xs font-semibold text-[#0B1220]">
                    <span>Custom Built</span>
                    <Link href="/contact" className="text-[#0284c7] hover:underline flex items-center gap-1">
                      <span>Request Scope</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
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

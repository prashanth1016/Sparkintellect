import React from "react";
import { Metadata } from "next";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FounderSection } from "@/components/home/FounderSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";

export const metadata: Metadata = {
  title: "SparkIntellect | Premium AI & Custom Software Firm in Chennai",
  description: "Building Intelligent Digital Solutions for Businesses. SparkIntellect specializes in Artificial Intelligence, Custom Web & Mobile Apps, E-Commerce, ERP/CRM, Cloud DevOps, and Internship Programs in Guindy, Chennai.",
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />
      
      <main className="relative z-10">
        <HeroSection />
        <StatsSection />
        <ServicesOverview />
        <IndustriesGrid />
        <WhyChooseUsSection />
        <ProcessSection />
        <FounderSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

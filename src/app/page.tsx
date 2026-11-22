import React from "react";
import { Metadata } from "next";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { WhatWeBuildSection } from "@/components/home/WhatWeBuildSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { TechStackSection } from "@/components/home/TechStackSection";
import { FounderSection } from "@/components/home/FounderSection";
import { InternshipCTASection } from "@/components/home/InternshipCTASection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";

export const metadata: Metadata = {
  title: "SparkIntellect | AI & Custom Software Engineering Firm",
  description:
    "We Build Intelligent Software for Businesses Ready to Grow. SparkIntellect engineers AI models, enterprise ERP/CRM platforms, web/mobile applications, and career-defining programs in Chennai.",
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-[#EEEAF8] text-[#2B2A6B] selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 w-full">
        <HeroSection />
        <WhatWeBuildSection />
        <WhyChooseUsSection />
        <TechStackSection />
        <FounderSection />
        <InternshipCTASection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

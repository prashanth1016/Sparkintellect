import React from "react";
import { Metadata } from "next";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { WhatWeDoSection } from "@/components/home/WhatWeDoSection";
import { WhatWeBuildSection } from "@/components/home/WhatWeBuildSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
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
    "We Build Intelligent Software for Businesses Ready to Grow. SparkIntellect engineers AI models, enterprise ERP/CRM platforms, web/mobile applications, and career-defining internships in Guindy, Chennai.",
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <WhatWeDoSection />
        <WhatWeBuildSection />
        <ServicesOverview />
        <SolutionsSection />
        <IndustriesGrid />
        <CaseStudiesSection />
        <WhyChooseUsSection />
        <ProcessSection />
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

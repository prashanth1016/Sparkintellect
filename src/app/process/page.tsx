import React from "react";
import { Metadata } from "next";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Engineering Process & Roadmap | SparkIntellect",
  description: "Learn about SparkIntellect's 7-step agile engineering roadmap from requirement discovery to zero-downtime cloud deployment.",
};

export default function ProcessPage() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#EEEAF8] text-[#2B2A6B] selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-28 w-full max-w-full overflow-x-hidden">
        <ProcessSection />
        <CTASection />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

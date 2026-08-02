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
  description: "Learn about SparkIntellect's 9-step agile engineering roadmap from requirement discovery to zero-downtime cloud deployment.",
};

export default function ProcessPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0B1220] selection:bg-[#9FCFFB] selection:text-[#0B1220]">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10 pt-20">
        <ProcessSection />
        <CTASection />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}

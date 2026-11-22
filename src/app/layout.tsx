import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { OfflineBanner } from "@/components/ui/OfflineBanner";
import { NavigationProgress } from "@/components/ui/NavigationProgress";

const runiga = localFont({
  src: "./fonts/Runiga.otf",
  variable: "--font-runiga",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#EEEAF8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sparkintellect.in"),
  title: {
    default: "SparkIntellect | AI & Custom Software Engineering Firm",
    template: "%s | SparkIntellect",
  },
  description:
    "Building Intelligent Digital Solutions for Businesses. Founded & Directed by Mr. Prashanth in Chennai. Premium AI, Software, Web, Mobile, Cloud & Career Programs.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  keywords: [
    "SparkIntellect",
    "Mr. Prashanth",
    "AI Company Chennai",
    "AI Internships Chennai",
    "Custom Software Development",
    "Next.js App Development",
    "Flutter Mobile App",
    "ERP Software Chennai",
  ],
  authors: [{ name: "Mr. Prashanth", url: "https://sparkintellect.in" }],
  creator: "SparkIntellect",
  publisher: "SparkIntellect",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "SparkIntellect | Premium AI & Software Engineering",
    description:
      "Enterprise AI models, custom web/mobile platforms, e-commerce, ERP/CRM portals, and workflow automation.",
    url: "https://sparkintellect.in",
    siteName: "SparkIntellect",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SparkIntellect",
    url: "https://sparkintellect.in",
    logo: "https://sparkintellect.in/images/sparkintellect-logo-v2.png",
    description: "AI-first technology solutions company building custom software, AI models, web & mobile apps.",
    founder: {
      "@type": "Person",
      name: "Mr. Prashanth",
      jobTitle: "Founder & CEO",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chennai HQ",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "India",
    },
    telephone: "+918977177634",
    email: "info@sparkintellect.in",
    openingHours: "Mo-Sa 09:00-19:00",
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${runiga.variable} h-full w-full antialiased dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full w-full flex flex-col bg-[#EEEAF8] text-[#2B2A6B] selection:bg-[#2B2A6B] selection:text-[#EEEAF8]">
        <NavigationProgress />
        {children}
        <OfflineBanner />
      </body>
    </html>
  );
}

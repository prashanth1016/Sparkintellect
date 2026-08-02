import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
    "Building Intelligent Digital Solutions for Businesses. Founded & Directed by Prashanth S in Guindy, Chennai. Premium AI, Software, Web, Mobile, Cloud & Internship Programs.",
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
    "Prashanth S",
    "AI Company Chennai",
    "AI Internships Chennai",
    "Custom Software Development",
    "Next.js App Development",
    "Flutter Mobile App",
    "ERP Software Chennai",
  ],
  authors: [{ name: "Prashanth S", url: "https://sparkintellect.in" }],
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
    logo: "https://sparkintellect.in/logo.png",
    description: "AI-first technology solutions company building custom software, AI models, web & mobile apps.",
    founder: {
      "@type": "Person",
      name: "Prashanth S",
      jobTitle: "Founder & Director",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Guindy",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "India",
    },
    telephone: "+918977177634",
    email: "info@sparkintellect.in",
    openingHours: "Mo-Sa 09:00-19:00",
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#0B1220] font-sans selection:bg-[#9FCFFB] selection:text-[#0B1220]">
        {children}
      </body>
    </html>
  );
}

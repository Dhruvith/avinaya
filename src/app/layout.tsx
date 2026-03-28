import type { Metadata } from "next";
import "./globals.css";

/* ============================
   Metadatos SEO completos con Open Graph y Twitter Cards
   Incluye datos estructurados JSON-LD para Google
   ============================ */
export const metadata: Metadata = {
  title: "Avinya — AI Marketing That Works While You Sleep | Hyderabad",
  description:
    "Transform your marketing with AI. Avinya builds automated systems that generate leads, nurture customers, and drive revenue 24/7. WhatsApp chatbots, content engines & lead gen automation for Indian SMBs.",
  keywords:
    "AI Marketing Agency India, AI automation Hyderabad, WhatsApp chatbot, lead generation AI, marketing automation India, D2C marketing, SMB automation",
  openGraph: {
    title: "Avinya — AI Marketing That Works While You Sleep",
    description:
      "We build AI systems that feel human. Automated marketing, lead gen, and chatbots for Indian businesses. Start with a free pilot.",
    type: "website",
    locale: "en_IN",
    siteName: "Avinya AI Studio",
    url: "https://avinya-flame.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avinya — AI Marketing That Works While You Sleep",
    description:
      "Automated marketing systems for Indian SMBs. WhatsApp chatbots, AI content, lead gen — all on autopilot.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* Datos estructurados JSON-LD para Google Rich Results */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Avinya AI Studio",
    description: "AI Marketing & Automation Studio based in Hyderabad, India",
    url: "https://avinya-flame.vercel.app",
    email: "dhruvith2004@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    sameAs: [],
    foundingDate: "2024",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: [
      "AI Marketing Automation",
      "WhatsApp Chatbot Development",
      "Lead Generation",
      "Content Automation",
    ],
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Precarga de fuentes para mejor rendimiento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Datos estructurados para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Skip link para accesibilidad — permite saltar al contenido */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

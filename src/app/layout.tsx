import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avinya | AI Marketing Systems for Indian Growth Teams",
  description:
    "Avinya designs premium AI marketing systems, WhatsApp automation, and lead-generation funnels for modern Indian brands.",
  openGraph: {
    title: "Avinya | AI Marketing Systems",
    description:
      "Premium AI automation, content systems, and revenue-focused growth infrastructure for Indian brands.",
    locale: "en_IN",
    siteName: "Avinya",
    type: "website",
    url: "https://avinya-flame.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avinya | AI Marketing Systems",
    description:
      "AI content, WhatsApp automation, and premium growth systems for Indian businesses.",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Avinya",
    url: "https://avinya-flame.vercel.app",
    description:
      "AI marketing and automation studio for Indian growth teams.",
    areaServed: "India",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    email: "dhruvith2004@gmail.com",
    serviceType: [
      "AI marketing systems",
      "WhatsApp automation",
      "Lead generation automation",
      "Content operations",
    ],
  };

  return (
    <html lang="en-IN" className="h-full antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

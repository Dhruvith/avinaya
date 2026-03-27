import type { Metadata } from "next";
import "./globals.css";

/* ============================
   Metadatos SEO para la página
   ============================ */
export const metadata: Metadata = {
  title: "Avinya — The AI Marketing & Automation Studio | Hyderabad",
  description:
    "Avinya builds AI-powered marketing systems, chatbots, and automation pipelines for Indian SMBs, D2C brands, coaching institutes, and real estate businesses. Based in Hyderabad.",
  keywords:
    "AI Marketing Agency India, AI automation Hyderabad, WhatsApp chatbot, lead generation AI, marketing automation India",
  openGraph: {
    title: "Avinya — The AI Marketing & Automation Studio",
    description:
      "We build AI systems that feel human. Marketing automation, lead gen, and chatbots for Indian businesses.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

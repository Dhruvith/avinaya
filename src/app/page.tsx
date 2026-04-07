"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import CursorBlob from "@/components/CursorBlob";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ProofSection from "@/components/ProofSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="page-shell">
      <AnimatePresence>{isLoading ? <LoadingScreen /> : null}</AnimatePresence>
      <div className="grain-overlay" aria-hidden="true" />
      <CursorBlob />
      <Navbar />

      <main id="main-content">
        <HeroSection />
        <TrustBar />
        <div className="section-divider" />
        <ServicesSection />
        <div className="section-divider" />
        <ProcessSection />
        <div className="section-divider" />
        <ProofSection />
        <div className="section-divider" />
        <PricingSection />
        <div className="section-divider" />
        <ContactSection />
        <div className="section-divider" />
        <FAQSection />
      </main>

      <a href="#contact" className="mobile-cta button-primary focus-ring">
        Book Free Strategy Call
      </a>

      <Footer />
    </div>
  );
}

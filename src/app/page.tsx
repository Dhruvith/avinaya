"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

/* ============================================
   Componentes importados de archivos separados
   ============================================ */
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

  /* Temporizador para ocultar la pantalla de carga después de 3 segundos */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Pantalla de carga con efecto typewriter */}
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {/* Textura de grano sobre toda la página */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Blob que sigue al cursor */}
      <CursorBlob />

      {/* Navegación fija superior con glassmorphism */}
      <Navbar />

      {/* Contenido principal de la página — id para skip-link */}
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

      <Footer />
    </>
  );
}

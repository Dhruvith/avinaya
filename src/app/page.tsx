"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

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




      {/* Navegación fija superior */}
      <Navbar />

      {/* Contenido principal de la página */}
      <main>
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <ProcessSection />
        <ProofSection />
        <PricingSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================
   Navegación fija con menú hamburguesa
   En mobile se convierte en nav tipo "pill"
   ============================ */

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#proof", label: "Results" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /* Detectar scroll para cambiar estilo de la nav */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="floating-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 3 }}
        style={{
          background: isScrolled
            ? "rgba(15, 15, 26, 0.95)"
            : "rgba(15, 15, 26, 0.6)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2"
            aria-label="Avinya Home"
          >
            <span
              className="text-2xl font-bold tracking-wider"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--terracotta)",
              }}
            >
              AVINYA
            </span>
            <span
              className="text-[0.6rem] font-medium tracking-widest uppercase opacity-50 hidden sm:block"
              style={{ color: "var(--cream)" }}
            >
              AI Studio
            </span>
          </a>

          {/* Links de escritorio */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-300 hover:opacity-100 opacity-60"
                style={{ color: "var(--cream)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="magnetic-btn text-sm"
              style={{ padding: "0.6rem 1.5rem", animation: "none" }}
            >
              Start Your Pilot
            </a>
          </div>

          {/* Botón hamburguesa para mobile */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            <motion.span
              animate={isMobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 rounded-full"
              style={{ background: "var(--cream)" }}
            />
            <motion.span
              animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 rounded-full"
              style={{ background: "var(--cream)" }}
            />
            <motion.span
              animate={
                isMobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
              className="block w-6 h-0.5 rounded-full"
              style={{ background: "var(--cream)" }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Menú mobile expandido */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8"
            style={{ background: "rgba(15, 15, 26, 0.98)" }}
          >
            {NAV_LINKS.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-2xl font-semibold"
                style={{ color: "var(--cream)" }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setIsMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="magnetic-btn mt-4"
            >
              Start Your Pilot
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

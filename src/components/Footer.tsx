"use client";

import { motion } from "framer-motion";

/* ============================
   Footer con coordenadas de Hyderabad
   "Made with ☕ in Hyderabad"
   Incluye el sello de imperfección como elemento relativo
   ============================ */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-16 relative"
      style={{
        borderTop: "1px solid rgba(244, 241, 222, 0.05)",
        background: "linear-gradient(to bottom, transparent, rgba(224, 122, 95, 0.03))",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Columna 1: Logo y descripción */}
          <div>
            <h3
              className="text-2xl font-bold tracking-wider mb-3"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--terracotta)",
              }}
            >
              AVINYA
            </h3>
            <p className="text-sm opacity-50 leading-relaxed max-w-xs">
              The AI Marketing & Automation Studio. Building systems that
              generate results while you focus on what matters.
            </p>

            {/* Sello de imperfección como parte del footer */}
            <div
              className="mt-6 inline-block"
              style={{
                transform: "rotate(-4deg)",
                border: "2px solid var(--terracotta)",
                padding: "0.4rem 0.8rem",
                fontSize: "0.6rem",
                fontWeight: 700,
                color: "var(--terracotta)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                opacity: 0.6,
              }}
              aria-hidden="true"
            >
              Built by engineers, not suits
            </div>
          </div>

          {/* Columna 2: Links rápidos */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 opacity-40">
              Navigate
            </h4>
            <div className="space-y-3">
              {[
                { href: "#services", label: "Services" },
                { href: "#process", label: "Process" },
                { href: "#proof", label: "Results" },
                { href: "#pricing", label: "Pricing" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm opacity-50 hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "var(--cream)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 opacity-40">
              Reach Out
            </h4>
            <div className="space-y-3 text-sm opacity-50">
              <p>dhruvith2004@gmail.com</p>
              <p>Hyderabad, Telangana</p>
              <p>India 🇮🇳</p>
            </div>
          </div>
        </div>

        {/* Línea divisora */}
        <div
          className="h-[1px] mb-8"
          style={{ background: "rgba(244, 241, 222, 0.05)" }}
        />

        {/* Línea inferior con coordenadas y copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-30">
            Made with ☕ in Hyderabad
          </p>

          {/* Coordenadas de Hyderabad como toque especial */}
          <motion.p
            className="text-[0.65rem] font-mono opacity-20 tracking-wider"
            whileHover={{ opacity: 0.5 }}
          >
            17.4065° N, 78.4772° E
          </motion.p>

          <p className="text-[0.7rem] opacity-20">
            © {currentYear} Avinya AI Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion } from "framer-motion";

/* ============================
   Footer expandido — 4 columnas con links sociales,
   newsletter, el sello de "engineers", badge "Made in India"
   ============================ */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-16 relative"
      style={{
        borderTop: "1px solid rgba(244, 241, 222, 0.05)",
        background: "linear-gradient(to bottom, transparent, rgba(10, 10, 15, 0.5))",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Columna 1: Logo, descripción y sello */}
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
            <p className="text-sm opacity-50 leading-relaxed max-w-xs mb-4">
              The AI Marketing & Automation Studio. Building systems that
              generate results while you focus on what matters.
            </p>

            {/* Sello de imperfección */}
            <div
              className="inline-block"
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
                { href: "#faq", label: "FAQ" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm opacity-50 hover:opacity-100 transition-opacity duration-300 animated-underline"
                  style={{ color: "var(--cream)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Columna 3: Contacto y social */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 opacity-40">
              Connect
            </h4>
            <div className="space-y-3 text-sm opacity-50 mb-6">
              <p>dhruvith2004@gmail.com</p>
              <p>Hyderabad, Telangana</p>
              <p>India 🇮🇳</p>
            </div>

            {/* Social media icons */}
            <div className="flex gap-3">
              {[
                { name: "LinkedIn", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { name: "Twitter", path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
                { name: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--cream)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-60"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Columna 4: Garantías y badges */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 opacity-40">
              Guarantees
            </h4>
            <div className="space-y-3">
              {[
                { icon: "🛡️", text: "14-day money-back guarantee" },
                { icon: "📝", text: "No long-term contracts" },
                { icon: "🔒", text: "Your data stays private, always" },
                { icon: "⚡", text: "2-hour WhatsApp response time" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-sm opacity-50"
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
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

          {/* Coordenadas de Hyderabad */}
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

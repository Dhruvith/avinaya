"use client";

/* ============================
   Barra de confianza con marquesina infinita
   Solo tipografía, sin logos corporativos
   ============================ */

const TRUST_ITEMS = [
  "63M+ Indian SMBs",
  "25% Digital Ad Growth YoY",
  "Hyderabad Tech Hub",
  "₹2.1T Digital Economy",
  "40% More WhatsApp Commerce",
  "AI-First Marketing",
  "Zero Cookie-Cutter Solutions",
  "Built for Indian Businesses",
];

export default function TrustBar() {
  /* Se duplica el array para crear el loop infinito visual */
  const duplicatedItems = [...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <section
      className="py-6 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(244, 241, 222, 0.05)",
        borderBottom: "1px solid rgba(244, 241, 222, 0.05)",
      }}
      aria-label="Trust indicators"
    >
      <div className="marquee-container">
        <div className="marquee-content">
          {duplicatedItems.map((item, index) => (
            <span key={index}>
              {item}
              <span
                className="inline-block mx-6 text-lg"
                style={{ color: "var(--terracotta)", opacity: 0.4 }}
              >
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

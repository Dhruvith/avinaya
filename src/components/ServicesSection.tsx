"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ============================
   Sección de servicios — Tarjetas con íconos SVG profesionales
   Glassmorphism hover, scroll horizontal, comparación de precios
   ============================ */

interface ServiceData {
  number: string;
  title: string;
  description: string;
  price: string;
  traditionalPrice: string;
  features: string[];
  iconColor: string;
  iconBg: string;
}

const SERVICES: ServiceData[] = [
  {
    number: "01",
    title: "AI Content Engine",
    description:
      "Automated content creation powered by GPT-4. Blog posts, social media, ad copy — all in your brand voice.",
    price: "₹10K–18K/mo",
    traditionalPrice: "₹40K–80K/mo",
    features: ["30+ posts/month", "SEO-optimized blogs", "Ad copy variants", "Brand voice training"],
    iconColor: "var(--terracotta)",
    iconBg: "rgba(224, 122, 95, 0.15)",
  },
  {
    number: "02",
    title: "Lead Gen Automation",
    description:
      "End-to-end lead capture and nurturing. From Meta ads to CRM entry — zero manual work.",
    price: "₹15K–30K/mo",
    traditionalPrice: "₹60K–1.2L/mo",
    features: ["Meta/Google Ads setup", "Landing page builder", "Auto lead scoring", "CRM integration"],
    iconColor: "var(--sage)",
    iconBg: "rgba(129, 178, 154, 0.15)",
  },
  {
    number: "03",
    title: "WhatsApp Chatbots",
    description:
      "Intelligent chatbots that handle inquiries, bookings, and support. Feels like talking to a real person.",
    price: "₹25K–75K",
    traditionalPrice: "₹1.5L–3L",
    features: ["24/7 automated replies", "Booking & payments", "Multi-language support", "Human handoff"],
    iconColor: "var(--muted-coral)",
    iconBg: "rgba(242, 204, 143, 0.15)",
  },
  {
    number: "04",
    title: "Full Stack Automation",
    description:
      "Complete marketing automation. CRM, email sequences, analytics dashboards — the whole system.",
    price: "₹50K–2L",
    traditionalPrice: "₹3L–8L",
    features: ["n8n workflows", "Email sequences", "Analytics dashboard", "Custom integrations"],
    iconColor: "#a78bfa",
    iconBg: "rgba(167, 139, 250, 0.15)",
  },
];

/* Íconos SVG profesionales en lugar de emojis */
function ServiceIcon({ index, color }: { index: number; color: string }) {
  const icons = [
    /* 01: Content — Pluma/lápiz */
    <svg key="content" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>,
    /* 02: Lead Gen — Embudo */
    <svg key="leadgen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
    </svg>,
    /* 03: Chatbot — Burbuja de chat */
    <svg key="chatbot" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" />
    </svg>,
    /* 04: Automation — Engranaje */
    <svg key="automation" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.49 8.49 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.49-8.49 2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>,
  ];
  return icons[index] || icons[0];
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Encabezado de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px]" style={{ background: "var(--sage)" }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--sage)" }}
            >
              What We Build
            </span>
          </div>
          <h2
            className="text-4xl md:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--cream)" }}
          >
            Systems, not<br />
            <span className="gradient-text">services</span>.
          </h2>
          <p className="mt-4 text-lg opacity-60 max-w-lg">
            We don&apos;t sell hours. We build machines that generate results
            while you focus on what matters.
          </p>
        </motion.div>

        {/* Contenedor de scroll horizontal con tarjetas */}
        <div className="services-scroll">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="service-card"
            >
              {/* Overlay de efecto glitch al hacer hover */}
              <div className="glitch-preview" />

              {/* Ícono SVG con fondo gradiente en lugar de emojis */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className="service-icon-container"
                  style={{ background: service.iconBg }}
                >
                  <ServiceIcon index={index} color={service.iconColor} />
                </div>
                <span
                  className="text-4xl font-bold opacity-10"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service.number}
                </span>
              </div>

              {/* Título y descripción */}
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "var(--cream)" }}
              >
                {service.title}
              </h3>
              <p className="text-sm opacity-60 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Lista de características con checkmarks */}
              <div className="mb-6 space-y-2 flex-grow">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2.5 text-sm">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                      <path
                        d="M13.5 4.5L6 12L2.5 8.5"
                        stroke={service.iconColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="opacity-70">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Comparación de precios */}
              <div
                className="pt-4 mt-auto"
                style={{ borderTop: "1px solid rgba(244, 241, 222, 0.08)" }}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-lg font-bold"
                    style={{ color: service.iconColor }}
                  >
                    {service.price}
                  </span>
                  <span className="text-sm line-through opacity-30">
                    {service.traditionalPrice}
                  </span>
                </div>
                <span className="text-[0.65rem] opacity-40 mt-1 block">
                  vs traditional agency
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hint de scroll horizontal en mobile */}
        <div className="mt-6 flex items-center justify-center gap-2 opacity-30 md:hidden">
          <span className="text-xs">Swipe to explore</span>
          <span>→</span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ============================
   Sección de servicios con scroll horizontal
   Tarjetas numeradas 01-04 con efecto glitch hover
   ============================ */

interface ServiceData {
  number: string;
  title: string;
  description: string;
  price: string;
  traditionalPrice: string;
  features: string[];
  icon: string;
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
    icon: "✍️",
  },
  {
    number: "02",
    title: "Lead Gen Automation",
    description:
      "End-to-end lead capture and nurturing. From Meta ads to CRM entry — zero manual work.",
    price: "₹15K–30K/mo",
    traditionalPrice: "₹60K–1.2L/mo",
    features: ["Meta/Google Ads setup", "Landing page builder", "Auto lead scoring", "CRM integration"],
    icon: "🎯",
  },
  {
    number: "03",
    title: "WhatsApp Chatbots",
    description:
      "Intelligent chatbots that handle inquiries, bookings, and support. Feels like talking to a real person.",
    price: "₹25K–75K",
    traditionalPrice: "₹1.5L–3L",
    features: ["24/7 automated replies", "Booking & payments", "Multi-language support", "Human handoff"],
    icon: "💬",
  },
  {
    number: "04",
    title: "Full Stack Automation",
    description:
      "Complete marketing automation. CRM, email sequences, analytics dashboards, workflow automation — the whole system.",
    price: "₹50K–2L",
    traditionalPrice: "₹3L–8L",
    features: ["n8n workflows", "Email sequences", "Analytics dashboard", "Custom integrations"],
    icon: "⚡",
  },
];

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
            <span style={{ color: "var(--terracotta)" }}>services</span>.
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

              {/* Número e ícono */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-5xl font-bold opacity-10"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service.number}
                </span>
                <span className="text-3xl">{service.icon}</span>
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

              {/* Lista de características */}
              <div className="mb-6 space-y-2">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--sage)" }}
                    />
                    <span className="opacity-70">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Comparación de precios */}
              <div
                className="pt-4"
                style={{ borderTop: "1px solid rgba(244, 241, 222, 0.1)" }}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-lg font-bold"
                    style={{ color: "var(--terracotta)" }}
                  >
                    {service.price}
                  </span>
                  <span className="text-sm line-through opacity-30">
                    {service.traditionalPrice}
                  </span>
                </div>
                <span
                  className="text-[0.65rem] opacity-40 mt-1 block"
                >
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

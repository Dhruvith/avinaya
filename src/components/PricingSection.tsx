"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ============================
   Sección de pricing con 3 tiers
   Toggle: Monthly/Quarterly (10% descuento)
   Barras de progreso visual vs agencia tradicional
   ============================ */

interface PricingTier {
  name: string;
  subtitle: string;
  monthlyPrice: string;
  quarterlyPrice: string;
  features: string[];
  timeSaved: number;
  costSaved: number;
  featured: boolean;
}

const TIERS: PricingTier[] = [
  {
    name: "Starter",
    subtitle: "Perfect for testing the waters",
    monthlyPrice: "₹8K–15K",
    quarterlyPrice: "₹7.2K–13.5K",
    features: [
      "AI content for 2 platforms",
      "Basic WhatsApp autoresponder",
      "Monthly performance report",
      "Email support",
      "1 automation workflow",
    ],
    timeSaved: 45,
    costSaved: 60,
    featured: false,
  },
  {
    name: "Growth",
    subtitle: "Where the real results begin",
    monthlyPrice: "₹18K–25K",
    quarterlyPrice: "₹16.2K–22.5K",
    features: [
      "AI content for all platforms",
      "Advanced WhatsApp chatbot",
      "Lead gen + CRM integration",
      "Bi-weekly strategy calls",
      "5 automation workflows",
      "Custom analytics dashboard",
      "Priority support",
    ],
    timeSaved: 72,
    costSaved: 78,
    featured: true,
  },
  {
    name: "Enterprise",
    subtitle: "For businesses ready to dominate",
    monthlyPrice: "₹40K+",
    quarterlyPrice: "₹36K+",
    features: [
      "Everything in Growth",
      "Dedicated AI strategist",
      "Unlimited automation flows",
      "Custom integrations",
      "White-label chatbot",
      "24/7 priority support",
      "Quarterly business reviews",
      "Custom AI model training",
    ],
    timeSaved: 90,
    costSaved: 85,
    featured: false,
  },
];

export default function PricingSection() {
  const [isQuarterly, setIsQuarterly] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px]" style={{ background: "var(--sage)" }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--sage)" }}
            >
              Investment
            </span>
            <div className="w-8 h-[2px]" style={{ background: "var(--sage)" }} />
          </div>
          <h2
            className="text-4xl md:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--cream)" }}
          >
            Transparent pricing.<br />
            <span className="gradient-text-sage">No surprises.</span>
          </h2>
          <p className="mt-4 text-lg opacity-60 max-w-lg mx-auto">
            Choose the plan that fits your ambition. All plans include a 
            2-week pilot period.
          </p>
          <p className="mt-2 text-sm opacity-40 max-w-lg mx-auto">
            💰 14-day money-back guarantee • No long-term contracts
          </p>

          {/* Toggle Monthly/Quarterly */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div
              className="toggle-switch"
              onClick={() => setIsQuarterly(!isQuarterly)}
              role="switch"
              aria-checked={isQuarterly}
              tabIndex={0}
              id="pricing-toggle"
            >
              <div
                className={`toggle-slider ${isQuarterly ? "quarterly" : ""}`}
              />
              <span className={`toggle-label ${!isQuarterly ? "active" : ""}`}>
                Monthly
              </span>
              <span className={`toggle-label ${isQuarterly ? "active" : ""}`}>
                Quarterly
              </span>
            </div>
            {isQuarterly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: "var(--sage)", color: "var(--darker-bg)" }}
              >
                Save 10%
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Grid de tarjetas de pricing con padding superior para el badge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start pt-4">
          {TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className={`pricing-card ${tier.featured ? "featured" : ""}`}
            >
              {/* Nombre del plan */}
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: "var(--cream)" }}
              >
                {tier.name}
              </h3>
              <p className="text-sm opacity-50 mb-6">{tier.subtitle}</p>

              {/* Precio dinámico según toggle */}
              <div className="mb-8">
                <span
                  className="text-3xl font-bold"
                  style={{
                    color: tier.featured ? "var(--terracotta)" : "var(--cream)",
                  }}
                >
                  {isQuarterly ? tier.quarterlyPrice : tier.monthlyPrice}
                </span>
                <span className="text-sm opacity-40 ml-2">/month</span>
              </div>

              {/* Lista de características — flex-grow para empujar CTA al fondo */}
              <div className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M13.5 4.5L6 12L2.5 8.5"
                        stroke={tier.featured ? "var(--terracotta)" : "var(--sage)"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm opacity-70">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Barras de progreso: Time Saved vs Traditional */}
              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex justify-between text-[0.7rem] mb-1">
                    <span className="opacity-50">Time Saved vs Traditional</span>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--sage)" }}
                    >
                      {tier.timeSaved}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${tier.timeSaved}%` } : {}}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                      style={{ background: "var(--sage)" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[0.7rem] mb-1">
                    <span className="opacity-50">Cost Saved vs Agency</span>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--terracotta)" }}
                    >
                      {tier.costSaved}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${tier.costSaved}%` } : {}}
                      transition={{ duration: 1.5, delay: 0.7 + index * 0.2 }}
                      style={{ background: "var(--terracotta)" }}
                    />
                  </div>
                </div>
              </div>

              {/* Botón CTA — mt-auto asegura alineación al fondo */}
              <a
                href="#contact"
                className={`block text-center py-3.5 px-6 rounded-full font-semibold text-sm transition-all duration-300 mt-auto ${
                  tier.featured
                    ? "hover:shadow-lg hover:shadow-terracotta/20"
                    : "hover:opacity-80"
                }`}
                style={{
                  background: tier.featured
                    ? "var(--terracotta)"
                    : "rgba(244, 241, 222, 0.1)",
                  color: "var(--cream)",
                  border: tier.featured
                    ? "none"
                    : "1px solid rgba(244, 241, 222, 0.15)",
                }}
              >
                {tier.featured ? "Start Free Pilot →" : "Learn More"}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

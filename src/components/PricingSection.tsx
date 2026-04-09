"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const TIERS = [
  {
    name: "Starter",
    subtitle: "For teams proving the first growth loop",
    monthly: "Rs 10K-18K",
    quarterly: "Rs 9K-16.2K",
    cta: "View Details",
    featured: false,
    features: [
      "AI content support for 2 channels",
      "One conversion workflow",
      "Monthly reporting review",
      "WhatsApp autoresponder",
    ],
  },
  {
    name: "Growth",
    subtitle: "For brands ready to compound every month",
    monthly: "Rs 18K-25K",
    quarterly: "Rs 16.2K-22.5K",
    cta: "Start Free Pilot",
    featured: true,
    features: [
      "Full-funnel content system",
      "Lead capture plus CRM handoff",
      "Advanced WhatsApp chatbot",
      "Custom dashboard and reporting",
      "Bi-weekly strategy review",
    ],
  },
  {
    name: "Enterprise",
    subtitle: "For higher-volume brands and multi-channel teams",
    monthly: "Rs 40K+",
    quarterly: "Rs 36K+",
    cta: "View Details",
    featured: false,
    features: [
      "Everything in Growth",
      "Custom integrations",
      "Dedicated strategist",
      "Expanded automation coverage",
      "Priority implementation support",
    ],
  },
];

export default function PricingSection() {
  const [isQuarterly, setIsQuarterly] = useState(false);

  return (
    <section id="pricing" className="section-shell">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="section-heading text-center">
          <div className="mx-auto eyebrow">Investment</div>
          <h2>
            Clear pricing. <br className="hidden sm:block" />
            Stronger value signal.
          </h2>
          <p className="mx-auto">
            The pricing structure is intentionally easy to compare, with the free
            pilot positioned up front and the value gap against traditional agency retainers made obvious.
          </p>

          <div className="mt-2 flex justify-center">
            <div className="pricing-switch" id="pricing-toggle" role="group" aria-label="Pricing period toggle">
              <button
                type="button"
                className={isQuarterly ? "" : "active"}
                aria-pressed={!isQuarterly}
                onClick={() => setIsQuarterly(false)}
              >
                Monthly
              </button>
              <button
                type="button"
                className={isQuarterly ? "active" : ""}
                aria-pressed={isQuarterly}
                onClick={() => setIsQuarterly(true)}
              >
                Quarterly
              </button>
            </div>
          </div>

          {isQuarterly ? (
            <div className="mx-auto mt-4 w-fit rounded-full bg-[var(--success-soft)] px-4 py-2 text-sm font-bold text-[var(--success)]">
              Save 10%
            </div>
          ) : null}
        </div>

        <div className="pricing-grid">
          {TIERS.map((tier, index) => (
            <motion.article
              key={tier.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={`pricing-card ${tier.featured ? "featured" : ""}`}
            >
              <div>
                <h3 className="text-3xl font-extrabold tracking-[-0.04em] text-[var(--text)]">{tier.name}</h3>
                <p className="mt-2 text-[15px] text-[var(--text-soft)]">{tier.subtitle}</p>
              </div>

              <div>
                <div className="text-4xl font-extrabold tracking-[-0.06em] text-[var(--text)]">
                  {isQuarterly ? tier.quarterly : tier.monthly}
                </div>
                <div className="mt-2 text-sm font-semibold text-[var(--text-muted)]">per month equivalent</div>
              </div>

              <div className="comparison-table">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-[var(--text-soft)]">Free pilot</span>
                  <span className="text-sm font-extrabold text-[var(--text)]">Included</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-[var(--text-soft)]">Traditional agency</span>
                  <span className="text-sm font-extrabold text-[var(--text)]">Rs 40K-80K+</span>
                </div>
              </div>

              <ul className="pricing-list">
                {tier.features.map((feature) => (
                  <li key={feature}>
                    <CheckMark />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={tier.featured ? "button-primary focus-ring" : "button-secondary focus-ring"}
              >
                {tier.cta}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13 4.5L6.4 11L3 7.6"
        stroke="var(--brand)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

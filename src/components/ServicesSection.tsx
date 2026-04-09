"use client";

import { motion } from "framer-motion";

type Service = {
  title: string;
  description: string;
  price: string;
  agencyPrice: string;
  saving: string;
  features: string[];
  accent: string;
  background: string;
  className: string;
  featured?: boolean;
};

const SERVICES: Service[] = [
  {
    title: "AI Content Engine",
    description:
      "Editorial systems that generate campaigns, landing copy, and ads in your tone without sounding templated.",
    price: "Rs 10K-18K / mo",
    agencyPrice: "Traditional agency: Rs 40K-80K / mo",
    saving: "Save up to 60%",
    features: ["30+ assets per month", "Brand voice training", "SEO-led planning", "Creative testing loops"],
    accent: "#1f6fff",
    background: "rgba(31, 111, 255, 0.12)",
    className: "lg:col-span-7",
    featured: true,
  },
  {
    title: "Lead Gen Automation",
    description:
      "Paid traffic to CRM handoff with qualification, follow-up logic, and hand-raise alerts for your sales team.",
    price: "Rs 15K-30K / mo",
    agencyPrice: "Traditional agency: Rs 60K-1.2L / mo",
    saving: "Save up to 55%",
    features: ["Meta and Google handoff", "Lead scoring", "CRM routing", "Call booking automation"],
    accent: "#13795b",
    background: "rgba(19, 121, 91, 0.12)",
    className: "lg:col-span-5",
  },
  {
    title: "WhatsApp Chatbots",
    description:
      "Conversational flows that answer, qualify, book, and escalate with a more human cadence than most support funnels.",
    price: "Rs 25K-75K",
    agencyPrice: "Traditional build: Rs 1.5L-3L",
    saving: "Launch faster, support better",
    features: ["FAQ and objection handling", "Catalog or booking logic", "Multilingual response trees", "Human takeover routing"],
    accent: "#d98c3f",
    background: "rgba(217, 140, 63, 0.14)",
    className: "lg:col-span-5",
  },
  {
    title: "Full Stack Growth Systems",
    description:
      "A joined-up operating layer across CRM, nurture, analytics, reporting, and internal automation so growth compounds cleanly.",
    price: "Rs 50K-2L",
    agencyPrice: "Traditional team: Rs 3L-8L",
    saving: "Replace fragmented ops",
    features: ["Custom dashboards", "Revenue reporting", "Email and WhatsApp journeys", "Cross-tool automation"],
    accent: "#6b4eff",
    background: "rgba(107, 78, 255, 0.12)",
    className: "lg:col-span-7",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-shell">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="section-heading">
          <div className="eyebrow">What we build</div>
          <h2>
            Premium systems, <br className="hidden sm:block" />
            not recycled services.
          </h2>
          <p>
            Each offer is designed to remove manual drag, sharpen conversion, and
            make your marketing feel more polished than the average outsourced stack.
          </p>
        </div>

        <div className="service-grid">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={`service-card ${service.className} ${service.featured ? "featured" : ""}`}
            >
              <div className="service-meta">
                <div
                  className="service-icon"
                  style={{ background: service.background, color: service.accent }}
                  aria-hidden="true"
                >
                  <SparkIcon />
                </div>
                <span className="comparison-chip" style={{ background: service.background, color: service.accent }}>
                  {service.saving}
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-extrabold tracking-[-0.04em] text-[var(--text)]">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[15px] text-[var(--text-soft)]">
                  {service.description}
                </p>
              </div>

              <ul className="service-list">
                {service.features.map((feature) => (
                  <li key={feature}>
                    <CheckIcon color={service.accent} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="price-band">
                <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                  <div className="text-2xl font-extrabold tracking-[-0.04em] text-[var(--text)]">
                    {service.price}
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-muted)]">
                    {service.agencyPrice}
                  </div>
                </div>
                <div className="comparison-table">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-[var(--text-soft)]">Avinya</span>
                    <span className="text-sm font-extrabold text-[var(--text)]">{service.price}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-[var(--text-soft)]">Traditional agency</span>
                    <span className="text-sm font-extrabold text-[var(--text)]">{service.agencyPrice.replace("Traditional agency: ", "")}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SparkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L13.8 7.2L19 9L13.8 10.8L12 16L10.2 10.8L5 9L10.2 7.2L12 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M18 15L18.8 17.2L21 18L18.8 18.8L18 21L17.2 18.8L15 18L17.2 17.2L18 15Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13 4.5L6.4 11L3 7.6"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

"use client";

import { motion } from "framer-motion";

const RESULTS = [
  {
    metric: "150 leads / month",
    label: "Education brand",
    description:
      "WhatsApp bot plus paid handoff replaced scattered manual follow-up and created a predictable enquiry stream.",
    tech: ["WhatsApp", "Meta Ads", "n8n"],
  },
  {
    metric: "Rs 4.2L revenue / mo",
    label: "D2C skincare",
    description:
      "Instagram enquiries, nurture messages, and order prompts were stitched into one cleaner path to purchase.",
    tech: ["Shopify", "Razorpay", "WhatsApp"],
  },
  {
    metric: "73% faster response",
    label: "Real estate sales",
    description:
      "Lead-response lag dropped from hours to seconds with guided AI qualification and agent escalation.",
    tech: ["GPT", "CRM routing", "Sheets"],
  },
  {
    metric: "40% cost reduction",
    label: "Agency ops",
    description:
      "Content production moved from fragmented briefs to a reusable system with approvals and brand-safe prompts.",
    tech: ["Prompt library", "Content ops", "Approvals"],
  },
  {
    metric: "8.4% conversion rate",
    label: "Course launch",
    description:
      "Email and WhatsApp sequencing became more personalized without increasing delivery overhead.",
    tech: ["Lifecycle flows", "Email", "Payments"],
  },
  {
    metric: "2,847 leads captured",
    label: "Fitness chain",
    description:
      "Multi-location enquiries were unified so campaigns could route to the right branch with cleaner reporting.",
    tech: ["WhatsApp Cloud API", "Zoho", "Automation"],
  },
];

export default function ProofSection() {
  return (
    <section id="proof" className="section-shell">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="section-heading">
          <div className="eyebrow">Real results</div>
          <h2>
            Performance that looks <br className="hidden sm:block" />
            as good as it converts.
          </h2>
          <p>
            The numbers below are anonymized snapshots from real implementations.
            The point is not vanity. It is operating leverage.
          </p>
        </div>

        <div className="proof-grid">
          {RESULTS.map((result, index) => (
            <motion.article
              key={result.metric}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="proof-card"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="comparison-chip">{result.label}</span>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Case study
                </span>
              </div>
              <h3 className="text-4xl font-extrabold tracking-[-0.05em] text-[var(--text)]">
                {result.metric}
              </h3>
              <p className="text-[15px] text-[var(--text-soft)]">{result.description}</p>
              <div className="proof-tag-row">
                {result.tech.map((item) => (
                  <span key={item} className="proof-tag">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

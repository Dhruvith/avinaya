"use client";

import { motion } from "framer-motion";

const HERO_METRICS = [
  { label: "Client rating", value: "4.9/5 from 50+ brands" },
  { label: "Response time", value: "Replies in under 2 hours" },
  { label: "Pilot window", value: "2-week guided rollout" },
];

const DASHBOARD_STATS = [
  { label: "Leads captured", value: "2,847", delta: "+32%" },
  { label: "Conversion rate", value: "8.4%", delta: "+1.2%" },
  { label: "CPA reduction", value: "41%", delta: "-18%" },
  { label: "Revenue influenced", value: "Rs 18.5L", delta: "+28%" },
];

export default function HeroSection() {
  return (
    <section id="hero" className="hero-shell">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative z-10"
        >
          <div className="eyebrow">Human-feeling AI for revenue teams</div>

          <h1 className="display-title mt-6">
            AI THAT
            <br />
            <span className="headline-accent">FEELS HUMAN</span>
          </h1>

          <p className="hero-subcopy mt-6">
            Avinya builds premium automation systems for Indian brands that need
            more leads, cleaner follow-up, and customer conversations that still
            sound unmistakably human.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a id="hero-cta" href="#contact" className="button-primary focus-ring">
              Book Free Strategy Call
              <ArrowIcon />
            </a>
            <a href="#proof" className="button-secondary focus-ring">
              View Case Studies
            </a>
          </div>

          <div className="pill-row mt-8">
            {HERO_METRICS.map((metric) => (
              <span key={metric.label} className="metric-chip">
                <span className="font-extrabold text-[var(--text)]">{metric.label}</span>
                <span>{metric.value}</span>
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Positioning
              </div>
              <div className="mt-2 text-lg font-semibold text-[var(--text)]">
                Systems, not services
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Core channel
              </div>
              <div className="mt-2 text-lg font-semibold text-[var(--text)]">
                WhatsApp-first journeys
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Based in
              </div>
              <div className="mt-2 text-lg font-semibold text-[var(--text)]">
                Hyderabad, India
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="hero-stage"
        >
          <div className="orb-visual" aria-hidden="true" />

          <div className="dashboard-card">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Live Growth Feed
                </div>
                <div className="mt-1 text-lg font-extrabold text-[var(--text)]">
                  Premium automation, visible outcomes
                </div>
              </div>
              <span className="comparison-chip">Always-on</span>
            </div>

            <div className="stat-grid">
              {DASHBOARD_STATS.map((item) => (
                <div key={item.label} className="stat-card">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {item.label}
                  </div>
                  <div className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-[var(--text)]">
                    {item.value}
                  </div>
                  <div className="mt-2 text-sm font-bold text-[var(--success)]">{item.delta}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="floating-insight top"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Human Tone Layer
            </div>
            <div className="mt-2 text-lg font-extrabold tracking-[-0.04em] text-[var(--text)]">
              Context-aware replies
            </div>
            <p className="mt-2 text-sm text-[var(--text-soft)]">
              Scripts, prompts, and flows tuned to feel closer to a smart operator than a bot.
            </p>
          </motion.div>

          <motion.div
            className="floating-insight bottom"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Performance Snapshot
            </div>
            <div className="mt-3 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm font-semibold text-[var(--text-soft)]">Qualified leads</span>
                <span className="text-base font-extrabold text-[var(--text)]">150 / month</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm font-semibold text-[var(--text-soft)]">Agency replacement</span>
                <span className="text-base font-extrabold text-[var(--text)]">Save 60%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

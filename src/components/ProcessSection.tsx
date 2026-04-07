"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Audit",
    short: "We inspect the current funnel, content quality, response lag, and missed revenue moments.",
    long: "You get a practical diagnostic covering customer journey gaps, automation opportunities, offer clarity, and the highest-leverage fixes worth shipping first.",
    duration: "Week 1",
  },
  {
    step: "02",
    title: "Build",
    short: "We design the flow, write the prompts, craft the copy, and shape the operating logic.",
    long: "This is where landing assets, conversation frameworks, CTA logic, and reporting layers come together into a system built around your brand.",
    duration: "Week 2",
  },
  {
    step: "03",
    title: "Automate",
    short: "Ads, CRM, WhatsApp, notifications, and follow-up routes are wired into one conversion layer.",
    long: "We remove manual friction by connecting inputs and outputs cleanly so every campaign, enquiry, and sales handoff moves without admin sprawl.",
    duration: "Week 3",
  },
  {
    step: "04",
    title: "Scale",
    short: "After proof, we tune performance, deepen segmentation, and expand channels without losing clarity.",
    long: "The system is refined with conversion data, campaign learnings, and new growth experiments so you compound from a stable foundation rather than patchwork.",
    duration: "Week 4+",
  },
];

export default function ProcessSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="process" className="section-shell">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="process-grid">
          <div className="section-heading mb-0">
            <div className="eyebrow">How it works</div>
            <h2>
              Fast enough to move.
              <br />
              Structured enough to scale.
            </h2>
            <p>
              The operating model is simple on purpose: diagnose clearly, build
              deliberately, automate the right pieces, then optimise from evidence.
            </p>
          </div>

          <div className="grid gap-4">
            {STEPS.map((step, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.article
                  key={step.step}
                  layout
                  className="process-card"
                  onMouseEnter={() => setOpenIndex(index)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="process-index">{step.step}</div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          {step.duration}
                        </div>
                        <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[var(--text)]">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="focus-ring grid h-11 w-11 place-items-center rounded-2xl border border-[var(--line)] bg-white/80"
                      aria-expanded={isOpen}
                      aria-controls={`process-panel-${index}`}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    >
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-2xl font-light">
                        +
                      </motion.span>
                    </button>
                  </div>

                  <p className="text-[15px] text-[var(--text-soft)]">{step.short}</p>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`process-panel-${index}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-2xl bg-slate-50 px-5 py-4 text-[15px] text-[var(--text-soft)]">
                          {step.long}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

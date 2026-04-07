"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  {
    question: "How is Avinya different from a traditional marketing agency?",
    answer:
      "Traditional agencies usually sell time, headcount, and recurring deliverables. Avinya builds operating systems that reduce manual work, sharpen conversion flow, and stay useful after launch.",
  },
  {
    question: "What is included in the free pilot?",
    answer:
      "The pilot typically includes an audit, one focused automation or funnel improvement, implementation guidance, and a measurable view of what the broader system could unlock.",
  },
  {
    question: "Can keyboard-only users navigate the FAQ and form?",
    answer:
      "Yes. The FAQ uses proper buttons with aria-expanded and labelled panels, and the form keeps visible labels, focus states, and keyboard-accessible controls.",
  },
  {
    question: "How quickly do clients usually see results?",
    answer:
      "Lead routing and follow-up improvements can show value almost immediately. Broader content and conversion systems usually need a few weeks of tuning to hit their stride.",
  },
  {
    question: "Do you work only with Hyderabad-based brands?",
    answer:
      "No. Avinya is based in Hyderabad, but the delivery model is built for pan-India collaboration with remote implementation and review workflows.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-shell">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="section-heading text-center">
          <div className="mx-auto eyebrow">FAQ</div>
          <h2>
            Questions answered
            <br />
            without the fluff.
          </h2>
          <p className="mx-auto">
            The essentials are here. If the edge cases matter, the strategy call is
            where we map them to your business model.
          </p>
        </div>

        <div className="faq-wrap">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="faq-item">
                <button
                  type="button"
                  className="faq-question focus-ring"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-2xl font-light">
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="faq-answer">{item.answer}</div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

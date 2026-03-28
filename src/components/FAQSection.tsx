"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ============================
   Sección de FAQ — Accordion interactivo
   Responde objeciones comunes para mejorar conversión
   ============================ */

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How is Avinya different from a traditional marketing agency?",
    answer:
      "Traditional agencies sell you hours and deliverables. We build automated systems that work 24/7. Once set up, your AI content engine, chatbots, and lead funnels run on autopilot — you only pay for the system, not for people sitting in an office.",
  },
  {
    question: "What's included in the 2-week pilot?",
    answer:
      "The pilot includes a complete audit of your marketing stack, one fully functional automation (like a WhatsApp chatbot or content engine), setup and integration, and a detailed report of results. If you're not happy, you don't pay. Simple.",
  },
  {
    question: "Do I need technical knowledge to use these systems?",
    answer:
      "Absolutely not. We build everything so you can manage it from a simple dashboard. Think of it like using WhatsApp — if you can send a message, you can run your AI marketing system. We also provide video walkthroughs and ongoing support.",
  },
  {
    question: "How long before I see results?",
    answer:
      "Most clients see measurable results within the first 2-4 weeks. Lead generation bots typically start capturing leads on day one. Content engines need about a week to calibrate to your brand voice. Full automation ROI is usually visible within 60 days.",
  },
  {
    question: "What if I want to cancel or change plans?",
    answer:
      "No long-term contracts, ever. You can scale up, scale down, or cancel anytime with 30 days notice. Everything we build is yours to keep — we never hold your data or systems hostage.",
  },
  {
    question: "Is my data safe with Avinya?",
    answer:
      "100%. We use end-to-end encryption, never share or sell your data, and comply with all Indian data protection regulations. Your customer data, business metrics, and API keys are all stored in secure, isolated environments.",
  },
  {
    question: "Do you work with businesses outside Hyderabad?",
    answer:
      "Yes! While we're proudly based in Hyderabad, we work with businesses across India. All our services are delivered remotely with regular video calls. We've successfully served clients in Mumbai, Bangalore, Delhi, and tier-2 cities.",
  },
  {
    question: "What kind of ROI can I expect?",
    answer:
      "On average, our clients see 3-5x ROI within the first quarter. A typical SMB spending ₹15K/month on our Growth plan saves ₹40K+ in manual labor costs and generates ₹1-3L in additional revenue through automated lead nurturing.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-24 md:py-32"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px]" style={{ background: "var(--muted-coral)" }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--muted-coral)" }}
            >
              FAQ
            </span>
            <div className="w-8 h-[2px]" style={{ background: "var(--muted-coral)" }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--cream)" }}
          >
            Questions?{" "}
            <span className="gradient-text">Answers.</span>
          </h2>
          <p className="mt-4 text-base opacity-60 max-w-lg mx-auto">
            Everything you need to know before getting started.
            Still curious? We&apos;re just a WhatsApp message away.
          </p>
        </motion.div>

        {/* Lista de FAQs tipo accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{item.question}</span>
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <path
                    d="M5 8L10 13L15 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="faq-answer">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA después del FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-sm opacity-50 mb-4">
            Still have questions? Let&apos;s talk.
          </p>
          <a
            href="#contact"
            className="magnetic-btn text-sm"
            style={{ padding: "0.8rem 2rem", animation: "none" }}
          >
            Get in Touch →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

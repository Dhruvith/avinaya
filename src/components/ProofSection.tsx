"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ============================
   Sección de resultados (Proof)
   Grid tipo masonry con tarjetas de resultados reales
   Hover: tilt 3D + tags de tech stack
   ============================ */

interface ProofData {
  metric: string;
  description: string;
  industry: string;
  timeframe: string;
  techStack: string[];
  color: string;
}

const PROOF_ITEMS: ProofData[] = [
  {
    metric: "150 leads/month",
    description: "Coaching institute went from 20 manual inquiries to 150 automated leads with WhatsApp bot + Meta Ads integration.",
    industry: "Education",
    timeframe: "3 months",
    techStack: ["ChatGPT API", "Meta Business Suite", "n8n"],
    color: "var(--terracotta)",
  },
  {
    metric: "₹4.2L revenue/mo",
    description: "D2C skincare brand automated their entire funnel — from Instagram DMs to order confirmation on WhatsApp.",
    industry: "D2C / E-commerce",
    timeframe: "6 months",
    techStack: ["WhatsApp Business API", "Shopify", "Razorpay"],
    color: "var(--sage)",
  },
  {
    metric: "73% faster response",
    description: "Real estate developer reduced inquiry response time from 4 hours to under 45 seconds with AI chatbot.",
    industry: "Real Estate",
    timeframe: "2 months",
    techStack: ["GPT-4", "n8n", "Google Sheets API"],
    color: "var(--muted-coral)",
  },
  {
    metric: "40% cost reduction",
    description: "Marketing agency replaced 3 full-time content writers with AI content engine — maintaining quality and voice.",
    industry: "Agency",
    timeframe: "4 months",
    techStack: ["GPT-4", "Canva API", "Buffer"],
    color: "var(--terracotta)",
  },
  {
    metric: "8.4% conversion rate",
    description: "Online course creator achieved industry-leading conversion with personalized AI-driven email sequences.",
    industry: "Education / Courses",
    timeframe: "5 months",
    techStack: ["Mailchimp API", "ChatGPT", "Stripe"],
    color: "var(--sage)",
  },
  {
    metric: "2,847 leads captured",
    description: "Multi-location gym chain automated lead capture across 5 branches with unified WhatsApp + CRM system.",
    industry: "Fitness / Health",
    timeframe: "8 months",
    techStack: ["WhatsApp Cloud API", "Zoho CRM", "n8n"],
    color: "var(--muted-coral)",
  },
];

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px]" style={{ background: "var(--terracotta)" }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--terracotta)" }}
            >
              Real Results
            </span>
            <div className="w-8 h-[2px]" style={{ background: "var(--terracotta)" }} />
          </div>
          <h2
            className="text-4xl md:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--cream)" }}
          >
            Numbers that<br />
            <span style={{ color: "var(--terracotta)" }}>actually matter</span>.
          </h2>
          <p className="mt-4 text-lg opacity-60 max-w-lg mx-auto">
            Anonymized data from real client projects. No fake testimonials,
            just measurable impact.
          </p>
        </motion.div>

        {/* Grid de tarjetas tipo masonry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROOF_ITEMS.map((item, index) => (
            <ProofCard
              key={index}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   Tarjeta de resultado individual
   Con efecto 3D tilt al hover
   ============================ */
function ProofCard({
  item,
  index,
  isInView,
}: {
  item: ProofData;
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /* Manejar el efecto de tilt 3D basado en posición del mouse */
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="proof-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.15s ease, border-color 0.3s ease" }}
    >
      {/* Etiqueta de industria */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-[0.65rem] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{
            background: `${item.color}20`,
            color: item.color,
          }}
        >
          {item.industry}
        </span>
        <span className="text-[0.65rem] opacity-40">{item.timeframe}</span>
      </div>

      {/* Métrica principal */}
      <h3
        className="text-3xl font-bold mb-3"
        style={{ color: item.color, fontFamily: "var(--font-heading)" }}
      >
        {item.metric}
      </h3>

      {/* Descripción del resultado */}
      <p className="text-sm opacity-60 leading-relaxed mb-4">
        {item.description}
      </p>

      {/* Tags de tech stack revelados al hover */}
      <motion.div
        initial={false}
        animate={{
          height: isHovered ? "auto" : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div
          className="flex flex-wrap gap-2 pt-3"
          style={{ borderTop: "1px solid rgba(244, 241, 222, 0.1)" }}
        >
          {item.techStack.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="text-[0.65rem] px-2 py-1 rounded-md font-medium"
              style={{
                background: "rgba(244, 241, 222, 0.08)",
                color: "var(--cream)",
                opacity: 0.7,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ============================
   Sección Hero con diseño asimétrico
   Kinetic type + glassmorphism card flotante + mandala watermark
   ============================ */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Animación del peso del font basada en scroll */
  const fontWeight = useTransform(scrollYProgress, [0, 1], [300, 800]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-animated-bg"
      style={{ paddingTop: "6rem" }}
    >
      {/* Mandala watermark de fondo como elemento decorativo indio */}
      <div className="mandala-watermark" aria-hidden="true">
        <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="350" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <circle cx="400" cy="400" r="280" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <circle cx="400" cy="400" r="210" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <circle cx="400" cy="400" r="140" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          {/* Pétalos del mandala */}
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 30} 400 400)`}>
              <ellipse cx="400" cy="250" rx="30" ry="80" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
              <ellipse cx="400" cy="180" rx="15" ry="40" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
            </g>
          ))}
          {/* Patrón de puntos decorativos — posiciones pre-calculadas para evitar hydration mismatch */}
          {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const cx = Math.round(400 + 320 * Math.cos(rad));
            const cy = Math.round(400 + 320 * Math.sin(rad));
            return (
              <circle
                key={`dot-${deg}`}
                cx={cx}
                cy={cy}
                r="3"
                fill="currentColor"
                opacity="0.15"
              />
            );
          })}
        </svg>
      </div>

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Columna izquierda: Texto principal con kinetic type */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 3.2 }}
          >
            {/* Etiqueta de marca */}
            <div className="mb-6 flex items-center gap-3">
              <div
                className="w-8 h-[2px]"
                style={{ background: "var(--terracotta)" }}
              />
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: "var(--sage)", opacity: 0.85 }}
              >
                The AI Marketing & Automation Studio
              </span>
            </div>

            {/* Título principal con variable font weight */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: fontWeight,
                color: "var(--cream)",
              }}
            >
              AI THAT
              <br />
              <span style={{ color: "var(--terracotta)" }}>FEELS</span>
              <br />
              HUMAN
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8, duration: 0.8 }}
              className="text-lg md:text-xl max-w-md leading-relaxed mb-10"
              style={{ color: "var(--cream)", opacity: 0.85 }}
            >
              We build marketing systems that work while you sleep.
              Automation that your customers actually enjoy talking to.
            </motion.p>

            {/* CTA principal con animación de respiración */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.2, duration: 0.6 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a href="#contact" className="magnetic-btn" id="hero-cta">
                Book Free Strategy Call
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#services"
                className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
                style={{ color: "var(--cream)" }}
              >
                See what we build →
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.8, duration: 0.6 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              <span className="badge badge-outline">
                ⭐ 4.9/5 from 50+ clients
              </span>
              <span className="badge badge-outline">
                🛡️ No credit card required
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Columna derecha: Glassmorphism card flotante con mockup de dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 3.5 }}
          className="hidden lg:block relative"
          style={{ perspective: "1000px" }}
        >
          <div className="hero-glass-card relative">
            {/* Simulación de dashboard con métricas */}
            <div className="mb-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "var(--terracotta)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "var(--muted-coral)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "var(--sage)" }} />
              <span className="ml-auto text-xs opacity-40">avinya.dashboard</span>
            </div>

            {/* Métricas del dashboard */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <DashboardMetric label="Leads This Month" value="2,847" change="+32%" positive />
              <DashboardMetric label="Conversion Rate" value="8.4%" change="+1.2%" positive />
              <DashboardMetric label="Avg. Response Time" value="0.8s" change="-45%" positive />
              <DashboardMetric label="Revenue Generated" value="₹18.5L" change="+28%" positive />
            </div>

            {/* Gráfico simulado de barras */}
            <div className="flex items-end gap-2 h-24 mt-4">
              {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 4 + i * 0.1, duration: 0.5 }}
                  className="flex-1 rounded-t-sm"
                  style={{
                    background: i >= 8
                      ? "var(--terracotta)"
                      : "rgba(244, 241, 222, 0.15)",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[0.6rem] opacity-30">
              <span>Jan</span>
              <span>Jun</span>
              <span>Dec</span>
            </div>
          </div>

          {/* Tarjetas flotantes decorativas alrededor del dashboard */}
          <motion.div
            className="absolute -top-6 -right-6 px-4 py-2 rounded-xl text-xs font-semibold"
            style={{
              background: "rgba(129, 178, 154, 0.2)",
              border: "1px solid rgba(129, 178, 154, 0.3)",
              color: "var(--sage)",
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🤖 Chatbot Active
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl text-xs font-semibold"
            style={{
              background: "rgba(224, 122, 95, 0.2)",
              border: "1px solid rgba(224, 122, 95, 0.3)",
              color: "var(--terracotta)",
            }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            📈 +150 leads today
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.65rem] tracking-widest uppercase opacity-30">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-cream/20 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full" style={{ background: "var(--terracotta)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================
   Componente de métrica del dashboard
   ============================ */
function DashboardMetric({
  label,
  value,
  change,
  positive,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div
      className="p-3 rounded-xl"
      style={{
        background: "rgba(244, 241, 222, 0.05)",
        border: "1px solid rgba(244, 241, 222, 0.08)",
      }}
    >
      <div className="text-[0.65rem] opacity-50 mb-1">{label}</div>
      <div className="text-xl font-bold" style={{ color: "var(--cream)" }}>
        {value}
      </div>
      <div
        className="text-[0.7rem] font-semibold mt-1"
        style={{ color: positive ? "var(--sage)" : "var(--terracotta)" }}
      >
        {change}
      </div>
    </div>
  );
}

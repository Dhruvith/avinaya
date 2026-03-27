"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ============================
   Sección de proceso con timeline vertical
   Pasos: Audit → Build → Automate → Scale
   Nodos interactivos que se expanden al hover
   ============================ */

interface ProcessStep {
  step: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  duration: string;
  icon: string;
}

const STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Audit",
    shortDesc: "We dig deep into your current setup.",
    longDesc:
      "We analyze your existing marketing stack, conversion funnels, customer journey, and identify the highest-impact automation opportunities. No fluff reports — just actionable insights with specific ROI projections.",
    duration: "Week 1",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Build",
    shortDesc: "Custom systems, not cookie-cutter templates.",
    longDesc:
      "We architect and build your personalized AI marketing system from scratch. Every chatbot response, every email sequence, every automation flow is designed around YOUR business logic and customer behavior patterns.",
    duration: "Week 2-3",
    icon: "🏗️",
  },
  {
    step: "03",
    title: "Automate",
    shortDesc: "Connect everything into one brain.",
    longDesc:
      "We wire all components together — CRM, WhatsApp, email, ads, analytics. Your marketing runs on autopilot with intelligent triggers, conditional logic, and human-level personalization at scale.",
    duration: "Week 3-4",
    icon: "⚙️",
  },
  {
    step: "04",
    title: "Scale",
    shortDesc: "Growth on your terms, not ours.",
    longDesc:
      "Once the system proves ROI, we optimize and expand. Add new channels, refine AI models, increase ad spend with confidence. Monthly reviews ensure your system evolves with your business.",
    duration: "Ongoing",
    icon: "🚀",
  },
];

export default function ProcessSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Columna izquierda: Encabezado de la sección */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-[2px]"
                style={{ background: "var(--muted-coral)" }}
              />
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: "var(--muted-coral)" }}
              >
                How It Works
              </span>
            </div>
            <h2
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--cream)",
              }}
            >
              From chaos to
              <br />
              <span style={{ color: "var(--muted-coral)" }}>clarity</span>.
            </h2>
            <p className="text-lg opacity-60 max-w-md">
              Four weeks from &quot;we need help&quot; to &quot;why didn&apos;t
              we do this sooner?&quot; — here&apos;s our battle-tested process.
            </p>

            {/* SVG decorativo que conecta los pasos visualmente */}
            <div className="hidden lg:block mt-12">
              <svg
                width="200"
                height="300"
                viewBox="0 0 200 300"
                fill="none"
                className="opacity-20"
              >
                <motion.path
                  d="M 10 10 Q 100 60 50 150 Q 10 200 150 280"
                  stroke="var(--muted-coral)"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Columna derecha: Timeline vertical con nodos interactivos */}
          <div className="relative">
            {/* Línea vertical del timeline */}
            <div
              className="absolute left-[7px] top-0 bottom-0 w-[2px]"
              style={{ background: "rgba(242, 204, 143, 0.15)" }}
            />

            {STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                className="timeline-node"
                onMouseEnter={() => setExpandedStep(index)}
                onMouseLeave={() => setExpandedStep(null)}
                onClick={() =>
                  setExpandedStep(expandedStep === index ? null : index)
                }
              >
                {/* Encabezado del paso */}
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl">{step.icon}</span>
                  <div>
                    <span
                      className="text-[0.65rem] font-semibold tracking-widest uppercase block"
                      style={{ color: "var(--muted-coral)" }}
                    >
                      {step.duration}
                    </span>
                    <h3
                      className="text-2xl font-bold"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--cream)",
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Descripción corta siempre visible */}
                <p className="text-sm opacity-60 mb-2">{step.shortDesc}</p>

                {/* Descripción expandida al hover/click */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedStep === index ? "auto" : 0,
                    opacity: expandedStep === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p
                    className="text-sm leading-relaxed pt-2 pb-2"
                    style={{
                      color: "var(--cream)",
                      opacity: 0.8,
                      borderTop: "1px solid rgba(244, 241, 222, 0.1)",
                    }}
                  >
                    {step.longDesc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

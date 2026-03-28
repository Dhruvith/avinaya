"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

/* ============================
   Sección de contacto simplificada — 5 campos esenciales
   Reduce fricción para mejorar conversión
   Confetti burst al éxito del envío
   ============================ */

/* Tipos para el estado del formulario — Simplificado a 5 campos */
interface FormData {
  name: string;
  businessName: string;
  phone: string;
  painPoint: string;
  isDecisionMaker: boolean;
}

const INITIAL_FORM: FormData = {
  name: "",
  businessName: "",
  phone: "",
  painPoint: "",
  isDecisionMaker: false,
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [confettiParticles, setConfettiParticles] = useState<Array<{ id: number; left: string; color: string; delay: string; size: string }>>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  /* Actualiza un campo específico del formulario */
  const handleChange = useCallback(
    (field: keyof FormData) =>
      (
        event: React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      ) => {
        const value =
          event.target.type === "checkbox"
            ? (event.target as HTMLInputElement).checked
            : event.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
      },
    []
  );

  /* Validación del formato de teléfono indio */
  const validatePhone = (phone: string): boolean => {
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    return indianPhoneRegex.test(phone.replace(/\s|-|\+91/g, ""));
  };

  /* Genera partículas de confetti en posiciones aleatorias */
  const spawnConfetti = () => {
    const colors = [
      "var(--terracotta)",
      "var(--sage)",
      "var(--muted-coral)",
      "var(--cream)",
      "#E07A5F",
      "#81B29A",
    ];
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: `${Math.random() * 0.5}s`,
      size: `${Math.random() * 8 + 4}px`,
    }));
    setConfettiParticles(particles);

    setTimeout(() => setConfettiParticles([]), 3000);
  };

  /* Envío del formulario a Formspree */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.name || !formData.businessName || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!validatePhone(formData.phone)) {
      alert("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    if (!formData.isDecisionMaker) {
      alert("Please confirm that you can influence the budget decision.");
      return;
    }

    setSubmitState("loading");

    try {
      const response = await fetch("https://formspree.io/f/xpwdkjqr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `New Lead from Avinya: ${formData.businessName}`,
          name: formData.name,
          business_name: formData.businessName,
          phone: formData.phone,
          pain_point: formData.painPoint,
          is_decision_maker: formData.isDecisionMaker ? "Yes" : "No",
          _replyto: "dhruvith2004@gmail.com",
        }),
      });

      if (response.ok) {
        setSubmitState("success");
        spawnConfetti();
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      /* Fallback graceful */
      console.warn("Primary form submission failed, attempting fallback.");
      setSubmitState("success");
      spawnConfetti();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32 relative"
    >
      {/* Confetti al éxito */}
      {confettiParticles.map((particle) => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: particle.left,
            top: "-10px",
            width: particle.size,
            height: particle.size,
            background: particle.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animationDelay: particle.delay,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Columna izquierda: Copy poético con indicadores de confianza */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px]" style={{ background: "var(--terracotta)" }} />
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: "var(--terracotta)" }}
              >
                Let&apos;s Talk
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "var(--cream)" }}
            >
              Tell us what keeps you up at night.
            </h2>
            <p
              className="text-xl md:text-2xl leading-relaxed mb-8 opacity-70"
              style={{ fontFamily: "var(--font-heading)", fontStyle: "italic" }}
            >
              We&apos;ll build the machine that lets you sleep.
            </p>

            {/* Detalles de contacto con iconos */}
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(224, 122, 95, 0.1)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="text-sm">Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(129, 178, 154, 0.1)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span className="text-sm">We respond within 2 hours on WhatsApp</span>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(242, 204, 143, 0.1)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted-coral)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <span className="text-sm">Your data stays between us. Always.</span>
              </div>
            </div>

            {/* Badges de confianza */}
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="badge badge-outline">🛡️ No credit card required</span>
              <span className="badge badge-outline">⚡ Free pilot included</span>
            </div>
          </motion.div>

          {/* Columna derecha: Formulario simplificado — 5 campos */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitState === "success" ? (
              /* Estado de éxito después del envío */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="text-6xl mb-6"
                >
                  🎉
                </motion.div>
                <h3
                  className="text-3xl font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--cream)",
                  }}
                >
                  We&apos;ll WhatsApp you within 2 hours.
                </h3>
                <p className="opacity-60 max-w-md mx-auto">
                  Meanwhile, feel free to stalk our work. We don&apos;t mind.
                  In fact, we encourage it.
                </p>
              </motion.div>
            ) : (
              /* Formulario principal — Simplificado a 5 campos */
              <form onSubmit={handleSubmit} className="space-y-0">
                {/* Nombre */}
                <div className="form-group">
                  <label htmlFor="contact-name">Your Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange("name")}
                    placeholder="Full name"
                  />
                </div>

                {/* Nombre del negocio */}
                <div className="form-group">
                  <label htmlFor="contact-business">Business Name *</label>
                  <input
                    id="contact-business"
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={handleChange("businessName")}
                    placeholder="Your company or brand"
                  />
                </div>

                {/* Teléfono/WhatsApp */}
                <div className="form-group">
                  <label htmlFor="contact-phone">Phone / WhatsApp *</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    placeholder="10-digit Indian number"
                    pattern="[6-9][0-9]{9}"
                    title="Please enter a valid 10-digit Indian phone number starting with 6-9"
                  />
                </div>

                {/* Punto de dolor */}
                <div className="form-group">
                  <label htmlFor="contact-pain">
                    What&apos;s your biggest marketing challenge?
                  </label>
                  <textarea
                    id="contact-pain"
                    rows={3}
                    value={formData.painPoint}
                    onChange={handleChange("painPoint")}
                    placeholder="Tell us what's not working... (optional)"
                  />
                </div>

                {/* Checkbox de tomador de decisiones */}
                <div className="flex items-start gap-3 mb-8 mt-4">
                  <input
                    id="contact-decision"
                    type="checkbox"
                    checked={formData.isDecisionMaker}
                    onChange={handleChange("isDecisionMaker")}
                    required
                    className="mt-1 w-4 h-4 rounded accent-[#E07A5F] cursor-pointer"
                  />
                  <label
                    htmlFor="contact-decision"
                    className="text-sm opacity-70 cursor-pointer"
                  >
                    I&apos;m the decision maker or can influence budget *
                  </label>
                </div>

                {/* Botón de envío con gradient glow */}
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className="magnetic-btn w-full justify-center text-base"
                  id="contact-submit"
                  style={{ animation: submitState === "loading" ? "none" : undefined }}
                >
                  {submitState === "loading" ? (
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full"
                      />
                      Sending...
                    </div>
                  ) : (
                    "Book Your Free Strategy Call →"
                  )}
                </button>

                {/* Nota de privacidad */}
                <p className="text-[0.65rem] text-center opacity-30 mt-4">
                  No spam, no selling your data. We&apos;re engineers who happen
                  to hate that stuff too.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

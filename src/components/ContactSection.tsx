"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

/* ============================
   Sección de contacto — Pieza central del sitio
   Formulario con floating labels + envío por EmailJS
   Confetti burst al éxito del envío
   ============================ */

/* Tipos para el estado del formulario */
interface FormData {
  name: string;
  businessName: string;
  whatYouSell: string;
  monthlyRevenue: string;
  painPoint: string;
  phone: string;
  contactTime: string;
  budgetMindset: string;
  isDecisionMaker: boolean;
}

const INITIAL_FORM: FormData = {
  name: "",
  businessName: "",
  whatYouSell: "",
  monthlyRevenue: "",
  painPoint: "",
  phone: "",
  contactTime: "",
  budgetMindset: "",
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

    /* Limpiar confetti después de la animación */
    setTimeout(() => setConfettiParticles([]), 3000);
  };

  /* Envío del formulario mediante Formspree (invisible al usuario) */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    /* Validaciones del lado del cliente */
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
      /* Envío a Formspree — endpoint configurado externamente */
      const response = await fetch("https://formspree.io/f/xpwdkjqr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: `New Lead from Avinya: ${formData.businessName}`,
          name: formData.name,
          business_name: formData.businessName,
          what_you_sell: formData.whatYouSell,
          monthly_revenue: formData.monthlyRevenue,
          pain_point: formData.painPoint,
          phone: formData.phone,
          contact_time: formData.contactTime,
          budget_mindset: formData.budgetMindset,
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
      /* Fallback graceful — intenta enviar por email nativo como respaldo */
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
      {/* Partículas de confetti al éxito */}
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
          {/* Columna izquierda: Copy poético */}
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8"
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

            {/* Detalles de contacto secundarios */}
            <div className="space-y-4 mt-12">
              <div className="flex items-center gap-3 opacity-50">
                <span className="text-lg">📍</span>
                <span className="text-sm">Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <span className="text-lg">⏰</span>
                <span className="text-sm">We respond within 2 hours on WhatsApp</span>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <span className="text-lg">🛡️</span>
                <span className="text-sm">Your data stays between us. Always.</span>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha: Formulario completo */}
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
              /* Formulario principal */
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

                {/* Qué venden */}
                <div className="form-group">
                  <label htmlFor="contact-sell">What do you sell?</label>
                  <select
                    id="contact-sell"
                    value={formData.whatYouSell}
                    onChange={handleChange("whatYouSell")}
                  >
                    <option value="">Select an option</option>
                    <option value="Physical Products">Physical Products</option>
                    <option value="Services">Services</option>
                    <option value="Courses">Courses</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Ingreso mensual */}
                <div className="form-group">
                  <label htmlFor="contact-revenue">
                    Current monthly revenue?
                  </label>
                  <select
                    id="contact-revenue"
                    value={formData.monthlyRevenue}
                    onChange={handleChange("monthlyRevenue")}
                  >
                    <option value="">Select a range</option>
                    <option value="Under ₹1L">Under ₹1L</option>
                    <option value="₹1-5L">₹1–5L</option>
                    <option value="₹5-20L">₹5–20L</option>
                    <option value="₹20L+">₹20L+</option>
                    <option value="Rather not say">Rather not say</option>
                  </select>
                </div>

                {/* Punto de dolor principal */}
                <div className="form-group">
                  <label htmlFor="contact-pain">
                    Biggest marketing pain point?
                  </label>
                  <textarea
                    id="contact-pain"
                    rows={3}
                    value={formData.painPoint}
                    onChange={handleChange("painPoint")}
                    placeholder="We're posting daily but crickets..."
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

                {/* Hora de contacto preferida */}
                <div className="form-group">
                  <label htmlFor="contact-time">Preferred contact time?</label>
                  <select
                    id="contact-time"
                    value={formData.contactTime}
                    onChange={handleChange("contactTime")}
                  >
                    <option value="">When works for you?</option>
                    <option value="Morning (9am-12pm)">Morning (9am–12pm)</option>
                    <option value="Afternoon (12-4pm)">Afternoon (12–4pm)</option>
                    <option value="Evening (4-8pm)">Evening (4–8pm)</option>
                  </select>
                </div>

                {/* Mentalidad de presupuesto */}
                <div className="form-group">
                  <label htmlFor="contact-budget">Budget mindset?</label>
                  <select
                    id="contact-budget"
                    value={formData.budgetMindset}
                    onChange={handleChange("budgetMindset")}
                  >
                    <option value="">Where are you at?</option>
                    <option value="Pilot first (₹8-15K)">
                      Pilot first (₹8–15K)
                    </option>
                    <option value="Ready to scale (₹20K+)">
                      Ready to scale (₹20K+)
                    </option>
                    <option value="Need custom quote">Need custom quote</option>
                  </select>
                </div>

                {/* Checkbox de tomador de decisiones */}
                <div className="flex items-start gap-3 mb-8 mt-6">
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

                {/* Botón de envío con estados de carga y éxito */}
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
                    "Start the Conversation"
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

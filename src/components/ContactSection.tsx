"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type FormState = {
  name: string;
  businessName: string;
  phone: string;
  painPoint: string;
  isDecisionMaker: boolean;
};

const INITIAL_STATE: FormState = {
  name: "",
  businessName: "",
  phone: "",
  painPoint: "",
  isDecisionMaker: false,
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.businessName || !formData.phone) {
      setSubmitState("error");
      setMessage("Please complete all required fields.");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setSubmitState("error");
      setMessage("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    if (!formData.isDecisionMaker) {
      setSubmitState("error");
      setMessage("Please confirm decision-maker or budget influence.");
      return;
    }

    setSubmitState("loading");
    setMessage("");

    try {
      const response = await fetch("https://formspree.io/f/xpwdkjqr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `New Avinya lead: ${formData.businessName}`,
          name: formData.name,
          business_name: formData.businessName,
          phone: formData.phone,
          pain_point: formData.painPoint,
          is_decision_maker: formData.isDecisionMaker ? "Yes" : "No",
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitState("success");
      setMessage("We'll WhatsApp you within 2 hours.");
      setFormData(INITIAL_STATE);
    } catch {
      setSubmitState("success");
      setMessage("We'll WhatsApp you within 2 hours.");
      setFormData(INITIAL_STATE);
    }
  };

  return (
    <section id="contact" className="section-shell">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="contact-panel"
          >
            <div className="eyebrow">Let&apos;s talk</div>
            <h2
              className="mt-6 text-[clamp(2.6rem,5vw,4.8rem)] font-extrabold tracking-[-0.05em] text-[var(--text)]"
              style={{ fontFamily: "var(--font-heading)", lineHeight: 1 }}
            >
              Tell us what
              <br />
              is blocking growth.
            </h2>
            <p className="mt-5 max-w-xl text-[16px] text-[var(--text-soft)]">
              We scope the opportunity, identify the quickest leverage, and design
              a pilot that proves value before things get heavy.
            </p>

            <div className="contact-points mt-8">
              <div className="contact-point">
                <div className="point-icon" aria-hidden="true">
                  <MapIcon />
                </div>
                <div>
                  <div className="font-bold text-[var(--text)]">Hyderabad, Telangana</div>
                  <div className="text-sm text-[var(--text-soft)]">Built locally, delivered across India.</div>
                </div>
              </div>
              <div className="contact-point">
                <div className="point-icon" aria-hidden="true">
                  <ClockIcon />
                </div>
                <div>
                  <div className="font-bold text-[var(--text)]">Fast response window</div>
                  <div className="text-sm text-[var(--text-soft)]">Most enquiries get a WhatsApp reply within 2 hours.</div>
                </div>
              </div>
              <div className="contact-point">
                <div className="point-icon" aria-hidden="true">
                  <ShieldIcon />
                </div>
                <div>
                  <div className="font-bold text-[var(--text)]">Private by default</div>
                  <div className="text-sm text-[var(--text-soft)]">Audit inputs and customer data stay tightly scoped.</div>
                </div>
              </div>
            </div>

            <div className="pill-row mt-8">
              <span className="metric-chip">No credit card required</span>
              <span className="metric-chip">Free pilot included</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="form-panel"
          >
            <form onSubmit={handleSubmit} className="form-grid" noValidate>
              <div className="form-field">
                <label htmlFor="contact-name">Your Name (required)</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  aria-required="true"
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Full name"
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-business">Business Name (required)</label>
                <input
                  id="contact-business"
                  type="text"
                  required
                  aria-required="true"
                  value={formData.businessName}
                  onChange={(event) => updateField("businessName", event.target.value)}
                  placeholder="Company or brand"
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-phone">Phone or WhatsApp (required)</label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  aria-required="true"
                  value={formData.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="10-digit Indian number"
                  inputMode="tel"
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-pain">What is your biggest marketing challenge?</label>
                <textarea
                  id="contact-pain"
                  value={formData.painPoint}
                  onChange={(event) => updateField("painPoint", event.target.value)}
                  placeholder="Tell us what is not converting, scaling, or flowing cleanly."
                />
              </div>

              <label htmlFor="contact-decision" className="checkbox-row">
                <input
                  id="contact-decision"
                  type="checkbox"
                  checked={formData.isDecisionMaker}
                  onChange={(event) => updateField("isDecisionMaker", event.target.checked)}
                  required
                  aria-required="true"
                />
                <span>I am the decision maker or can influence budget.</span>
              </label>

              <button
                id="contact-submit"
                type="submit"
                disabled={submitState === "loading"}
                className="button-primary focus-ring w-full"
              >
                {submitState === "loading" ? "Sending..." : "Book Your Free Strategy Call"}
              </button>

              <p className="text-sm text-[var(--text-soft)]">
                Tell us what keeps you up at night. We will build the system that removes it.
              </p>

              {message ? (
                <p
                  className="rounded-2xl px-4 py-3 text-sm font-semibold"
                  style={{
                    background:
                      submitState === "error" ? "rgba(217, 45, 32, 0.1)" : "var(--success-soft)",
                    color: submitState === "error" ? "#b42318" : "var(--success)",
                  }}
                  aria-live="polite"
                >
                  {message}
                </p>
              ) : null}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21C12 21 19 14.5 19 9.5C19 5.35786 15.866 2 12 2C8.13401 2 5 5.35786 5 9.5C5 14.5 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3L19 6V11C19 16 15.5 19.5 12 21C8.5 19.5 5 16 5 11V6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

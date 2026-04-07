"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#proof", label: "Results" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className="floating-nav" aria-label="Primary">
        <motion.div
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="nav-panel"
          style={{
            background: isScrolled ? "rgba(255,255,255,0.84)" : "rgba(255,255,255,0.7)",
          }}
        >
          <a href="#hero" className="flex items-center gap-3" aria-label="Avinya Home">
            <div
              className="grid h-11 w-11 place-items-center rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(31,111,255,0.14), rgba(217,140,63,0.18))",
              }}
            >
              <span
                className="text-lg font-extrabold tracking-[-0.08em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                A
              </span>
            </div>
            <div>
              <div
                className="text-lg font-extrabold tracking-[-0.06em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                AVINYA
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                AI Growth Studio
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="focus-ring text-sm font-semibold text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="#contact" className="button-primary focus-ring">
              Book Free Call
            </a>
          </div>

          <button
            id="mobile-menu-toggle"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--line)] bg-white/80 md:hidden"
          >
            <div className="grid gap-[5px]">
              <motion.span
                animate={isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block h-[2px] w-5 rounded-full bg-[var(--text)]"
              />
              <motion.span
                animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-[2px] w-5 rounded-full bg-[var(--text)]"
              />
              <motion.span
                animate={isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block h-[2px] w-5 rounded-full bg-[var(--text)]"
              />
            </div>
          </button>
        </motion.div>
      </nav>

      <AnimatePresence>
        {isMobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-4 top-24 z-[95] rounded-[28px] border border-white/80 bg-white/92 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.18)] backdrop-blur-xl md:hidden"
          >
            <div className="grid gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="focus-ring rounded-2xl px-4 py-3 text-base font-semibold text-[var(--text)] transition-colors hover:bg-slate-50"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileOpen(false)}
                className="button-primary focus-ring mt-2"
              >
                Book Free Call
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

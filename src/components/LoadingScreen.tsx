"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <div
          className="text-4xl font-extrabold tracking-[-0.08em]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          AVINYA
        </div>
        <div className="typewriter text-sm font-semibold uppercase tracking-[0.3em] text-[var(--text-soft)]">
          Composing human-first automation
        </div>
      </div>
    </motion.div>
  );
}

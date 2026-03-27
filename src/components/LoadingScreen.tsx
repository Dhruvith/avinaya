"use client";

import { motion } from "framer-motion";

/* ============================
   Pantalla de carga con efecto typewriter
   Muestra "Initializing human connection..." antes del contenido
   ============================ */
export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo sutil durante la carga */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-wider"
          style={{ fontFamily: "var(--font-heading)", color: "var(--terracotta)" }}
        >
          AVINYA
        </motion.div>

        {/* Texto con efecto typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="typewriter">Initializing human connection...</div>
        </motion.div>

        {/* Indicador de progreso sutil */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
          className="h-[2px] rounded-full"
          style={{ background: "var(--terracotta)" }}
        />
      </div>
    </motion.div>
  );
}

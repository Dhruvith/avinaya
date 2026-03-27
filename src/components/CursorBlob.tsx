"use client";

import { useEffect, useRef } from "react";

/* ============================
   Blob que sigue al cursor del mouse
   Crea un efecto de iluminación ambiental suave
   ============================ */
export default function CursorBlob() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (blobRef.current) {
        blobRef.current.style.left = `${event.clientX}px`;
        blobRef.current.style.top = `${event.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div ref={blobRef} className="cursor-blob" aria-hidden="true" />;
}

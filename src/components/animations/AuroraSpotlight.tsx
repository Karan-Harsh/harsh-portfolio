"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function AuroraSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 40%)`;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Animated aurora blobs */}
      <motion.div
        aria-hidden
        className="absolute -inset-32 blur-3xl"
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{ opacity: 0.7, scale: 1.05 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(600px circle at 20% 20%, rgba(99,102,241,0.12), transparent 60%)," +
            "radial-gradient(600px circle at 80% 30%, rgba(236,72,153,0.10), transparent 60%)," +
            "radial-gradient(600px circle at 50% 80%, rgba(16,185,129,0.10), transparent 60%)",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to_right, rgba(229,229,229,0.12) 1px, transparent 1px)," +
            "linear-gradient(to_bottom, rgba(229,229,229,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "center",
        }}
      />

      {/* Spotlight following cursor */}
      <motion.div aria-hidden className="absolute inset-0" style={{ backgroundImage: spotlight }} />
    </div>
  );
}

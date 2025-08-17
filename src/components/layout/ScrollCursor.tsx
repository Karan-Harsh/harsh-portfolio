"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function ScrollCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rX = useSpring(x, { stiffness: 300, damping: 40 });
  const rY = useSpring(y, { stiffness: 300, damping: 40 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div className="cursor-ring" style={{
      background: `radial-gradient(80px circle at ${rX}px ${rY}px, rgba(255,255,255,0.06), transparent 40%)`
    }} />
  );
}

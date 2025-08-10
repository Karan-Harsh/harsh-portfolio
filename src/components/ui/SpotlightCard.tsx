"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function SpotlightCard({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 60%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("relative overflow-hidden rounded-xl border border-border/50 bg-card", className)}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ backgroundImage: spotlight }} />
      {children}
    </div>
  );
}

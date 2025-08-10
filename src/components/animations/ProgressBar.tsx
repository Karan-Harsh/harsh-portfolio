"use client";

import { motion } from "framer-motion";

export function ProgressBar({ progress, className }: { progress: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, progress));
  return (
    <div className={`h-2 w-full rounded-full bg-foreground/10 ${className ?? ""}`}>
      <motion.div
        className="h-2 rounded-full bg-foreground"
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

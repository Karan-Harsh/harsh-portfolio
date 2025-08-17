"use client";

import { useEffect, useRef } from "react";

export default function Magnetic({ strength = 0.3, children }: { strength?: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      el.style.transform = `translate(${dx * strength * 12}px, ${dy * strength * 12}px)`;
    };
    const handleLeave = () => {
      el.style.transform = `translate(0px, 0px)`;
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return <div ref={ref} className="inline-block will-change-transform">{children}</div>;
}

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-card text-card-foreground shadow-sm",
        "p-6 lg:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

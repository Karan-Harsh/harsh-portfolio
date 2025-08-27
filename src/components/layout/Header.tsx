"use client";

import { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/lib/active-section";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

const items = NAV_ITEMS.map((label) => ({ label, hash: `#${label.toLowerCase()}` }));

export default function Header() {
  const [open, setOpen] = useState(false);
  const { activeSectionId } = useActiveSection();

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 frosted-glass border-b border-white/10 shadow-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">Harsh Karan</Link>
        <nav className="hidden gap-6 md:flex">
          {items.map((item) => {
            const isActive = activeSectionId === item.hash.slice(1);
            return (
              <Link
                key={item.hash}
                href={`/${item.hash}`}
                className={cn(
                  "group relative text-sm text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-foreground"
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-foreground transition-transform duration-300",
                    (isActive ? "scale-x-100" : "group-hover:scale-x-100")
                  )}
                />
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/10 frosted-glass md:hidden">
          <div className="container flex flex-col gap-2 py-4">
            {items.map((item) => (
              <Link
                key={item.hash}
                href={`/${item.hash}`}
                className={cn(
                  "py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                  activeSectionId === item.hash.slice(1) && "text-foreground"
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

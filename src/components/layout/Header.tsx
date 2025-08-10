"use client";

import { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/lib/active-section";
import { Button } from "@/components/ui/Button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const items = NAV_ITEMS.map((label) => ({ label, href: `#${label.toLowerCase()}` }));

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { activeSectionId } = useActiveSection();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight">HK</a>
        <nav className="hidden gap-6 md:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm text-muted-foreground hover:text-foreground transition-colors",
                activeSectionId === item.href.slice(1) && "text-foreground"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {mounted ? (
              resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
            ) : (
              <span className="h-4 w-4" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/50 bg-background md:hidden">
          <div className="container flex flex-col gap-2 py-4">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                  activeSectionId === item.href.slice(1) && "text-foreground"
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

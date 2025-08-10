"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type ActiveSectionContextType = {
  activeSectionId: string | null;
  setActiveSectionId: (id: string | null) => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const value = useMemo(() => ({ activeSectionId, setActiveSectionId }), [activeSectionId]);
  return <ActiveSectionContext.Provider value={value}>{children}</ActiveSectionContext.Provider>;
}

export function useActiveSection() {
  const ctx = useContext(ActiveSectionContext);
  if (!ctx) throw new Error("useActiveSection must be used within ActiveSectionProvider");
  return ctx;
}

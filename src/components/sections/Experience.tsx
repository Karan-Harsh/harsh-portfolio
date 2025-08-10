"use client";

import { experienceData } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { useState, useEffect } from "react";
import { useActiveSection } from "@/lib/active-section";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

export default function Experience() {
  const { setActiveSectionId } = useActiveSection();
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) setActiveSectionId("experience");
  }, [inView, setActiveSectionId]);

  return (
    <section id="experience" ref={ref} className="section">
      <div className="container">
        <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
        <div className="mt-6 space-y-6">
          {experienceData.map((exp, idx) => (
            <TimelineItem key={idx} {...exp} />)
          )}
        </div>
      </div>
    </section>
  );
}

function TimelineItem(props: (typeof experienceData)[number]) {
  const [open, setOpen] = useState(true);
  return (
    <div className="grid gap-4 md:grid-cols-[16px_1fr]">
      <div className="relative hidden md:block">
        <div className="absolute left-[6px] top-0 h-full w-[2px] bg-foreground/20" />
        <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-foreground" />
      </div>
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">{props.role} · {props.company}</h3>
            <p className="text-sm text-muted-foreground">{props.duration} · {props.location}</p>
            <p className="mt-1 text-sm text-muted-foreground">{props.type}</p>
          </div>
          <button className="text-muted-foreground hover:text-foreground" onClick={() => setOpen((o) => !o)} aria-label="Toggle achievements">
            <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
        {open && (
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
            {props.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

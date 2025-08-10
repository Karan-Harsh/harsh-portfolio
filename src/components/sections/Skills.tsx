"use client";

import { skillsData } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { useActiveSection } from "@/lib/active-section";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Skills() {
  const { setActiveSectionId } = useActiveSection();
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) setActiveSectionId("skills");
  }, [inView, setActiveSectionId]);

  return (
    <section id="skills" ref={ref} className="section">
      <div className="container">
        <FadeInSection>
          <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
        </FadeInSection>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {skillsData.categories.map((cat) => (
            <Card key={cat.title}>
              <h3 className="text-lg font-medium">{cat.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

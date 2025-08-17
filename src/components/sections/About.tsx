"use client";

import { Card } from "@/components/ui/Card";
import { aboutData } from "@/lib/constants";
import { FadeInSection } from "@/components/animations/FadeInSection";
import { useEffect } from "react";
import { useActiveSection } from "@/lib/active-section";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import NumberTicker from "@/components/animations/NumberTicker";

function Counter({ value }: { value: string }) {
  const numeric = parseFloat(value);
  const suffix = value.replace(String(numeric), "");
  return (
    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <NumberTicker value={numeric} />{suffix}
    </motion.span>
  );
}

export default function About() {
  const { setActiveSectionId } = useActiveSection();
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) setActiveSectionId("about");
  }, [inView, setActiveSectionId]);

  return (
    <section id="about" ref={ref} className="section">
      <div className="container">
        <FadeInSection>
          <h2 className="text-2xl font-semibold tracking-tight">{aboutData.title}</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">{aboutData.description}</p>
        </FadeInSection>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-medium">Achievements</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {aboutData.achievements.map((a) => (
                <div key={a.description} className="rounded-lg border border-border/50 p-4">
                  <div className="text-2xl font-bold"><Counter value={a.metric} /></div>
                  <div className="mt-1 text-sm text-muted-foreground">{a.description}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-medium">Education</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><span className="text-muted-foreground">Degree:</span> {aboutData.education.degree}</li>
              <li><span className="text-muted-foreground">University:</span> {aboutData.education.university}</li>
              <li><span className="text-muted-foreground">CGPA:</span> {aboutData.education.cgpa}</li>
              <li><span className="text-muted-foreground">Duration:</span> {aboutData.education.duration}</li>
              {aboutData.education.schooling && (
                <li className="pt-2">
                  <div className="font-medium">Schooling</div>
                  <div className="text-muted-foreground">
                    {aboutData.education.schooling.school} · {aboutData.education.schooling.board} · {aboutData.education.schooling.score}
                  </div>
                </li>
              )}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useActiveSection } from "@/lib/active-section";
import { useInView } from "react-intersection-observer";
import Carousel from "@/components/ui/Carousel";
import { AnimatePresence, motion } from "framer-motion";

export default function Projects() {
  const { setActiveSectionId } = useActiveSection();
  const { ref, inView } = useInView({ threshold: 0.2 });
  const [preview, setPreview] = useState<(typeof projectsData)[number] | null>(null);

  useEffect(() => {
    if (inView) setActiveSectionId("projects");
  }, [inView, setActiveSectionId]);

  return (
    <section id="projects" ref={ref} className="section">
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <Button asChild variant="link" className="text-sm md:relative md:top-0 relative top-10">
            <Link href="/projects">View all →</Link>
          </Button>
        </div>
        <div className="mt-6">
          <Carousel>
            {projectsData.map((p) => (
              <Card key={p.title} className="flex h-full min-h-[24rem] flex-col group will-change-transform [transform-style:preserve-3d] transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border/50 [transform:translateZ(20px)]">
                  <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                       style={{ background: "radial-gradient(600px circle at 50% 30%, rgba(255,255,255,0.08), transparent 40%)" }} />
                </div>
                <h3 className="mt-4 text-lg font-medium [transform:translateZ(10px)]">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.technologies.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild variant="outline"><a href={p.githubUrl} target="_blank" rel="noreferrer">GitHub</a></Button>
                  <Button asChild><a href={p.liveUrl} target="_blank" rel="noreferrer">Live</a></Button>
                  <Button variant="ghost" onClick={() => setPreview(p)}>Preview</Button>
                </div>
              </Card>
            ))}
          </Carousel>
        </div>
      </div>
      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setPreview(null)} />
            <motion.div
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-xl border border-border/50 bg-card p-0 shadow-2xl"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
            >
              <div className="relative aspect-video w-full">
                <Image src={preview.image} alt={preview.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{preview.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{preview.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {preview.technologies.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild variant="outline"><a href={preview.githubUrl} target="_blank" rel="noreferrer">GitHub</a></Button>
                  <Button asChild><a href={preview.liveUrl} target="_blank" rel="noreferrer">Live</a></Button>
                  <Button variant="ghost" onClick={() => setPreview(null)}>Close</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

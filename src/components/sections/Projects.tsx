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
import ProjectGrid from "@/components/ui/ProjectGrid";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

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
          <Button asChild variant="link" className="text-sm">
            <Link href="/projects">View all →</Link>
          </Button>
        </div>
        <div className="mt-8">
          <ProjectGrid>
            {projectsData.map((p) => (
              <Card key={p.title} className="group overflow-hidden h-[500px] flex flex-col">
                <div className="relative aspect-video w-full overflow-hidden flex-shrink-0">
                  <Image 
                    src={p.image} 
                    alt={p.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" 
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
                    {p.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} className="text-xs">{tech}</Badge>
                    ))}
                    {p.technologies.length > 3 && (
                      <Badge className="text-xs">+{p.technologies.length - 3}</Badge>
                    )}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Live
                      </a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setPreview(p)}
                      className="px-3"
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </ProjectGrid>
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
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-xl backdrop-blur-md bg-background/20 dark:bg-background/30 border border-border/20 p-0 shadow-2xl"
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

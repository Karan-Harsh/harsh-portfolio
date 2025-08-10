"use client";

import Image from "next/image";
import { TypewriterEffect } from "@/components/animations/TypewriterEffect";
import { Button } from "@/components/ui/Button";
import { heroData } from "@/lib/constants";
import { Github, Linkedin, Globe, ChevronDown, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useActiveSection } from "@/lib/active-section";
import { useInView } from "react-intersection-observer";
import AuroraSpotlight from "@/components/animations/AuroraSpotlight";

export default function Hero() {
  const { setActiveSectionId } = useActiveSection();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) setActiveSectionId("home");
  }, [inView, setActiveSectionId]);

  return (
    <section id="home" ref={ref} className="section relative overflow-hidden min-h-screen flex items-center">
      <AuroraSpotlight />
      <div className="container grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{heroData.name}</h1>
          <div className="mt-3 text-xl text-muted-foreground">
            <TypewriterEffect words={[heroData.title, heroData.subtitle]} />
          </div>
          <p className="mt-4 max-w-xl text-muted-foreground">{heroData.description}</p>
          <div className="mt-6 flex gap-3">
            {heroData.ctas.map((cta) => (
              <Button key={cta.href} asChild>
                <a href={cta.href}>{cta.text}</a>
              </Button>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4 text-muted-foreground">
            <a href="www.linkedin.com/in/karan-harsh" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
            <a href="https://github.com/Karan-Harsh" aria-label="GitHub" className="hover:text-foreground"><Github className="h-5 w-5" /></a>
            <a href="https://www.instagram.com/_karan_harsh/" aria-label="Instagram" className="hover:text-foreground"><Instagram className="h-5 w-5" /></a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative h-64 w-64 overflow-hidden rounded-full border border-border/50 md:h-64 md:w-64">
            <Image src="/images/img2.png" alt="Harsh Karan" fill className="object-cover" />
          </div>
        </motion.div>
      </div>
      <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground">
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}

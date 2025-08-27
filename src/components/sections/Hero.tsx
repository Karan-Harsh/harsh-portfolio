"use client";

import { TextGenerateEffect } from "@/components/aceternity/TextGenerateEffect";
import { Button } from "@/components/ui/Button";
import { heroData } from "@/lib/constants";
import { Github, Linkedin, ChevronDown, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useActiveSection } from "@/lib/active-section";
import { useInView } from "react-intersection-observer";
import Starfield from "@/components/three/Starfield";
import Magnetic from "@/components/animations/Magnetic";

export default function Hero() {
  const { setActiveSectionId } = useActiveSection();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) setActiveSectionId("home");
  }, [inView, setActiveSectionId]);

  return (
    <section id="home" ref={ref} className="section relative overflow-hidden min-h-screen flex items-center">
      {/* Subtle starfield effect only */}
      <Starfield />
      
      <div className="container relative z-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Main heading with enhanced typography */}
          <div className="frosted-glass-strong rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-b from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                {heroData.name}
              </span>
            </h1>
            
            {/* Enhanced subtitle with better contrast */}
            <div className="mt-6 text-2xl md:text-3xl text-foreground/90 font-medium">
              <TextGenerateEffect 
                words={`${heroData.title} • ${heroData.subtitle}`}
                className="text-2xl md:text-3xl font-medium"
              />
            </div>
            
            {/* Improved description with better typography */}
            <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {heroData.description}
            </p>
            
            {/* Enhanced CTAs with clear hierarchy */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Magnetic>
                <Button asChild size="lg" className="text-lg px-8 py-4">
                  <a href="#projects">View My Work</a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                  <a href="#contact">Get In Touch</a>
                </Button>
              </Magnetic>
            </div>
            
            {/* Professional social links */}
            <div className="mt-8 flex items-center justify-center gap-6 text-foreground/70">
              <a 
                href="https://www.linkedin.com/in/karan-harsh" 
                aria-label="LinkedIn" 
                className="hover:text-foreground transition-colors p-2 hover:scale-110 transition-transform"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://github.com/Karan-Harsh" 
                aria-label="GitHub" 
                className="hover:text-foreground transition-colors p-2 hover:scale-110 transition-transform"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/_karan_harsh/" 
                aria-label="Instagram" 
                className="hover:text-foreground transition-colors p-2 hover:scale-110 transition-transform"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <div className="inline-flex items-center gap-2 frosted-glass rounded-full px-4 py-2 text-sm text-foreground/80">
              📍 {heroData.location}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.a 
        href="#about" 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/60 hover:text-foreground transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </motion.a>
    </section>
  );
}

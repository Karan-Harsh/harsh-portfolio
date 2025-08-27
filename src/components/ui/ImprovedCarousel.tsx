"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export default function ImprovedCarousel({
  children,
  className,
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = children.length;

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % totalSlides;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(prev);
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    if (autoPlay) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayInterval);
    }
  };

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, currentIndex, resetAutoPlay]);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Main carousel container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl"
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 frosted-glass border-white/20 hover:bg-white/20"
            onClick={() => {
              prevSlide();
              resetAutoPlay();
            }}
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 frosted-glass border-white/20 hover:bg-white/20"
            onClick={() => {
              nextSlide();
              resetAutoPlay();
            }}
            disabled={isTransitioning}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {children.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200",
                currentIndex === index
                  ? "bg-white scale-110"
                  : "bg-white/40 hover:bg-white/60"
              )}
              onClick={() => {
                goToSlide(index);
                resetAutoPlay();
              }}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-white/60 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  );
}
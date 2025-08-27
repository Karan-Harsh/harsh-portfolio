"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  children: React.ReactNode[];
  itemsPerPage?: number;
  className?: string;
}

export default function ProjectGrid({
  children,
  itemsPerPage = 3,
  className,
}: ProjectGridProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(children.length / itemsPerPage);

  const getCurrentItems = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return children.slice(start, end);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (totalPages <= 1) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Grid container */}
      <div className="relative min-h-[700px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {getCurrentItems().map((child, index) => (
              <motion.div
                key={`${currentPage}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevPage}
          className="frosted-glass border-white/20"
          disabled={totalPages <= 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200",
                currentPage === i
                  ? "bg-white scale-110"
                  : "bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={nextPage}
          className="frosted-glass border-white/20"
          disabled={totalPages <= 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Page indicator */}
      <div className="text-center text-sm text-white/70">
        Page {currentPage + 1} of {totalPages} • {children.length} projects total
      </div>
    </div>
  );
}
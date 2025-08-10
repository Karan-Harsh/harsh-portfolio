"use client";

import { useEffect, useState } from "react";

export function TypewriterEffect({ words, speed = 80, pause = 1200 }: { words: string[]; speed?: number; pause?: number }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = words[index % words.length];
    if (!deleting) {
      if (display.length < full.length) {
        const timeout = setTimeout(() => setDisplay(full.slice(0, display.length + 1)), speed);
        return () => clearTimeout(timeout);
      }
      const pauseTimeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(pauseTimeout);
    } else {
      if (display.length > 0) {
        const timeout = setTimeout(() => setDisplay(full.slice(0, display.length - 1)), speed / 2);
        return () => clearTimeout(timeout);
      }
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }
  }, [display, deleting, index, words, speed, pause]);

  return (
    <span className="whitespace-pre">
      {display}
      <span className="ml-1 inline-block w-[1ch] animate-pulse">|</span>
    </span>
  );
}

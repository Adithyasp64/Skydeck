"use client";

import { Instagram } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/skydeck__rrnagar?stkn=ZDNlZDc0MzIxNw==";

export default function InstagramFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("#hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0.05 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noreferrer"
      initial={false}
      animate={
        isVisible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: shouldReduceMotion ? 0 : 10, scale: 0.92 }
      }
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Visit Skydeck on Instagram"
      className="pointer-events-none fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-char2/95 text-gold shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-void focus-visible:pointer-events-auto sm:right-6"
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <Instagram size={21} strokeWidth={1.6} />
    </motion.a>
  );
}

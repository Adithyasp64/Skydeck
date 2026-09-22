"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const HERO_SLIDES = [
  {
    src: "/images/ambience/hero-main.jpg",
    alt: "Skydeck's main floor at night, lit in warm gold and neon",
    eyebrow: "RR Nagar • Bengaluru",
    headline: "Make Tonight a STORY.",
    accent: "STORY.",
    description: "Good food. Live energy. Unforgettable nights.",
  },
  {
    src: "/images/ambience/hero-alt.jpg",
    alt: "Skydeck's atmospheric lounge interior",
    eyebrow: "A TABLE ABOVE THE ORDINARY",
    headline: "Where Night Feels ALIVE.",
    accent: "ALIVE.",
    description: "Settle in for golden hours and electric evenings.",
  },
  {
    src: "/images/ambience/night_life.jpg",
    alt: "Skydeck's wide lounge space",
    eyebrow: "EAT • DRINK • UNWIND",
    headline: "Good Times Served, LOUD.",
    accent: "LOUD.",
    description: "Signature pours, bold plates, and a room that moves.",
  },
  {
    src: "/images/gallery/bar.jpg",
    alt: "Skydeck's greenery-lined dining hall",
    eyebrow: "YOUR NEXT NIGHT OUT",
    headline: "Rooftop Energy, REFINED.",
    accent: "REFINED.",
    description: "Come for the view. Stay for the feeling.",
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 72]);

  useEffect(() => {
    HERO_SLIDES.slice(1).forEach(({ src }) => {
      const image = new window.Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isPaused, shouldReduceMotion]);

  const scrollToExperience = () => {
    document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex h-[100svh] w-full items-end overflow-hidden bg-void"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={HERO_SLIDES[slideIndex].src}
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -28 }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[slideIndex].src}
              alt={HERO_SLIDES[slideIndex].alt}
              fill
              priority={slideIndex === 0}
              sizes="100vw"
              className="hero-ken-burns object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* readability + mood overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-transparent to-transparent" />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full px-6 pb-20 lg:px-10 lg:pb-28"
      >
        <div className="mx-auto max-w-7xl">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -14 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="mb-5 text-xs font-semibold uppercase tracking-widest2 text-gold"
              >
                {HERO_SLIDES[slideIndex].eyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl font-display text-5xl font-bold leading-[1.05] text-bone sm:text-6xl lg:text-7xl"
              >
                {HERO_SLIDES[slideIndex].headline.replace(HERO_SLIDES[slideIndex].accent, "")}
                <span className="text-gold">{HERO_SLIDES[slideIndex].accent}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.75, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 max-w-md text-lg text-smoke"
              >
                {HERO_SLIDES[slideIndex].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <button
              onClick={() =>
                document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-void transition-transform duration-300 ease-cinematic hover:-translate-y-0.5 hover:bg-goldSoft"
            >
              Reserve a Table
            </button>
            <button
              onClick={scrollToExperience}
              className="rounded-sm border border-bone/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest2 text-bone transition-all duration-300 ease-cinematic hover:-translate-y-0.5 hover:border-bone/70"
            >
              Explore Skydeck
            </button>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        onClick={scrollToExperience}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-bone/70"
        aria-label="Scroll to next section"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown size={26} />
        </motion.span>
      </motion.button>
    </section>
  );
}

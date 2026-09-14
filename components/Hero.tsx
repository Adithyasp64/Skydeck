"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const scrollToExperience = () => {
    document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex h-[100svh] w-full items-end overflow-hidden bg-void"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src="/images/ambience/hero-main.jpg"
          alt="Skydeck's main floor at night, lit in warm gold and neon"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* readability + mood overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-transparent to-transparent" />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full px-6 pb-20 lg:px-10 lg:pb-28"
      >
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mb-5 text-xs font-semibold uppercase tracking-widest2 text-gold"
          >
            RR Nagar • Bengaluru
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="max-w-3xl font-display text-5xl font-bold leading-[1.05] text-bone sm:text-6xl lg:text-7xl"
          >
            Elevate your evening.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="mt-5 max-w-md text-lg text-smoke"
          >
            Great food. Good music. Better nights.
          </motion.p>

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

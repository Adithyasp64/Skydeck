"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import AtmosphericFrame from "./AtmosphericFrame";

const POINTS = [
  { label: "Dinner", copy: "Plates meant for the table, not just one person." },
  { label: "Drinks", copy: "A bar that's as much the show as the seating." },
  { label: "Live music", copy: "Real acts, on a real stage, a few times a season." },
  { label: "Celebrations", copy: "Birthdays, wins, Fridays — we'll set it up." },
];

const EXPERIENCE_SLIDES = [
  { src: "/images/events/raghu-dixit-crowd.jpg", label: "The Concert" },
  { src: "/images/cuisine/signature-bites.jpg", label: "Signature Bites" },
  { src: "/images/menu/1.jpg", label: "Cocktails" },
  { src: "/images/ambience/florals.jpg", label: "A table in the greenery" },
];

export default function Experience() {
  const [slideIndex, setSlideIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    EXPERIENCE_SLIDES.slice(1).forEach((slide) => {
      const image = new window.Image();
      image.src = slide.src;
    });

    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % EXPERIENCE_SLIDES.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="experience" className="section-glow relative overflow-hidden bg-void py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative aspect-[4/5] w-full"
        >
          <div className="absolute -inset-3 border border-gold/20" />
          <div className="relative h-full overflow-hidden rounded-sm lg:hidden">
            <motion.div
              className="flex h-full w-[800%] gap-3 bg-void"
              animate={shouldReduceMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.01 }
                  : { duration: 28, ease: "linear", repeat: Infinity }
              }
            >
              {[...EXPERIENCE_SLIDES, ...EXPERIENCE_SLIDES].map((slide, index) => (
                <div key={`${slide.src}-${index}`} className="relative h-full w-[calc(12.5%-0.75rem)] shrink-0">
                  <AtmosphericFrame
                    src={slide.src}
                    alt={slide.label}
                    className="h-full w-full"
                    sizes="100vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 flex items-center gap-3">
                    <span className="h-px w-8 bg-gold" />
                    <span className="text-[10px] font-medium uppercase tracking-widest2 text-bone">
                      {slide.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative hidden h-full overflow-hidden rounded-sm lg:block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={EXPERIENCE_SLIDES[slideIndex].src}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -36 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <AtmosphericFrame
                  src={EXPERIENCE_SLIDES[slideIndex].src}
                  alt={EXPERIENCE_SLIDES[slideIndex].label}
                  cursorLabel="View"
                  className="h-full w-full"
                  sizes="50vw"
                />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="text-[10px] font-medium uppercase tracking-widest2 text-bone">
                {EXPERIENCE_SLIDES[slideIndex].label}
              </span>
            </div>
            <div className="absolute right-5 top-5 flex flex-col gap-2">
              {EXPERIENCE_SLIDES.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setSlideIndex(index)}
                  aria-label={`Show ${slide.label}`}
                  className={`h-6 w-3 border-0 transition-colors ${index === slideIndex ? "bg-gold" : "bg-bone/30"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col justify-center"
        >
          <h2 className="font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
            More than just a meal.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-smoke">
            Skydeck isn&apos;t built around one thing. It&apos;s the place you land
            after work drinks turn into dinner, where a Tuesday can feel like a
            Friday, and where the night usually runs longer than planned.
            Come for the food, stay for the room.
          </p>

          <div className="mt-11 grid grid-cols-2 gap-x-8 gap-y-8">
            {POINTS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
                className="border-l border-line pl-4"
              >
                <div className="font-display text-base font-semibold text-gold">
                  {p.label}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-smoke">{p.copy}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

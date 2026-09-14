"use client";

import { motion } from "framer-motion";
import { galleryImages } from "@/data/gallery";
import AtmosphericFrame from "./AtmosphericFrame";

const SIZE_CLASSES: Record<string, string> = {
  sm: "col-span-1 row-span-1 sm:col-span-1 lg:col-span-3 lg:row-span-1",
  md: "col-span-1 row-span-1 sm:col-span-1 lg:col-span-3 lg:row-span-2",
  lg: "col-span-2 row-span-1 sm:col-span-2 lg:col-span-6 lg:row-span-2",
};

const TONES = ["gold", "ember", "violet", "blue"] as const;

export default function Gallery() {
  return (
    <section className="section-glow relative overflow-hidden bg-void py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-xl"
        >
          <h2 className="font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
            A little look inside.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-smoke">
            Interiors, food, the bar, the crowd — a quick walk through Skydeck.
          </p>
        </motion.div>

        <div className="relative grid auto-rows-[clamp(9.5rem,42vw,13rem)] grid-cols-2 gap-3 sm:auto-rows-[170px] sm:gap-4 lg:auto-rows-[150px] lg:grid-cols-12">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.07 }}
              className={`group relative overflow-hidden rounded-sm ${SIZE_CLASSES[img.size]}`}
            >
              <AtmosphericFrame
                src={img.src}
                alt={img.caption}
                cursorLabel="View"
                tone={TONES[i % TONES.length]}
                className="h-full w-full brightness-95 transition-[filter] duration-500 group-hover:brightness-110"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-void/0 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 translate-y-2 text-xs font-medium text-bone opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {img.caption}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

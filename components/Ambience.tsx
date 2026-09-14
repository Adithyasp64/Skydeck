"use client";

import { motion } from "framer-motion";
import AtmosphericFrame from "./AtmosphericFrame";

const TILES = [
  {
    src: "/images/ambience/bar-glow.jpg",
    caption: "The lights",
    tone: "gold" as const,
    // large hero tile
    span: "col-span-2 row-span-2 aspect-[4/5] sm:aspect-[16/13]",
  },
  {
    src: "/images/ambience/florals.jpg",
    caption: "The green",
    tone: "ember" as const,
    span: "col-span-1 row-span-1 aspect-[3/4]",
  },
  {
    src: "/images/ambience/bar-chevron.jpg",
    caption: "The bar",
    tone: "blue" as const,
    span: "col-span-1 row-span-2 aspect-[3/5] sm:aspect-auto",
  },
  {
    src: "/images/ambience/arches.jpg",
    caption: "The vibe",
    tone: "gold" as const,
    span: "col-span-1 row-span-1 aspect-[3/4]",
  },
  {
    src: "/images/ambience/mural-monkey.jpg",
    caption: "The details",
    tone: "violet" as const,
    span: "col-span-1 row-span-1 aspect-[3/4]",
  },
];

export default function Ambience() {
  return (
    <section id="ambience" className="relative bg-void py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-xl"
        >
          <h2 className="font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
            The Skydeck experience.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-smoke">
            Gold light, hanging green, and a bar that changes colour through
            the night. Photos only get you halfway there.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.caption}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-sm ${tile.span}`}
            >
              <AtmosphericFrame
                src={tile.src}
                alt={`Skydeck — ${tile.caption.toLowerCase()}`}
                cursorLabel="View"
                tone={tile.tone}
                className="h-full w-full"
                sizes="(min-width: 1024px) 40vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
              <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-widest2 text-bone">
                {tile.caption}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

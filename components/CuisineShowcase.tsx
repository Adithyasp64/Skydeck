"use client";

import { motion } from "framer-motion";
import { cuisines } from "@/data/cuisines";
import AtmosphericFrame from "./AtmosphericFrame";

const TONES = ["gold", "ember", "violet", "blue"] as const;

export default function CuisineShowcase() {
  return (
    <section id="food" className="relative bg-void py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-xl"
        >
          <h2 className="font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
            Come hungry.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-smoke">
            A kitchen that moves across cuisines without losing the plot —
            here&apos;s a taste of what&apos;s on offer.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {cuisines.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm"
            >
              <AtmosphericFrame
                src={c.image}
                alt={c.name}
                tone={TONES[i % TONES.length]}
                className="h-full w-full"
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="font-display text-lg font-bold text-bone sm:text-xl">
                  {c.name}
                </h3>
                <p className="mt-1 text-xs text-smoke sm:text-sm">{c.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

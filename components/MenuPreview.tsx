"use client";

import { motion } from "framer-motion";
import { menuPreview, fullMenuUrl } from "@/data/menuPreview";
import AtmosphericFrame from "./AtmosphericFrame";

const TONES = ["ember", "gold", "violet", "blue"] as const;

export default function MenuPreview() {
  return (
    <section className="relative bg-void py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
              A few things worth ordering.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-smoke">
              Not the whole menu — just the dishes people keep coming back for.
            </p>
          </div>
          <a
            href={fullMenuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-sm border border-bone/30 px-6 py-3 text-xs font-semibold uppercase tracking-widest2 text-bone transition-all duration-300 hover:border-gold hover:text-gold"
          >
            View Full Menu
          </a>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {menuPreview.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <AtmosphericFrame
                  src={item.image}
                  alt={item.name}
                  tone={TONES[i % TONES.length]}
                  className="h-full w-full"
                  sizes="(min-width: 1024px) 33vw, 50vw"
                />
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-base font-semibold text-bone">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-smoke sm:text-sm">{item.description}</p>
                </div>
                {item.price && (
                  <span className="shrink-0 text-sm font-semibold text-gold">{item.price}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

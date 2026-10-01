"use client";

import { motion } from "framer-motion";
import { menuPreview, fullMenuUrl } from "@/data/menuPreview";
import AtmosphericFrame from "./AtmosphericFrame";

const TONES = ["ember", "gold", "violet", "blue"] as const;

export default function MenuPreview() {
  return (
    <section className="relative bg-void py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <h2 className="text-balance font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
              Timeless <span className="text-gold">Recommendations</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-smoke">
              Not the whole menu — just the dishes people keep coming back for.
            </p>
          </div>
          <a
            href={fullMenuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-sm border border-bone/30 px-6 py-3 text-center text-xs font-semibold uppercase tracking-widest2 text-bone transition-all duration-300 hover:border-gold hover:text-gold sm:w-auto sm:shrink-0"
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
              <a
                href={fullMenuUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${item.name} on the full menu`}
                className="block overflow-hidden rounded-sm"
              >
                <div className="relative aspect-square">
                  <AtmosphericFrame
                    src={item.image}
                    alt={item.name}
                    tone={TONES[i % TONES.length]}
                    className="h-full w-full"
                    sizes="(min-width: 1024px) 33vw, 50vw"
                  />
                </div>
              </a>
              <div className="mt-3 flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <div className="min-w-0">
                  <h3 className="break-words font-display text-sm font-semibold leading-snug text-bone sm:text-base">
                    {item.name}
                  </h3>
                  <p className="mt-1 break-words text-xs leading-relaxed text-smoke sm:text-sm">
                    {item.description}
                  </p>
                </div>
                {item.price && (
                  <span className="max-w-full break-words text-xs font-semibold leading-relaxed text-gold sm:shrink-0 sm:text-right sm:text-sm">
                    {item.price}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

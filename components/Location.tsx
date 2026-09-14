"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import { restaurantInfo } from "@/data/restaurant";
import AtmosphericFrame from "./AtmosphericFrame";

export default function Location() {
  const r = restaurantInfo;

  return (
    <section id="location" className="relative bg-char py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
            Find your way up.
          </h2>

          <div className="mt-8">
            <p className="font-display text-2xl font-bold text-gold">{r.name}</p>
            <p className="text-sm uppercase tracking-widest2 text-smoke">{r.tagline}</p>
          </div>

          <div className="mt-9 space-y-6">
            <div className="flex items-start gap-3.5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
              <div>
                <p className="text-sm text-bone">{r.address}</p>
                <p className="text-sm text-smoke">{r.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Phone size={18} className="mt-0.5 shrink-0 text-gold" />
              <p className="text-sm text-bone">{r.phone}</p>
            </div>
            <div className="flex items-start gap-3.5">
              <Clock size={18} className="mt-0.5 shrink-0 text-gold" />
              <div className="space-y-1">
                {r.openingHours.map((h, i) => (
                  <p key={i} className="text-sm text-bone">
                    <span className="text-smoke">{h.days}:</span> {h.hours}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Instagram size={18} className="mt-0.5 shrink-0 text-gold" />
              <p className="text-sm text-bone">{r.instagram}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={r.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-widest2 text-void transition-transform duration-300 hover:-translate-y-0.5"
            >
              Get Directions
            </a>
            <a
              href={`tel:${r.phone}`}
              className="rounded-sm border border-bone/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest2 text-bone transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Call Us
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-sm lg:aspect-auto"
        >
          <AtmosphericFrame
            src="/images/ambience/hall-rows.jpg"
            alt="Skydeck dining hall from the entrance"
            tone="blue"
            className="h-full w-full"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </motion.div>
      </div>
    </section>
  );
}

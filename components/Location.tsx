"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import { restaurantInfo } from "@/data/restaurant";
import AtmosphericFrame from "./AtmosphericFrame";

export default function Location() {
  const r = restaurantInfo;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="section-glow relative isolate overflow-hidden bg-char py-24 lg:py-32"
    >
      <motion.div
        style={{ scale: imageScale, y: imageY }}
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block"
      >
        <AtmosphericFrame
          src="/images/ambience/bar-glow.jpg"
          alt="Skydeck dining hall from the entrance"
          tone="blue"
          className="h-full w-full"
          sizes="58vw"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-char via-char/90 to-char/10 lg:block" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-char/20 via-transparent to-char lg:hidden" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 px-6 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
            Find your <span className="text-gold">way up.</span>
          </h2>

          <div className="mt-8">
            <p className="font-display text-2xl font-bold text-gold">{r.name}</p>
            <p className="text-sm uppercase tracking-widest2 text-smoke">{r.tagline}</p>
          </div>

          <div className="mt-9 space-y-6">
            <div className="flex items-start gap-3.5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
              <div>
                <p className="text-sm text-bone"></p>
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
                    <span className="text-smoke">Monday:</span> 6:am
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Instagram size={18} className="mt-0.5 shrink-0 text-gold" />
              <a href="https://www.instagram.com/skydeck__rrnagar?stkn=ZDNlZDc0MzIxNw%3D%3D" target="_blank" rel="noopener noreferrer">
                <p className="text-sm text-bone">{r.instagram}</p>
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={"https://www.google.com/maps/place/skydeck+rr+nagar/data=!4m2!3m1!1s0x3bae3f61cf1b851b:0x1a90962c08949642?sa=X&ved=1t:242&ictx=111"}
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
          className="relative mt-14 aspect-[4/5] w-full overflow-hidden rounded-sm border border-bone/10 lg:absolute lg:inset-y-20 lg:right-10 lg:mt-0 lg:hidden"
        >
          <AtmosphericFrame
            src="/images/ambience/bar-glow.jpg"
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

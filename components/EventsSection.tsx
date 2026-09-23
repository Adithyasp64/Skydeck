"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Instagram } from "lucide-react";
import { events } from "@/data/events";
import { sortEvents, formatEventDate } from "@/lib/events";
import { restaurantInfo } from "@/data/restaurant";
import AtmosphericFrame from "./AtmosphericFrame";

export default function EventsSection() {
  const { upcoming, past } = sortEvents(events);
  const [featured, ...restUpcoming] = upcoming;
  const pastCarousel = past.length > 0 ? [...past, ...past, ...past] : [];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="events" className="section-glow relative overflow-hidden bg-char py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-xl"
        >
          <h2 className="font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
            What&apos;s <span className="text-gold">happening</span> at Skydeck.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-smoke">
            Live sets, DJ nights and evenings worth planning around.
          </p>
        </motion.div>

        {!featured && (
          <OngoingEvents />
        )}

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative mb-6 overflow-hidden rounded-sm"
          >
            <div className="relative aspect-[4/5] w-full sm:aspect-[16/9]">
              <AtmosphericFrame
                src={featured.image}
                alt={featured.title}
                tone="violet"
                className="h-full w-full"
                sizes="100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest2 text-gold">
                  Upcoming • {formatEventDate(featured.date)}
                  {featured.time ? ` • ${featured.time}` : ""}
                </span>
                <h3 className="mt-2 font-display text-3xl font-bold text-bone sm:text-4xl">
                  {featured.artist ?? featured.title}
                </h3>
                {featured.artist && (
                  <p className="mt-1 text-sm uppercase tracking-widest2 text-smoke">
                    {featured.title}
                  </p>
                )}
                <p className="mt-3 max-w-xl text-sm text-smoke sm:text-base">
                  {featured.description}
                </p>
              </div>

              <Link
                href={featured.ctaHref ?? "#reservation"}
                className="inline-block shrink-0 rounded-sm bg-gold px-6 py-3 text-center text-xs font-semibold uppercase tracking-widest2 text-void transition-transform duration-300 hover:-translate-y-0.5"
              >
                {featured.ctaLabel ?? "Learn More"}
              </Link>
            </div>
          </motion.div>
        )}

        {restUpcoming.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {restUpcoming.map((e, i) => (
              <EventCard key={e.id} event={e} index={i} />
            ))}
          </div>
        )}

        {past.length > 0 && (
          <div className="mt-20">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest2 text-smoke">
              Past Events
            </h3>
            <div className="relative overflow-hidden sm:hidden" aria-label="Past events carousel">
              <motion.div
                className="flex w-max gap-3 pb-2"
                animate={shouldReduceMotion ? { x: 0 } : { x: ["0%", "-33.333%"] }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.01 }
                    : { duration: Math.max(24, past.length * 8), ease: "linear", repeat: Infinity }
                }
              >
                {pastCarousel.map((e, index) => (
                  <div key={`${e.id}-${index}`} className="group relative aspect-[3/4] w-[78vw] max-w-[280px] shrink-0 overflow-hidden rounded-sm">
                    <AtmosphericFrame
                      src={e.image}
                      alt={e.title}
                      tone="blue"
                      className="h-full w-full grayscale-[0.3] transition-[filter] duration-500 group-hover:grayscale-0"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-void/40" />
                    <span className="absolute right-2 top-2 rounded-sm bg-void/80 px-2 py-1 text-[9px] font-semibold uppercase tracking-widest2 text-smoke">
                      Event Ended
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="text-xs font-semibold text-bone">
                        {e.artist ?? e.title}
                      </p>
                      <p className="text-[10px] text-smoke">{formatEventDate(e.date)}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="relative hidden overflow-hidden sm:block" aria-label="Past events carousel">
              <motion.div
                className="flex w-max gap-3 sm:gap-4"
                animate={shouldReduceMotion ? { x: 0 } : { x: ["0%", "-33.333%"] }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.01 }
                    : { duration: Math.max(18, past.length * 12), ease: "linear", repeat: Infinity }
                }
              >
                {pastCarousel.map((e, index) => (
                  <div key={`${e.id}-desktop-${index}`} className="group relative aspect-[3/4] w-[calc((100vw-4rem)/3)] max-w-[260px] shrink-0 overflow-hidden rounded-sm lg:w-[calc((min(1120px,100vw)-4.5rem)/4)]">
                    <AtmosphericFrame
                      src={e.image}
                      alt={e.title}
                      tone="blue"
                      className="h-full w-full grayscale-[0.3] transition-[filter] duration-500 group-hover:grayscale-0"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-void/40" />
                    <span className="absolute right-2 top-2 rounded-sm bg-void/80 px-2 py-1 text-[9px] font-semibold uppercase tracking-widest2 text-smoke">
                      Event Ended
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="text-xs font-semibold text-bone">
                        {e.artist ?? e.title}
                      </p>
                      <p className="text-[10px] text-smoke">{formatEventDate(e.date)}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function OngoingEvents() {
  const shouldReduceMotion = useReducedMotion();
  const instagramUrl = `https://www.instagram.com/${restaurantInfo.instagram.replace(/^@/, "")}/`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate overflow-hidden rounded-sm border border-line bg-char2"
    >
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-14">
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest2 text-gold">
            <span className="h-px w-8 bg-gold" />
            Live at Skydeck
          </div>

          <div className="mt-16 lg:mt-24">
            <p className="mb-5 flex items-center gap-2 text-xs uppercase tracking-widest2 text-smoke">
              <CalendarDays size={14} className="text-gold" />
              Fresh nights, posted here first
            </p>
            <h2 className="max-w-2xl font-display text-5xl font-bold leading-[0.94] text-bone sm:text-7xl">
              The <span className="text-gold">night</span> is calling.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-smoke sm:text-base">
              New gigs and special nights land on our Instagram as they happen. Follow along for the latest lineup, then make a night of it.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-4">
          <motion.a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-sm border border-gold/40 bg-void/60 p-5 transition-colors duration-300 hover:border-gold sm:p-6"
            aria-label={`Open ${restaurantInfo.instagram} on Instagram`}
          >
            <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold">
                <Instagram size={21} strokeWidth={1.6} />
              </span>
              <ArrowUpRight className="text-smoke transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" size={20} />
            </div>
            <p className="mt-8 text-[10px] font-semibold uppercase tracking-widest2 text-smoke">See what&apos;s on</p>
            <p className="mt-2 break-all font-display text-2xl font-bold text-bone sm:text-3xl">{restaurantInfo.instagram}</p>
            <p className="mt-3 text-sm leading-relaxed text-smoke">Latest events, live moments and last-minute announcements.</p>
          </motion.a>

          <Link
            href="#reservation"
            className="event-cinema-cta group inline-flex min-h-14 items-center justify-between rounded-sm bg-gold px-5 py-4 text-xs font-semibold uppercase tracking-widest2 text-void transition-transform duration-300 hover:-translate-y-1 sm:px-6"
          >
            Book a table
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function EventCard({
  event,
  index,
}: {
  event: ReturnType<typeof sortEvents>["upcoming"][number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative aspect-[3/4] overflow-hidden rounded-sm"
    >
      <AtmosphericFrame src={event.image} alt={event.title} tone="ember" className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="text-[10px] font-semibold uppercase tracking-widest2 text-gold">
          {formatEventDate(event.date)}
        </span>
        <h4 className="mt-1 font-display text-lg font-bold text-bone">
          {event.artist ?? event.title}
        </h4>
      </div>
    </motion.div>
  );
}

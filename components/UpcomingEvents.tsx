"use client";

import { ChevronLeft, ChevronRight, CalendarDays, Clock3, Phone, Smartphone } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { UpcomingEvent } from "@/data/upcomingEvents";
import { restaurantInfo } from "@/data/restaurant";
import AtmosphericFrame from "./AtmosphericFrame";

const whatsappNumber = restaurantInfo.phone.replace(/\D/g, "");

function getWhatsAppHref(event: UpcomingEvent) {
  const message =
    event.bookingMessage ||
    [
      `Hi Skydeck, I would like to book for ${event.title}.`,
      `Date: ${event.dateLabel}`,
      `Time: ${event.timeLabel}`,
    ].join("\n");

  return `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function UpcomingEvents({
  events,
}: {
  events: UpcomingEvent[];
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  function moveCarousel(direction: "next" | "previous") {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction === "next" ? carousel.clientWidth * 0.86 : -carousel.clientWidth * 0.86,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section id="events" className="section-glow relative overflow-hidden bg-char py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest2 text-gold">
              The next round
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-bone sm:text-5xl">
              Upcoming <span className="text-gold">events.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-smoke sm:mt-4 sm:text-base">
              Keep your next night out on the calendar. Book directly with the Skydeck team.
            </p>
          </div>

          <div className="hidden shrink-0 gap-2 sm:flex">
            <CarouselButton direction="previous" onClick={() => moveCarousel("previous")} />
            <CarouselButton direction="next" onClick={() => moveCarousel("next")} />
          </div>
        </div>

        <div
          ref={carouselRef}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-10 sm:gap-5"
          aria-label="Upcoming events"
        >
         {events.map((event) => (
  <EventCard key={event.id} event={event} />
))}
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 sm:hidden">
          <p className="text-[10px] font-semibold uppercase tracking-widest2 text-smoke">
            Swipe to explore
          </p>
          <div className="flex gap-2">
            <CarouselButton direction="previous" onClick={() => moveCarousel("previous")} />
            <CarouselButton direction="next" onClick={() => moveCarousel("next")} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  direction,
  onClick,
}: {
  direction: "next" | "previous";
  onClick: () => void;
}) {
  const Icon = direction === "next" ? ChevronRight : ChevronLeft;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${direction === "next" ? "Next" : "Previous"} upcoming event`}
      className="flex h-11 w-11 items-center justify-center rounded-sm border border-bone/20 text-bone transition-colors duration-300 hover:border-gold hover:text-gold"
    >
      <Icon size={18} strokeWidth={1.5} />
    </button>
  );
}

function EventCard({ event }: { event: UpcomingEvent }) {
  return (
    <article className="group flex w-[86vw] max-w-[360px] shrink-0 snap-start flex-col overflow-hidden rounded-sm border border-bone/10 bg-char2 sm:w-[calc((100%-1.25rem)/2)] sm:max-w-none lg:w-[calc((100%-2.5rem)/3)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-void">
        <AtmosphericFrame
          src={event.image}
          alt={`${event.title} event poster`}
          tone={event.tone}
          imageFit="contain"
          className="h-full w-full transition-transform duration-700 ease-cinematic group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 86vw"
        />
        {event.isPlaceholder && (
          <span className="absolute left-3 top-3 rounded-sm border border-gold/40 bg-void/75 px-2 py-1 text-[9px] font-semibold uppercase tracking-widest2 text-gold">
            Details TBA
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-start gap-2 text-[9px] font-semibold uppercase tracking-widest2 text-smoke">
          <span className="flex min-w-0 items-center gap-1.5">
            <CalendarDays size={12} className="shrink-0 text-gold" strokeWidth={1.5} />
            {event.dateLabel}
          </span>
          <span aria-hidden="true" className="text-gold">•</span>
          <span className="flex min-w-0 items-center gap-1.5">
            <Clock3 size={12} className="shrink-0 text-gold" strokeWidth={1.5} />
            {event.timeLabel}
          </span>
        </div>
        <h3 className="mt-2 font-display text-xl font-bold leading-tight text-bone">{event.title}</h3>
        <p className="mt-1 text-[11px] leading-relaxed text-smoke">
          {event.isPlaceholder
            ? "Event details are being finalised. Message us to register your interest."
            : "Reserve your spot with the Skydeck team."}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href={getWhatsAppHref(event)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-1 rounded-sm bg-gold px-2 text-center text-[8px] font-bold uppercase tracking-widest2 text-void transition-colors duration-300 hover:bg-goldSoft"
          >
            <Smartphone size={13} strokeWidth={1.7} />
            Book on WhatsApp
          </a>
          <a
            href={`tel:+91${whatsappNumber}`}
            className="inline-flex min-h-10 items-center justify-center gap-1 rounded-sm border border-bone/25 px-2 text-center text-[8px] font-bold uppercase tracking-widest2 text-bone transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <Phone size={13} strokeWidth={1.7} />
            Call Now
          </a>
        </div>
      </div>
    </article>
  );
}

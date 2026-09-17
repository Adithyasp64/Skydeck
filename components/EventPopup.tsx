"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const SESSION_KEY = "skydeck-event-popup-shown";

export default function EventPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const hero = document.querySelector<HTMLElement>("#hero");
    if (!hero) return;

    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.bottom > 0) return;

        sessionStorage.setItem(SESSION_KEY, "true");
        timer = window.setTimeout(() => setIsOpen(true), 450);
        observer.disconnect();
      },
      { threshold: 0 },
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  function closePopup() {
    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Upcoming event"
          className="fixed inset-x-4 bottom-4 z-50 overflow-hidden rounded-sm border border-bone/20 bg-char2 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[min(420px,calc(100vw-3rem))]"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/events/event 3.jpg"
              alt=""
              fill
              sizes="420px"
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-char2 via-char2/90 to-char2/45" />
          </div>

          <div className="relative p-5 sm:p-6">
            <button
              type="button"
              onClick={closePopup}
              aria-label="Dismiss event popup"
              className="absolute right-3 top-3 rounded-full p-2 text-smoke transition-colors hover:bg-bone/10 hover:text-bone"
            >
              <X size={17} strokeWidth={1.5} />
            </button>

            <p className="text-[10px] font-semibold uppercase tracking-widest2 text-gold">
              Upcoming Event
            </p>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest2 text-smoke">
              Friday <span className="px-1 text-gold">•</span> 10 PM Onwards
            </p>
            <h2 className="mt-2 max-w-[16rem] font-display text-3xl font-bold leading-none text-bone">
              DJ Night
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-smoke">
              Live DJ <span className="px-1 text-gold">•</span> Signature Drinks <span className="px-1 text-gold">•</span> Rooftop Vibes
            </p>
            <a
              href="#reservation"
              onClick={closePopup}
              className="mt-5 inline-flex rounded-sm bg-gold px-5 py-3 text-[10px] font-semibold uppercase tracking-widest2 text-void transition-colors hover:bg-goldSoft"
            >
              Reserve a Table
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
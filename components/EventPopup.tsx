"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const SESSION_KEY = "skydeck-event-popup-shown";
const SHOW_AFTER_SCROLL = 320;

const TONIGHT_EVENT = {
  date: "SAT",
  time: "8:00 PM",
  title: "DJ Night",
  description: "Live music, drinks & good vibes.",
  image: "/images/events/event 3.jpg",
};

export default function EventPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (window.matchMedia("(max-width: 639px)").matches) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let timer: number | undefined;
    const onScroll = () => {
      if (window.scrollY < SHOW_AFTER_SCROLL) return;

      sessionStorage.setItem(SESSION_KEY, "true");
      timer = window.setTimeout(() => setIsOpen(true), 450);
      window.removeEventListener("scroll", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
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
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Tonight at Skydeck"
          className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 mx-auto hidden w-[calc(100vw-1.5rem)] max-w-[360px] overflow-hidden rounded-sm border border-bone/15 bg-char2 shadow-[0_18px_50px_rgba(0,0,0,0.5)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:mx-0 sm:block sm:w-[320px] sm:max-w-none"
        >
          <div className="absolute inset-0">
            <Image
              src={TONIGHT_EVENT.image}
              alt=""
              fill
              sizes="(max-width: 640px) 360px, 320px"
              className="object-cover opacity-10 sm:opacity-20"
            />
            <div className="absolute inset-0 bg-char2/85" />
          </div>

          <div className="relative flex items-center gap-3 p-3 pr-12 sm:block sm:p-5">
            <button
              type="button"
              onClick={closePopup}
              aria-label="Dismiss event popup"
              className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full text-smoke transition-colors hover:bg-bone/10 hover:text-bone"
            >
              <X size={16} strokeWidth={1.5} />
            </button>

            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-widest2 text-gold">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                Tonight at Skydeck
              </p>
              <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-widest2 text-smoke sm:mt-3">
                {TONIGHT_EVENT.date} <span className="px-1 text-gold">•</span> {TONIGHT_EVENT.time}
              </p>
              <h2 className="mt-1 max-w-[15rem] font-display text-xl font-bold leading-none text-bone sm:mt-1.5 sm:text-2xl">
                {TONIGHT_EVENT.title}
              </h2>
              <p className="mt-1 max-w-[13rem] truncate text-[10px] leading-relaxed text-smoke sm:mt-2 sm:max-w-xs sm:text-xs">
                {TONIGHT_EVENT.description}
              </p>
            </div>

            <a
              href="#reservation"
              onClick={closePopup}
              className="inline-flex min-h-10 shrink-0 items-center rounded-sm bg-gold px-3 py-2.5 text-[8px] font-semibold uppercase tracking-widest2 text-void transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-goldSoft sm:mt-4 sm:px-4 sm:text-[9px]"
            >
              Reserve a Table
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

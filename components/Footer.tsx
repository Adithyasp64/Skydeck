"use client";

import { Instagram } from "lucide-react";
import { restaurantInfo } from "@/data/restaurant";
import LoadingImage from "./LoadingImage";

const LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Food", href: "#food" },
  { label: "Events", href: "#events" },
  { label: "Reserve", href: "#reservation" },
];

export default function Footer() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative border-t border-line bg-void">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black p-2">
              <LoadingImage
                src="/images/logo.png"
                alt="Skydeck Resto Pub & Kitchen logo"
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </span>
            <p className="font-display text-lg font-bold tracking-wide text-bone">
              SKYDECK RR Nagar
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-sm text-smoke transition-colors hover:text-gold"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <a
            href={restaurantInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-smoke transition-colors hover:text-gold"
          >
            <Instagram size={16} />
            
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Skydeck, {restaurantInfo.location}. All rights reserved. Built with ❤️ from Nikith and Adithya SP.</p>
          <p>RR Nagar - Bengaluru</p>
        </div>
      </div>
    </footer>
  );
}

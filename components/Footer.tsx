"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { restaurantInfo } from "@/data/restaurant";

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
            <Image
              src="/images/logo.jpg"
              alt="Skydeck logo"
              width={44}
              height={44}
              className="rounded-full"
            />
            <div>
              <p className="font-display text-lg font-bold text-bone">SKYDECK</p>
              <p className="text-xs uppercase tracking-widest2 text-smoke">
                {restaurantInfo.tagline}
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
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
            href="https://www.instagram.com/skydeck__rrnagar?stkn=ZDNlZDc0MzIxNw=="
            className="flex items-center gap-2 text-sm text-smoke transition-colors hover:text-gold"
          >
            <Instagram size={16} />
            
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Skydeck, {restaurantInfo.location}. All rights reserved.</p>
          <p>{restaurantInfo.address}</p>
        </div>
      </div>
    </footer>
  );
}

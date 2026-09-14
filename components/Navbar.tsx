"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Food", href: "#food" },
  { label: "Events", href: "#events" },
  { label: "Reserve", href: "#reservation" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean
    ) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-void/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <button
          onClick={() => handleNav("#hero")}
          className="flex items-center gap-2.5"
          aria-label="Skydeck — home"
        >
          <Image
            src="/images/logo.jpg"
            alt="Skydeck logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-display text-lg font-bold tracking-wide text-bone">
            SKYDECK
          </span>
        </button>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className={`relative text-sm font-medium uppercase tracking-widest2 transition-colors duration-300 ${
                active === l.href ? "text-gold" : "text-smoke hover:text-bone"
              }`}
            >
              {l.label}
              {active === l.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-1.5 left-0 h-px w-full bg-gold"
                />
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={() => handleNav("#reservation")}
          className="hidden rounded-sm border border-gold/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest2 text-gold transition-all duration-300 hover:bg-gold hover:text-void md:inline-block"
        >
          Book a Table
        </button>

        <button
          className="text-bone md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden border-t border-line bg-void md:hidden"
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="py-3 text-left text-base font-medium uppercase tracking-wide text-bone"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("#reservation")}
              className="mt-2 rounded-sm bg-gold py-3 text-center text-sm font-semibold uppercase tracking-widest2 text-void"
            >
              Book a Table
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}

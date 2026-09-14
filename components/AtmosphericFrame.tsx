"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface AtmosphericFrameProps {
  src?: string;
  alt: string;
  cursorLabel?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Tint used only for the no-photo placeholder gradient. */
  tone?: "gold" | "violet" | "blue" | "ember";
}

const TONES: Record<string, string> = {
  gold: "from-[#302515] via-[#111112] to-[#050505]",
  violet: "from-[#252039] via-[#101014] to-[#050505]",
  blue: "from-[#12243A] via-[#0C1118] to-[#050505]",
  ember: "from-[#321C16] via-[#151011] to-[#050505]",
};

/**
 * Renders real photography when `src` is provided. Otherwise renders
 * a bespoke atmospheric placeholder (gradient + glow + grain) that
 * matches the Skydeck palette, so the layout looks intentional even
 * before every photo slot has real content. Swap in a `src` later —
 * no markup changes required.
 */
export default function AtmosphericFrame({
  src,
  alt,
  cursorLabel,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  tone = "gold",
}: AtmosphericFrameProps) {
  if (src) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        data-cursor-label={cursorLabel}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1400ms] ease-cinematic group-hover:scale-[1.06]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden grain bg-gradient-to-br ${TONES[tone]} ${className}`}
      data-cursor-label={cursorLabel}
      role="img"
      aria-label={alt}
    >
      <div className="absolute inset-0 bg-radial-gold" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neonViolet/15 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-neonBlue/15 blur-3xl" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute inset-0 flex items-end p-4"
      >
        <span className="text-[10px] uppercase tracking-widest2 text-smoke">
          {alt}
        </span>
      </motion.div>
    </div>
  );
}

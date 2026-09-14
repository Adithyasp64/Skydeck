"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Premium minimal custom cursor. Desktop / fine-pointer only —
 * effectively inert (and never attaches `has-custom-cursor`) on
 * touch devices, so mobile and tablet keep the native cursor.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);
  const [hoveringMedia, setHoveringMedia] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let ringX = 0, ringY = 0, targetX = 0, targetY = 0;
    let raf = 0;

    const move = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      setVisible(true);

      const el = e.target as HTMLElement;
      const clickable = el.closest("a, button, [role='button'], input, textarea, select");
      setHoveringLink(!!clickable);
      const mediaEl = el.closest<HTMLElement>("[data-cursor-label]");
      setHoveringMedia(mediaEl?.dataset.cursorLabel ?? null);
    };

    const leave = () => setVisible(false);

    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold will-change-transform"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border will-change-transform transition-[width,height,border-color,background-color] duration-200 ease-cinematic flex items-center justify-center"
        style={{
          width: hoveringMedia ? 64 : hoveringLink ? 44 : 28,
          height: hoveringMedia ? 64 : hoveringLink ? 44 : 28,
          borderColor: "rgba(214,162,83,0.55)",
          backgroundColor: hoveringLink ? "rgba(214,162,83,0.08)" : "transparent",
        }}
      >
        {hoveringMedia && (
          <span className="text-[10px] tracking-widest2 uppercase text-bone">
            {hoveringMedia}
          </span>
        )}
      </div>
    </div>
  );
}

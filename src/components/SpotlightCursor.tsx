"use client";

import { useEffect, useRef } from "react";

/** Soft warm light that trails the cursor (desktop only, decorative). */
export default function SpotlightCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const loop = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      el.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10 hidden h-[500px] w-[500px] rounded-full opacity-60 lg:block"
      style={{
        background:
          "radial-gradient(circle, rgba(255,122,77,0.07) 0%, rgba(255,122,77,0.03) 40%, transparent 70%)",
      }}
    />
  );
}

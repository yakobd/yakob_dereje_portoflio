"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

// Anything the dot should grow into a ring over.
const interactiveSelector =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="interactive"]';

const DOT = 8;
const RING = 36;

/**
 * Decorative cursor follower: a soft accent glow that trails the pointer and a
 * small dot that tracks it closely, growing into a ring over interactive
 * elements. The real cursor is untouched, and everything is pointer-events:
 * none. Only on fine-pointer hover devices, and off for reduced motion.
 * Pointer moves only update motion values (transforms), never React state.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  // Glow lags softly; the dot follows closely.
  const glowX = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.3 });

  const visible = useSpring(0, { stiffness: 300, damping: 30 });
  // 0 = small filled dot, 1 = ring.
  const hover = useSpring(0, { stiffness: 400, damping: 30 });
  const ringScale = useSpring(DOT / RING, { stiffness: 400, damping: 30 });
  const dotOpacity = useTransform(hover, (v) => 1 - v);

  // Only show on devices with a real hovering pointer, and never for reduced motion.
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let overInteractive = false;

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      visible.set(1);
    }

    function onOver(event: PointerEvent) {
      const target = event.target as Element | null;
      const isInteractive = !!target?.closest?.(interactiveSelector);
      if (isInteractive === overInteractive) return;
      overInteractive = isInteractive;
      hover.set(isInteractive ? 1 : 0);
      ringScale.set(isInteractive ? 1 : DOT / RING);
    }

    // relatedTarget is null when the pointer leaves the window.
    function onOut(event: PointerEvent) {
      if (!event.relatedTarget) visible.set(0);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, [enabled, x, y, visible, hover, ringScale]);

  if (!enabled) return null;

  // Positions are the pointer point; children are centred on it with negative
  // offsets (Framer Motion owns `transform`, so Tailwind translate classes
  // would be overwritten).
  return (
    <div aria-hidden="true" className="pointer-events-none">
      {/* Glow: radial gradient (cheaper than a CSS blur), under the nav. */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[45]"
        style={{ x: glowX, y: glowY, opacity: visible }}
      >
        <div
          className="absolute -left-[160px] -top-[160px] h-[320px] w-[320px] rounded-full opacity-[0.15] dark:opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--color-accent)) 0%, rgb(var(--color-accent) / 0.45) 35%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[80]"
        style={{ x: dotX, y: dotY, opacity: visible }}
      >
        {/* Filled 8px dot; fades out as the ring takes over. */}
        <motion.span
          className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-accent"
          style={{ opacity: dotOpacity }}
        />
        {/* 36px ring, scaling up from dot size over interactive elements. */}
        <motion.span
          className="absolute -left-[18px] -top-[18px] h-9 w-9 rounded-full border-[1.5px] border-accent bg-accent/10"
          style={{ scale: ringScale, opacity: hover }}
        />
      </motion.div>
    </div>
  );
}

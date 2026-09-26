"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  /** Maximum rotation in degrees at the card's edges. */
  maxTilt?: number;
  className?: string;
};

const spring = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * Gentle 3D tilt that follows the mouse. Mouse only (no tilt on touch), and
 * disabled entirely for reduced-motion users.
 */
export default function TiltCard({
  children,
  maxTilt = 5,
  className = "",
}: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);

  if (reduceMotion) return <div className={className}>{children}</div>;

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5; // -0.5 … 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 2 * maxTilt);
    rotateX.set(-y * 2 * maxTilt);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  // Pointer events go to a wrapper that never rotates; only the inner element
  // tilts. Otherwise a tilted corner swings out from under the cursor, fires
  // pointerleave, and the card flickers at its edges.
  return (
    <div
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <motion.div
        className="h-full"
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

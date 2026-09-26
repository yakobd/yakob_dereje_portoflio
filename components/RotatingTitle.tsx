"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type RotatingTitleProps = {
  titles: string[];
  /** Time each title stays visible, in ms. */
  interval?: number;
};

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.18em] text-accent-strong";

/**
 * Hero eyebrow that crossfades through the titles. Reduced-motion users get a
 * static line: all titles joined on wider screens, the first title on phones
 * (where the joined line would wrap).
 */
export default function RotatingTitle({
  titles,
  interval = 2800,
}: RotatingTitleProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || titles.length < 2) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % titles.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion, titles.length, interval]);

  if (reduceMotion) {
    return (
      <p className={eyebrow}>
        <span className="sm:hidden">{titles[0]}</span>
        <span className="hidden sm:inline">{titles.join(" · ")}</span>
      </p>
    );
  }

  return (
    <p className={eyebrow}>
      {/* Read once in full; the visual rotation isn't announced. */}
      <span className="sr-only">{titles.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={titles[index]}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {titles[index]}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}

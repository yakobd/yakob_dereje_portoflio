"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type RotatingTitleProps = {
  titles: string[];
  /** Time each title stays visible, in ms. */
  interval?: number;
};

// Larger than the section eyebrows (text-xs) for more presence in the hero,
// still well below the H1.
const eyebrow =
  "text-base font-semibold uppercase tracking-[0.18em] text-accent-strong sm:text-lg";

/**
 * Hero eyebrow that crossfades through the titles. Reduced-motion users see
 * the first title only: at this size the three joined (~750px) would wrap in
 * the hero column at every width. Screen readers get all three either way.
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
        <span className="sr-only">{titles.join(", ")}</span>
        <span aria-hidden="true">{titles[0]}</span>
      </p>
    );
  }

  return (
    // Below 375px "Forward Deployed Engineer" wraps to two lines; reserve that
    // height so the H1 doesn't jump each time it rotates in and out.
    <p className={`${eyebrow} max-[374px]:min-h-[3rem]`}>
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

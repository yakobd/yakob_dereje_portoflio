"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Stat } from "@/lib/data/home";

/** "15+" -> { n: 15, suffix: "+" }; non-numeric values return null. */
function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return match ? { n: Number(match[1]), suffix: match[2] } : null;
}

function StatValue({ value, start }: { value: string; start: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const parsed = parseStat(value);
    const node = ref.current;
    if (!start || !parsed || reduceMotion || !node) return;
    const controls = animate(0, parsed.n, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${parsed.suffix}`;
      },
    });
    return () => controls.stop();
  }, [start, value, reduceMotion]);

  return (
    <>
      {/* Screen readers get the final value, not every intermediate number. */}
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}

/** Hero stat row: fades in and counts numeric stats up once, when scrolled into view. */
export default function HeroStats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <dl
      ref={ref}
      className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-3"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="flex flex-col"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
        >
          <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
          <dd className="order-first font-heading text-3xl font-normal tracking-tight">
            <StatValue value={stat.value} start={inView} />
          </dd>
        </motion.div>
      ))}
    </dl>
  );
}

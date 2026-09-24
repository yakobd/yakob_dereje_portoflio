"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
};

// Trigger once any part of the element is on screen (amount "some"), nudged
// up slightly. A percentage threshold can never be met by elements taller
// than the viewport, which would leave long grids invisible.
const viewport = {
  once: true,
  amount: "some",
  margin: "0px 0px -64px 0px",
} as const;

type Tag = "div" | "ul" | "ol" | "li";

type RevealProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
};

/** Reduced-motion users get opacity fades only, with no movement. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades a single block up into place as it scrolls into view. */
export function Reveal({ children, as = "div", className }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: fadeUp.hidden,
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
      }}
    >
      {children}
    </Component>
  );
}

/** Grid/list container whose RevealItem children fade up in sequence. */
export function RevealGroup({ children, as = "div", className }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, as = "div", className }: RevealProps) {
  const Component = motion[as];
  return (
    <Component className={className} variants={fadeUp}>
      {children}
    </Component>
  );
}

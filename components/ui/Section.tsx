import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** White background instead of the default ivory, for alternating sections. */
  surface?: boolean;
  className?: string;
};

export default function Section({
  children,
  id,
  surface = false,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-6 py-[90px] md:px-16 ${surface ? "bg-surface" : "bg-background"} ${className}`.trim()}
    >
      {children}
    </section>
  );
}

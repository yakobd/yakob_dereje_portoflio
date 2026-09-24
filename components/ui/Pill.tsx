import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  className?: string;
};

export default function Pill({ children, className = "" }: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-chip px-3 py-1 text-xs font-medium text-muted ${className}`.trim()}
    >
      {children}
    </span>
  );
}

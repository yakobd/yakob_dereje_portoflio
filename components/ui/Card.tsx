import Link from "next/link";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  href?: string;
  className?: string;
};

const base =
  "block rounded-2xl border border-border bg-surface transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_12px_30px_-12px_rgba(34,31,28,0.18)]";

export default function Card({ children, href, className = "" }: CardProps) {
  const classes = `${base} ${className}`.trim();

  if (href) {
    return (
      <Link
        href={href}
        className={`${classes} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
      >
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}

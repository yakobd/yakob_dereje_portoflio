"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = { label: string; href: string };

// Home-page sections that light up a nav link; More Projects counts as "Work".
const sectionToHref: Record<string, string> = {
  about: "/#about",
  work: "/#work",
  "more-work": "/#work",
  skills: "/#skills",
  credentials: "/#credentials",
};

/** Desktop nav links; highlights the one whose section is in view (home page only). */
export default function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    setActive(null);
    if (pathname !== "/") return;

    const sections = Object.keys(sectionToHref)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // A thin band across the middle of the viewport: the section crossing it
    // is the one being read.
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = sections.find((section) => visible.has(section.id));
        setActive(current ? sectionToHref[current.id] : null);
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <ul className="hidden items-center gap-8 md:flex">
      {links.map((link) => {
        const isActive = active === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive ? "location" : undefined}
              className={`relative text-sm font-medium transition-colors hover:text-foreground ${
                isActive ? "text-foreground" : "text-muted"
              }`}
            >
              {link.label}
              <span
                aria-hidden="true"
                className={`absolute -bottom-1.5 left-0 h-0.5 w-full origin-left rounded-full bg-accent transition-transform duration-300 ease-out motion-reduce:transition-none ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

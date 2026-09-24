"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type NavLink = { label: string; href: string };

export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    // Lock body scroll while the menu is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    // Focus is trapped between the toggle button and the panel links.
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab") return;

      const links = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a") ?? [],
      );
      const focusables = toggleRef.current
        ? [toggleRef.current, ...links]
        : links;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const index = focusables.indexOf(document.activeElement as HTMLElement);

      if (event.shiftKey && (index === 0 || index === -1)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (index === focusables.length - 1 || index === -1)) {
        event.preventDefault();
        first.focus();
      }
    }

    // Close if the viewport grows past the mobile breakpoint.
    const desktop = window.matchMedia("(min-width: 768px)");
    function onBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) close();
    }

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-chip focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <>
          {/* Absolute, not fixed: the header's backdrop-filter makes it the
              containing block for fixed descendants. */}
          <div
            aria-hidden="true"
            onClick={() => close()}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] bg-foreground/20"
          />
          <div
            id="mobile-menu"
            ref={panelRef}
            className="absolute inset-x-0 top-full border-b border-border bg-background shadow-[0_12px_30px_-12px_rgba(34,31,28,0.18)]"
          >
            <ul className="divide-y divide-border">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => close()}
                    className="block px-6 py-4 text-base font-medium text-foreground transition-colors hover:bg-chip focus-visible:bg-chip focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

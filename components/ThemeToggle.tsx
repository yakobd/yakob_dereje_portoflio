"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { themeStorageKey } from "@/lib/theme";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Stored choice if there is one, otherwise the system preference. */
function prefersDark() {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(themeStorageKey);
  } catch {}
  return stored
    ? stored === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function setTheme(dark: boolean, persist: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
  if (!persist) return;
  try {
    localStorage.setItem(themeStorageKey, dark ? "dark" : "light");
  } catch {
    // Storage unavailable (private mode etc.): the toggle still works for this visit.
  }
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

type ThemeToggleProps = {
  /** "icon": round icon button (desktop nav). "row": full-width row (mobile menu). */
  variant?: "icon" | "row";
  className?: string;
};

export default function ThemeToggle({
  variant = "icon",
  className = "",
}: ThemeToggleProps) {
  const [dark, setDark] = useState<boolean | null>(null);

  // Runs before paint. Keeps the <html> class in line with the visitor's
  // theme: the inline script normally handles first load, but pages Next
  // renders entirely on the client (a 404 under /work/) skip that script and
  // React then rewrites <html class>, so re-apply the theme whenever it drifts.
  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const want = prefersDark();
      if (root.classList.contains("dark") !== want) setTheme(want, false);
      setDark(want);
    };
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    // Follow system changes until the visitor picks a theme themselves.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);

  function toggle() {
    setTheme(!document.documentElement.classList.contains("dark"), true);
  }

  // Icons switch via the .dark class, so the server HTML is right before hydration.
  const icons = (
    <span className="relative inline-flex h-[18px] w-[18px]">
      <span className="dark:hidden">
        <MoonIcon />
      </span>
      <span className="hidden dark:inline">
        <SunIcon />
      </span>
    </span>
  );

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-pressed={dark ?? undefined}
        className={`flex w-full items-center justify-between px-6 py-4 text-base font-medium text-foreground transition-colors hover:bg-chip focus-visible:bg-chip focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${className}`.trim()}
      >
        Dark mode
        <span className="flex items-center gap-2 text-sm text-muted">
          {dark === null ? "" : dark ? "On" : "Off"}
          {icons}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Dark mode"
      aria-pressed={dark ?? undefined}
      title="Toggle dark mode"
      className={`flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-chip hover:text-foreground ${className}`.trim()}
    >
      {icons}
    </button>
  );
}

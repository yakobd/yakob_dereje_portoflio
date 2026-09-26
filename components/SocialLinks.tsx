"use client";

// react-icons creates React context, so this has to be a client component.
import type { IconType } from "react-icons";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaUpwork,
  FaXTwitter,
} from "react-icons/fa6";
import { SiSubstack } from "react-icons/si";
import type { SocialLink } from "@/lib/data/home";

const icons: Record<SocialLink["icon"], IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  telegram: FaTelegram,
  instagram: FaInstagram,
  upwork: FaUpwork,
  substack: SiSubstack,
};

/** Row of round icon-only links with a tooltip naming each platform. */
export default function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {links.map((link) => {
        const Icon = icons[link.icon];
        return (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.description} (opens in a new tab)`}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition duration-200 ease-out hover:border-border-strong hover:text-foreground hover:shadow-[0_8px_20px_-10px_rgb(0_0_0/0.35)] focus-visible:text-foreground motion-safe:hover:-translate-y-0.5 sm:h-11 sm:w-11"
            >
              <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
              {/* Tooltip on hover and keyboard focus; the aria-label covers screen readers. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {link.label}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

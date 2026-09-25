import Link from "next/link";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";

// Prefixed with "/" so the anchors also work from case study pages.
const links = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Credentials", href: "/#credentials" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="flex h-16 items-center justify-between px-6 md:px-16">
        <Link
          href="/"
          className="font-heading text-xl font-medium tracking-tight text-foreground"
        >
          Yakob Dereje
        </Link>

        <div className="flex items-center gap-3 md:gap-8">
          <NavLinks links={links} />
          <ThemeToggle className="-mx-2 hidden md:flex" />
          <Link
            href="/#contact"
            className="rounded-full bg-accent-strong px-5 py-2 text-sm font-medium text-background transition hover:brightness-95"
          >
            Contact
          </Link>
          <MobileMenu links={links} />
        </div>
      </nav>
    </header>
  );
}

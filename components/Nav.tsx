import Link from "next/link";

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

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#contact"
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-accent/90"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

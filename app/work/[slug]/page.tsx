import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import { caseStudies, getCaseStudy } from "@/lib/data/case-studies";
import { siteName } from "@/lib/site";

type CaseStudyPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

function truncate(text: string, maxLength = 155) {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:—-]+$/, "")}…`;
}

export function generateMetadata({ params }: CaseStudyPageProps): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return { title: "Page not found" };
  const description = truncate(study.problem);
  const url = `/work/${study.slug}`;
  return {
    title: study.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName,
      title: study.title,
      description,
      url,
    },
    twitter: { card: "summary", title: study.title, description },
  };
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-normal tracking-tight md:text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4 leading-relaxed text-muted">
          <span
            aria-hidden="true"
            className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  return (
    <>
      <div className="px-6 pb-8 pt-8 md:px-16">
        <Link
          href="/"
          className="text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          ← Back to portfolio
        </Link>
      </div>

      {/* Hero */}
      <header
        className="px-6 py-16 text-surface md:px-16 md:py-24"
        style={{
          backgroundColor: study.heroColor,
          // 15% foreground tint keeps white body text at AA on every hero color.
          backgroundImage:
            "linear-gradient(rgba(34, 31, 28, 0.15), rgba(34, 31, 28, 0.15))",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-surface/90">
          {study.heroTag}
        </p>
        <h1 className="mt-4 max-w-4xl text-balance text-4xl font-normal leading-[1.08] tracking-tight md:text-6xl">
          {study.title}
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-surface/90">
          {study.problem}
        </p>
        <a
          href={study.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
        >
          {study.linkLabel}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7M8 7h9v9" />
          </svg>
        </a>
      </header>

      {/* Body */}
      <div className="space-y-16 px-6 py-[90px] md:px-16">
        <div className="max-w-3xl space-y-16">
          <Block title="My Role">
            {Array.isArray(study.role) ? (
              <BulletList items={study.role} />
            ) : (
              <p className="leading-relaxed text-muted">{study.role}</p>
            )}
          </Block>

          <Block title="Tech Stack">
            <ul className="flex flex-wrap gap-2">
              {study.fullStack.map((tech) => (
                <li key={tech}>
                  <Pill>{tech}</Pill>
                </li>
              ))}
            </ul>
          </Block>

          {study.challenges && (
            <Block title="Key Challenges">
              <div className="space-y-8">
                {study.challenges.map((challenge) => (
                  <div
                    key={challenge.title}
                    className="border-l-2 border-accent pl-6"
                  >
                    <h3 className="text-lg font-medium">{challenge.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">
                      {challenge.description}
                    </p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {study.features && (
            <Block title="Features">
              <BulletList items={study.features} />
            </Block>
          )}

          {study.outcomes && (
            <Block title="Outcome & Impact">
              <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
                <BulletList items={study.outcomes} />
              </div>
            </Block>
          )}

          {study.approach && (
            <Block title="Notable Approach">
              <p className="leading-relaxed text-muted">{study.approach}</p>
            </Block>
          )}
        </div>

        <div className="border-t border-border pt-16 text-center">
          <Button href="/#work" variant="secondary">
            ← See more work
          </Button>
        </div>
      </div>
    </>
  );
}

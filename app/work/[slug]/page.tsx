import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ProjectDetail from "@/components/ProjectDetail";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import { caseStudies, getCaseStudy } from "@/lib/data/case-studies";
import { getMoreProject, moreProjects } from "@/lib/data/more-projects";
import { siteName } from "@/lib/site";

type CaseStudyPageProps = {
  params: { slug: string };
};

// Only the slugs below exist; anything else gets the server-rendered 404
// (with dynamic params, Next 14 sent a client-rendered shell for notFound()).
export const dynamicParams = false;

// Full case studies and the lighter "More Projects" pages share /work/<slug>.
export function generateStaticParams() {
  const slugs = [
    ...caseStudies.map((study) => study.slug),
    ...moreProjects.map((project) => project.slug),
  ];
  const duplicate = slugs.find((slug, i) => slugs.indexOf(slug) !== i);
  if (duplicate) throw new Error(`Duplicate /work slug: "${duplicate}"`);
  return slugs.map((slug) => ({ slug }));
}

function truncate(text: string, maxLength = 155) {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:—-]+$/, "")}…`;
}

export function generateMetadata({ params }: CaseStudyPageProps): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) {
    const match = getMoreProject(params.slug);
    if (!match) return { title: "Page not found" };
    const { project } = match;
    const url = `/work/${project.slug}`;
    return {
      title: project.title,
      description: project.summary,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        siteName,
        title: project.title,
        description: project.summary,
        url,
        images: project.coverImageUrl ? [project.coverImageUrl] : undefined,
      },
      twitter: {
        card: "summary",
        title: project.title,
        description: project.summary,
      },
    };
  }
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
      images: study.coverImageUrl ? [study.coverImageUrl] : undefined,
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
  if (!study) {
    const match = getMoreProject(params.slug);
    if (!match) notFound();
    return <ProjectDetail project={match.project} index={match.index} />;
  }

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
        className="px-6 py-16 text-white md:px-16 md:py-24"
        style={{
          backgroundColor: study.heroColor,
          // 15% foreground tint keeps white body text at AA on every hero color.
          backgroundImage:
            "linear-gradient(rgba(34, 31, 28, 0.15), rgba(34, 31, 28, 0.15))",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
          {study.heroTag}
        </p>
        <h1 className="mt-4 max-w-4xl text-balance text-4xl font-normal leading-[1.08] tracking-tight md:text-6xl">
          {study.title}
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/90">
          {study.problem}
        </p>
        <a
          href={study.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition duration-200 ease-out motion-safe:hover:scale-[1.03] hover:bg-white/90 hover:shadow-[0_10px_24px_-12px_rgb(0_0_0/0.5)] motion-safe:active:scale-95 active:duration-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
        {study.coverImageUrl && (
          <div className="relative mt-12 aspect-[16/10] max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]">
            <Image
              src={study.coverImageUrl}
              alt={`Screenshot of ${study.title}`}
              fill
              priority
              sizes="(min-width: 1280px) 1024px, 100vw"
              className="object-cover object-top"
            />
          </div>
        )}
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

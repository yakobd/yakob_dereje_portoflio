import Image from "next/image";
import Link from "next/link";
import { bannerFor } from "@/lib/banner";
import type { MoreProject } from "@/lib/data/more-projects";
import ProjectBanner from "./ProjectBanner";
import ScreenshotGallery from "./ScreenshotGallery";
import { Eyebrow } from "./SectionHeader";
import Button from "./ui/Button";
import Pill from "./ui/Pill";

function ExternalIcon() {
  return (
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
  );
}

type ProjectDetailProps = {
  project: MoreProject;
  /** Position in the More Projects grid, so the banner matches the home card. */
  index: number;
};

/** Lighter detail page for "More Projects" entries (no full case study). */
export default function ProjectDetail({ project, index }: ProjectDetailProps) {
  const screenshots = project.screenshots ?? [];

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

      <div className="px-6 md:px-16">
        <div className="relative h-[200px] overflow-hidden rounded-2xl border border-border md:h-[300px]">
          {project.coverImageUrl ? (
            <Image
              src={project.coverImageUrl}
              alt={`Screenshot of ${project.title}`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
          ) : (
            <ProjectBanner
              id={project.slug}
              {...bannerFor(project, index)}
              fill
              initialsClassName="text-6xl md:text-7xl"
            />
          )}
        </div>
      </div>

      <div className="px-6 pb-[90px] pt-12 md:px-16 md:pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Project</Eyebrow>
          <h1 className="mt-4 text-balance text-4xl font-normal leading-[1.08] tracking-tight md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {project.summary}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Pill>{tech}</Pill>
              </li>
            ))}
          </ul>
          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live site <ExternalIcon />
                </Button>
              )}
              {project.repoUrl && (
                <Button
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                >
                  View repo <ExternalIcon />
                </Button>
              )}
            </div>
          )}
        </div>

        <section className="mt-16 max-w-5xl">
          <h2 className="text-2xl font-normal tracking-tight md:text-3xl">
            Screenshots
          </h2>
          {screenshots.length > 0 ? (
            <div className="mt-6">
              <ScreenshotGallery title={project.title} images={screenshots} />
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-border-strong px-6 py-12 text-center">
              <p className="text-muted">Screenshots coming soon.</p>
            </div>
          )}
        </section>

        <div className="mt-16 border-t border-border pt-16 text-center">
          <Button href="/#more-work" variant="secondary">
            ← See more work
          </Button>
        </div>
      </div>
    </>
  );
}

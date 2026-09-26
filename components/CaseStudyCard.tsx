import Image from "next/image";
import type { CaseStudy } from "@/lib/data/case-studies";
import ProjectBanner from "./ProjectBanner";
import Card from "./ui/Card";
import Pill from "./ui/Pill";

type CaseStudyCardProps = {
  study: CaseStudy;
  /** Full-width card with the cover beside the content (40/60) on desktop. */
  lead?: boolean;
  className?: string;
};

export default function CaseStudyCard({
  study,
  lead = false,
  className = "",
}: CaseStudyCardProps) {
  return (
    <Card
      href={`/work/${study.slug}`}
      className={`group h-full overflow-hidden ${lead ? "md:grid md:grid-cols-[2fr_3fr]" : ""} ${className}`.trim()}
    >
      <div
        className={`relative flex items-center justify-center ${
          lead
            ? `${study.coverImageUrl ? "h-[160px]" : "h-[140px]"} md:h-auto md:min-h-[320px]`
            : study.coverImageUrl
              ? "h-[160px] md:h-[210px]" // room for a real screenshot
              : "h-[140px]"
        }`}
        style={{ backgroundColor: study.heroColor }}
      >
        {study.coverImageUrl ? (
          // Decorative: the card's title already names the project.
          <Image
            src={study.coverImageUrl}
            alt=""
            fill
            sizes={
              lead
                ? "(min-width: 768px) 40vw, 100vw"
                : "(min-width: 768px) 50vw, 100vw"
            }
            className="object-cover object-top"
          />
        ) : (
          <ProjectBanner
            id={study.slug}
            color={study.heroColor}
            initials={study.initials}
            pattern={study.pattern}
            fill
            initialsClassName={`text-4xl ${lead ? "md:text-7xl" : ""}`}
          />
        )}
        <span className="absolute left-4 top-4 z-10 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-foreground">
          {study.tag}
        </span>
      </div>
      <div
        className={`flex flex-col gap-4 p-6 ${lead ? "md:justify-center md:gap-5 md:p-10 lg:p-12" : ""}`}
      >
        <h3
          className={`text-xl font-medium tracking-tight ${lead ? "md:text-3xl md:leading-tight" : ""}`}
        >
          {study.title}
        </h3>
        <p
          className={`text-muted ${lead ? "md:text-lg md:leading-relaxed" : ""}`}
        >
          {study.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {study.stack.map((tech) => (
            <Pill key={tech}>{tech}</Pill>
          ))}
        </div>
        <span className="text-sm font-medium text-accent-strong">
          View case study{" "}
          <span
            aria-hidden="true"
            className="inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Card>
  );
}

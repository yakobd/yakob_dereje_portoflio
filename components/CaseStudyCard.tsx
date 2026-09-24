import type { CaseStudy } from "@/lib/data/case-studies";
import Card from "./ui/Card";
import Pill from "./ui/Pill";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Card href={`/work/${study.slug}`} className="group h-full overflow-hidden">
      <div
        className="relative flex h-[140px] items-center justify-center"
        style={{ backgroundColor: study.coverColor }}
      >
        <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-foreground">
          {study.tag}
        </span>
        <span className="font-heading text-4xl font-medium tracking-tight text-surface">
          {study.initials}
        </span>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <h3 className="text-xl font-medium tracking-tight">{study.title}</h3>
        <p className="text-muted">{study.summary}</p>
        <div className="flex flex-wrap gap-2">
          {study.stack.map((tech) => (
            <Pill key={tech}>{tech}</Pill>
          ))}
        </div>
        <span className="text-sm font-medium text-accent">
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

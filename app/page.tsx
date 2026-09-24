import CaseStudyCard from "@/components/CaseStudyCard";
import SectionHeader, { Eyebrow } from "@/components/SectionHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import Section from "@/components/ui/Section";
import { caseStudies } from "@/lib/data/case-studies";
import { credentials } from "@/lib/data/credentials";
import {
  about,
  contact,
  hero,
  processSteps,
  testimonials,
} from "@/lib/data/home";
import { moreProjects } from "@/lib/data/more-projects";
import { skillGroups } from "@/lib/data/skills";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <Section id="top">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {hero.availability}
        </span>
        <div className="mt-8">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </div>
        <h1 className="mt-4 max-w-4xl text-balance text-4xl font-normal leading-[1.08] tracking-tight sm:text-5xl md:text-[4rem]">
          {hero.heading}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {hero.subhead}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="#work">View my work</Button>
          <Button href="#contact" variant="secondary">
            Get in touch
          </Button>
        </div>
        <dl className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
              <dd className="font-heading text-3xl font-normal tracking-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* About */}
      <Section id="about" surface>
        <div className="grid gap-10 md:grid-cols-[120px_1fr] md:gap-16">
          <div
            aria-hidden="true"
            className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-accent font-heading text-4xl font-medium text-surface"
          >
            {about.initials}
          </div>
          <div className="max-w-3xl">
            <SectionHeader eyebrow="About" title={about.heading} />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* How I work */}
      <Section>
        <SectionHeader eyebrow="How I Work" title="From scope to production." />
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <li key={step.number}>
              <span className="font-heading text-5xl font-light text-accent">
                {step.number}
              </span>
              <h3 className="mt-4 text-xl font-medium">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Skills */}
      <Section id="skills" surface>
        <SectionHeader eyebrow="Skills" title="What I work with." />
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-medium">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Pill>{skill}</Pill>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured work */}
      <Section id="work">
        <SectionHeader
          eyebrow="Featured Work"
          title="Systems I've built end to end."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.slug}
              study={study}
              lead={index === 0}
              className={index === 0 ? "md:col-span-2" : ""}
            />
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section surface>
        <SectionHeader eyebrow="What Clients Say" title="Testimonials." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex h-full flex-col p-6">
              <blockquote className="flex-1 font-heading text-lg italic leading-relaxed text-foreground">
                “{testimonial.quote}”
              </blockquote>
              <div className="mt-6">
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-subtle">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* More projects */}
      <Section>
        <SectionHeader
          eyebrow="More Projects"
          title="Additional shipped work."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((project) => (
            <Card key={project.title} className="flex h-full flex-col p-6">
              <h3 className="text-lg font-medium tracking-tight">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {project.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Pill key={tech}>{tech}</Pill>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Credentials */}
      <Section id="credentials" surface>
        <SectionHeader
          eyebrow="Credentials"
          title="Education & certifications."
        />
        <ul className="mt-12 border-t border-border">
          {credentials.map((credential) => (
            <li
              key={credential.title}
              className="flex flex-col gap-2 border-b border-border px-2 py-6 transition-colors hover:bg-background sm:flex-row sm:items-start sm:justify-between sm:gap-8 md:px-4"
            >
              <div>
                <p className="text-lg font-medium">{credential.title}</p>
                <p className="mt-1 text-sm text-muted">{credential.issuer}</p>
              </div>
              {credential.date && (
                <p className="shrink-0 text-sm text-subtle">
                  {credential.date}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {/* Contact */}
      <Section id="contact" className="text-center">
        <SectionHeader
          eyebrow="Contact"
          title={contact.heading}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted">
          {contact.details}
        </p>
        <div className="mt-10">
          <Button
            href={`mailto:${contact.email}`}
            variant="accent"
            size="lg"
            className="max-w-full break-all"
          >
            {contact.email}
          </Button>
        </div>
        <a
          href={contact.phone.href}
          className="mt-5 inline-block text-muted transition-colors hover:text-foreground"
        >
          {contact.phone.display}
        </a>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {contact.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}

import CaseStudyCard from "@/components/CaseStudyCard";
import CertificateGallery from "@/components/CertificateGallery";
import ContactForm from "@/components/ContactForm";
import ProjectBanner from "@/components/ProjectBanner";
import ProfilePhoto from "@/components/ProfilePhoto";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
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
import { bannerFor } from "@/lib/banner";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section id="top" className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-pattern absolute inset-0" />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center lg:gap-16 xl:gap-20">
          {/* Photo first on mobile, right column on desktop */}
          <div className="w-44 sm:w-52 lg:order-last lg:w-full lg:max-w-[460px] lg:justify-self-end">
            <ProfilePhoto
              variant="hero"
              src={about.photo}
              alt="Yakob Dereje"
              initials={about.initials}
            />
          </div>
          <div>
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
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-normal leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
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
                <div key={stat.label} className="flex flex-col">
                  <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
                  <dd className="order-first font-heading text-3xl font-normal tracking-tight">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* About */}
      <Section id="about" surface>
        <Reveal className="grid gap-10 md:grid-cols-[120px_1fr] md:gap-16">
          <ProfilePhoto
            src={about.photo}
            alt="Portrait of Yakob Dereje"
            initials={about.initials}
          />
          <div className="max-w-3xl">
            <SectionHeader eyebrow="About" title={about.heading} />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* How I work */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="How I Work"
            title="From scope to production."
          />
        </Reveal>
        <RevealGroup
          as="ol"
          className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {processSteps.map((step) => (
            <RevealItem as="li" key={step.number}>
              <span className="font-heading text-5xl font-light text-accent">
                {step.number}
              </span>
              <h3 className="mt-4 text-xl font-medium">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">
                {step.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Skills */}
      <Section id="skills" surface>
        <Reveal>
          <SectionHeader eyebrow="Skills" title="What I work with." />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <RevealItem key={group.title}>
              <h3 className="text-lg font-medium">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Pill>{skill}</Pill>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Featured work */}
      <Section id="work">
        <Reveal>
          <SectionHeader
            eyebrow="Featured Work"
            title="Systems I've built end to end."
          />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2">
          {caseStudies.map((study, index) => (
            <RevealItem
              key={study.slug}
              className={index === 0 ? "md:col-span-2" : undefined}
            >
              <CaseStudyCard study={study} lead={index === 0} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Testimonials */}
      <Section surface>
        <Reveal>
          <SectionHeader eyebrow="What Clients Say" title="Testimonials." />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <RevealItem
              key={index}
              // Lead testimonial: two columns wide, two rows tall on desktop.
              className={index === 0 ? "lg:col-span-2 lg:row-span-2" : undefined}
            >
              <Card className="h-full p-6 md:p-8">
                <figure className="flex h-full flex-col">
                  <span
                    aria-hidden="true"
                    className="font-heading text-5xl leading-[0.6] text-accent"
                  >
                    “
                  </span>
                  <blockquote
                    className={`mt-4 flex-1 leading-relaxed text-foreground ${
                      index === 0 ? "text-base md:text-lg md:leading-[1.75] lg:text-xl lg:leading-[1.7]" : "text-base"
                    }`}
                  >
                    <p>{testimonial.quote}</p>
                  </blockquote>
                  <figcaption className="mt-6 border-t border-border pt-4">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-subtle">{testimonial.role}</p>
                  </figcaption>
                </figure>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* More projects */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="More Projects"
            title="Additional shipped work."
          />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((project, index) => (
            <RevealItem key={project.title}>
              <Card className="flex h-full flex-col overflow-hidden">
                <ProjectBanner
                  id={`more-${index}`}
                  {...bannerFor(project.title, index)}
                  className="h-[112px] shrink-0"
                  initialsClassName="text-3xl"
                />
                <div className="flex flex-1 flex-col p-6">
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
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Credentials */}
      <Section id="credentials" surface>
        <Reveal>
          <SectionHeader
            eyebrow="Credentials"
            title="Education & certifications."
          />
        </Reveal>
        <RevealGroup as="ul" className="mt-12 border-t border-border">
          {credentials.map((credential) => (
            <RevealItem
              as="li"
              key={credential.title}
              className="flex flex-col gap-2 border-b border-border px-2 py-6 transition-colors hover:bg-background sm:flex-row sm:items-start sm:justify-between sm:gap-8 md:px-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                {credential.imageUrl && (
                  <CertificateGallery
                    title={credential.title}
                    images={[credential.imageUrl, credential.imageUrl2].filter(
                      (src): src is string => Boolean(src),
                    )}
                  />
                )}
                <div>
                  <p className="text-lg font-medium">{credential.title}</p>
                  <p className="mt-1 text-sm text-muted">
                    {credential.issuer}
                  </p>
                </div>
              </div>
              {credential.date && (
                <p className="shrink-0 text-sm text-subtle">
                  {credential.date}
                </p>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Contact */}
      <Section id="contact" className="text-center">
        <Reveal>
          <SectionHeader
            eyebrow="Contact"
            title={contact.heading}
            align="center"
            className="mx-auto max-w-3xl"
          />
        </Reveal>
        <Reveal>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted">
            {contact.details}
          </p>
          <div className="mx-auto mt-10 max-w-xl">
            <ContactForm />
            <p className="mt-4 text-sm text-muted">{contact.responseTime}</p>
          </div>
          <p className="mt-12 text-sm font-medium text-muted">
            Prefer to reach me directly?
          </p>
          <div className="mt-4">
            <Button
              href={`mailto:${contact.email}`}
              variant="secondary"
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
                  className="text-sm font-medium text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent-strong hover:decoration-accent-strong"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}

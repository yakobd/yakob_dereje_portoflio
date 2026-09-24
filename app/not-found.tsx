import type { Metadata } from "next";
import { Eyebrow } from "@/components/SectionHeader";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 text-balance text-4xl font-normal tracking-tight md:text-6xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          The link may be broken, or the page may have moved. Everything I&apos;ve
          built is still on the home page.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/#work" variant="secondary">
            See my work
          </Button>
        </div>
      </Section>
    </>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import type { Credential } from "@/lib/data/credentials";
import Lightbox from "./Lightbox";
import { RevealGroup, RevealItem } from "./Reveal";

type CertificateImageProps = {
  src: string;
  alt: string;
  /** CSS aspect ratio of the frame, matching the certificate's shape. */
  aspect: string;
  sizes: string;
  onOpen: () => void;
};

/**
 * Certificate shown whole (object-contain on a neutral frame, never cropped).
 * The frame is a button, so the "Click to enlarge" hint is reachable and
 * usable from the keyboard too.
 */
function CertificateImage({
  src,
  alt,
  aspect,
  sizes,
  onOpen,
}: CertificateImageProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Enlarge: ${alt}`}
      className="group relative block w-full overflow-hidden rounded-xl border border-border bg-chip transition duration-200 hover:border-border-strong focus-visible:outline-offset-2"
      style={{ aspectRatio: aspect }}
    >
      <span className="absolute inset-2 sm:inset-3">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.015]"
        />
      </span>
      <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-border bg-surface/95 px-2.5 py-1 text-[11px] font-medium text-foreground shadow-sm">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
        Click to enlarge
      </span>
    </button>
  );
}

function Meta({
  credential,
  featured = false,
}: {
  credential: Credential;
  featured?: boolean;
}) {
  return (
    <>
      <h3
        className={
          featured
            ? "text-balance text-2xl font-normal leading-tight tracking-tight md:text-3xl"
            : "text-lg font-medium leading-snug tracking-tight"
        }
      >
        {credential.title}
      </h3>
      <p className="mt-2 text-sm text-muted">{credential.issuer}</p>
      {credential.date && (
        <p className="mt-1 text-sm text-subtle">{credential.date}</p>
      )}
      <p
        className={`mt-4 leading-relaxed text-muted ${featured ? "md:text-lg" : "text-sm"}`}
      >
        {credential.description}
      </p>
    </>
  );
}

type Opener = (credential: Credential, index: number) => void;

/**
 * Full-width card: certificate image(s) on the left, text on the right; stacks
 * on smaller screens. With a second image (a landscape certificate plus a
 * portrait page), the image column is ~55% and the two images sit side by side
 * at a 2:1 width split so they come out the same height. With one image, the
 * image column is ~45%.
 */
function FeaturedCard({
  credential,
  alts,
  onOpen,
}: {
  credential: Credential;
  alts: string[];
  onOpen: Opener;
}) {
  const two = Boolean(credential.imageUrl2);
  return (
    <article
      className={`grid gap-8 rounded-2xl border border-border bg-background p-5 md:p-8 lg:items-center lg:gap-10 ${
        two ? "lg:grid-cols-[11fr_9fr]" : "lg:grid-cols-[9fr_11fr]"
      }`}
    >
      <div
        className={
          two ? "grid grid-cols-1 items-start gap-3 sm:grid-cols-[2fr_1fr]" : ""
        }
      >
        {credential.imageUrl && (
          <CertificateImage
            src={credential.imageUrl}
            alt={alts[0]}
            aspect={two ? "1.414" : "1.469"}
            sizes={
              two
                ? "(min-width: 1024px) 480px, (min-width: 640px) 62vw, 100vw"
                : "(min-width: 1024px) 560px, 100vw"
            }
            onOpen={() => onOpen(credential, 0)}
          />
        )}
        {/* On phones the portrait page stacks below, narrower and centred. */}
        {credential.imageUrl2 && (
          <div className="mx-auto w-3/5 sm:mx-0 sm:w-full">
            <CertificateImage
              src={credential.imageUrl2}
              alt={alts[1]}
              aspect="0.707"
              sizes="(min-width: 1024px) 240px, (min-width: 640px) 31vw, 60vw"
              onOpen={() => onOpen(credential, 1)}
            />
          </div>
        )}
      </div>
      <div>
        <Meta credential={credential} featured />
      </div>
    </article>
  );
}

/**
 * Education & certificates: featured credentials as full-width cards, the rest
 * in a 2-column grid. Every image opens the shared lightbox at full size.
 */
export default function CertificateShowcase({
  credentials,
}: {
  credentials: Credential[];
}) {
  const [lightbox, setLightbox] = useState<{
    credential: Credential;
    index: number;
  } | null>(null);

  const featured = credentials.filter((c) => c.featured);
  const rest = credentials.filter((c) => !c.featured);
  const images = (c: Credential) =>
    [c.imageUrl, c.imageUrl2].filter((src): src is string => Boolean(src));
  const alts = (c: Credential) => [
    c.imageAlt ?? c.title,
    c.imageAlt2 ?? c.title,
  ];
  const open: Opener = (credential, index) =>
    setLightbox({ credential, index });

  return (
    <>
      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2">
        {featured.map((credential) => (
          <RevealItem key={credential.title} className="md:col-span-2">
            <FeaturedCard
              credential={credential}
              alts={alts(credential)}
              onOpen={open}
            />
          </RevealItem>
        ))}

        {rest.map((credential) => (
          <RevealItem key={credential.title}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-background p-5 md:p-6">
              {credential.imageUrl && (
                <CertificateImage
                  src={credential.imageUrl}
                  alt={alts(credential)[0]}
                  aspect="4 / 3"
                  sizes="(min-width: 1440px) 600px, (min-width: 768px) 45vw, 100vw"
                  onOpen={() => open(credential, 0)}
                />
              )}
              <div className="mt-5">
                <Meta credential={credential} />
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      <Lightbox
        title={lightbox?.credential.title ?? ""}
        images={lightbox ? images(lightbox.credential) : []}
        altFor={(i) => (lightbox ? alts(lightbox.credential)[i] : "")}
        open={lightbox !== null}
        initialIndex={lightbox?.index ?? 0}
        onClose={() => setLightbox(null)}
      />
    </>
  );
}

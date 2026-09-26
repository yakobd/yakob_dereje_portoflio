"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";

type CertificateGalleryProps = {
  title: string;
  images: string[];
};

/**
 * 140x100 thumbnail that opens the credential's images in a lightbox. Renders
 * nothing if the thumbnail fails to load, so the row looks like one without
 * an image.
 */
export default function CertificateGallery({
  title,
  images,
}: CertificateGalleryProps) {
  const [broken, setBroken] = useState(false);
  const [open, setOpen] = useState(false);

  if (broken || images.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View certificate: ${title}`}
        className="relative h-[100px] w-[140px] shrink-0 overflow-hidden rounded-lg border border-border bg-chip transition hover:border-border-strong hover:shadow-sm"
      >
        <Image
          src={images[0]}
          alt=""
          fill
          sizes="140px"
          onError={() => setBroken(true)}
          className="object-cover object-top"
        />
      </button>

      <Lightbox
        title={title}
        images={images}
        altFor={(i) =>
          images.length > 1
            ? `${title} — image ${i + 1} of ${images.length}`
            : `${title} — certificate`
        }
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

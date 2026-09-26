"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";

type ScreenshotGalleryProps = {
  /** Project title, used for alt text and the lightbox caption. */
  title: string;
  images: string[];
};

/** Grid of project screenshots; each opens the shared lightbox at that image. */
export default function ScreenshotGallery({
  title,
  images,
}: ScreenshotGalleryProps) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const altFor = (i: number) =>
    `${title} — screenshot ${i + 1} of ${images.length}`;

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setOpenAt(i)}
              aria-label={`Open screenshot ${i + 1} of ${images.length}`}
              className="group relative block aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-chip transition duration-200 hover:border-border-strong hover:shadow-[0_12px_30px_-12px_rgb(0_0_0/0.25)]"
            >
              <Image
                src={src}
                alt={altFor(i)}
                fill
                sizes="(min-width: 1024px) 512px, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.02]"
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        title={title}
        images={images}
        altFor={altFor}
        open={openAt !== null}
        initialIndex={openAt ?? 0}
        onClose={() => setOpenAt(null)}
      />
    </>
  );
}

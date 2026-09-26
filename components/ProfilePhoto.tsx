"use client";

import Image from "next/image";
import { useState } from "react";

type ProfilePhotoProps = {
  src: string;
  /** Tried if `src` fails to load, before falling back to the initials. */
  fallbackSrc?: string;
  alt: string;
  initials: string;
  /**
   * "avatar": 120px circle (About section).
   * "hero": large 4:5 rounded rectangle that fills its container's width.
   */
  variant?: "avatar" | "hero";
  className?: string;
};

/** Profile photo; tries `src`, then `fallbackSrc`, then an accent block with initials. */
export default function ProfilePhoto({
  src: primarySrc,
  fallbackSrc,
  alt,
  initials,
  variant = "avatar",
  className = "",
}: ProfilePhotoProps) {
  const [src, setSrc] = useState(primarySrc);
  const [failed, setFailed] = useState(false);

  function onError() {
    if (fallbackSrc && src !== fallbackSrc) setSrc(fallbackSrc);
    else setFailed(true);
  }

  if (variant === "hero") {
    return (
      <div
        className={`relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-border bg-accent shadow-[0_30px_60px_-30px_rgba(34,31,28,0.35)] ${className}`.trim()}
      >
        {failed ? (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center font-heading text-7xl font-medium tracking-tight text-white lg:text-8xl"
          >
            {initials}
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 240px"
            onError={onError}
            // Keep the face (upper third of the portrait) in frame.
            className="object-cover object-[50%_30%]"
          />
        )}
      </div>
    );
  }

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className={`flex h-[120px] w-[120px] items-center justify-center rounded-full bg-accent font-heading text-4xl font-medium text-white ${className}`.trim()}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={120}
      height={120}
      onError={onError}
      className={`h-[120px] w-[120px] rounded-full bg-chip object-cover object-[50%_20%] ${className}`.trim()}
    />
  );
}

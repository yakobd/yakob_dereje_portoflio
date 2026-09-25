"use client";

import Image from "next/image";
import { useState } from "react";

type ProfilePhotoProps = {
  src: string;
  alt: string;
  initials: string;
  /**
   * "avatar": 120px circle (About section).
   * "hero": large 4:5 rounded rectangle that fills its container's width.
   */
  variant?: "avatar" | "hero";
  className?: string;
};

/** Profile photo; falls back to an accent block with initials if the image fails to load. */
export default function ProfilePhoto({
  src,
  alt,
  initials,
  variant = "avatar",
  className = "",
}: ProfilePhotoProps) {
  const [failed, setFailed] = useState(false);

  if (variant === "hero") {
    return (
      <div
        className={`relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-border bg-accent shadow-[0_30px_60px_-30px_rgba(34,31,28,0.35)] ${className}`.trim()}
      >
        {failed ? (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center font-heading text-7xl font-medium tracking-tight text-surface lg:text-8xl"
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
            onError={() => setFailed(true)}
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
        className={`flex h-[120px] w-[120px] items-center justify-center rounded-full bg-accent font-heading text-4xl font-medium text-surface ${className}`.trim()}
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
      onError={() => setFailed(true)}
      className={`h-[120px] w-[120px] rounded-full bg-chip object-cover ${className}`.trim()}
    />
  );
}

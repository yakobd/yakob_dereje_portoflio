"use client";

import Image from "next/image";
import { useState } from "react";

type ProfilePhotoProps = {
  src: string;
  alt: string;
  initials: string;
};

/** 120px circular photo; falls back to the initials avatar if the image fails to load. */
export default function ProfilePhoto({
  src,
  alt,
  initials,
}: ProfilePhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-accent font-heading text-4xl font-medium text-surface"
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
      className="h-[120px] w-[120px] rounded-full bg-chip object-cover"
    />
  );
}

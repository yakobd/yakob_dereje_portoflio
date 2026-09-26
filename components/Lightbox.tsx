"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type LightboxProps = {
  /** Dialog label and caption. */
  title: string;
  images: string[];
  /** Accessible description of image `i`. */
  altFor: (i: number) => string;
  open: boolean;
  /** Image shown when the lightbox opens. */
  initialIndex?: number;
  onClose: () => void;
};

/**
 * Modal image viewer: click-to-zoom (1.8x, follows the pointer), arrow-key and
 * thumbnail navigation between images, and Escape / backdrop / X to close.
 * Built on the native <dialog>, which traps focus and restores it on close.
 */
export default function Lightbox({
  title,
  images,
  altFor,
  open,
  initialIndex = 0,
  onClose,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  // Zoom focus point, as percentages of the image area.
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  // Open / close the native dialog to match the `open` prop.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setIndex(initialIndex);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, initialIndex]);

  // Always start unzoomed when opening or switching images.
  useEffect(() => {
    setZoomed(false);
  }, [open, index]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function onKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (images.length < 2) return;
    if (event.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
    if (event.key === "ArrowLeft")
      setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function pointFrom(event: React.MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };
  }

  function toggleZoom(event: React.MouseEvent<HTMLButtonElement>) {
    // Keyboard activation reports clientX/Y of 0: zoom toward the center.
    setOrigin(event.detail === 0 ? { x: 50, y: 50 } : pointFrom(event));
    setZoomed((value) => !value);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        // Clicks on the backdrop land on the dialog element itself.
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="w-[min(92vw,1100px)] max-w-none rounded-2xl bg-transparent p-0 backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      <div className="relative rounded-2xl bg-surface p-4 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="-m-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-chip"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          onClick={toggleZoom}
          onMouseMove={(event) => zoomed && setOrigin(pointFrom(event))}
          aria-label={zoomed ? "Zoom out" : "Zoom in"}
          aria-pressed={zoomed}
          className={`relative mt-4 block h-[65vh] w-full overflow-hidden rounded-lg focus-visible:outline-offset-0 ${
            zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
        >
          {open && (
            <Image
              key={images[index]}
              src={images[index]}
              alt={altFor(index)}
              fill
              // Roughly 2x the display width so the 1.8x zoom stays sharp.
              sizes="(min-width: 1200px) 2000px, 184vw"
              style={{
                transform: zoomed ? "scale(1.8)" : "scale(1)",
                transformOrigin: `${origin.x}% ${origin.y}%`,
              }}
              className="object-contain transition-transform duration-300 ease-out motion-reduce:transition-none"
            />
          )}
        </button>
        <p className="mt-2 text-center text-xs text-muted">
          {zoomed ? "Click to zoom out" : "Click the image to zoom in"}
        </p>

        {images.length > 1 && (
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === index}
                className={`relative h-[60px] w-[80px] overflow-hidden rounded-lg border-2 transition ${
                  i === index
                    ? "border-accent"
                    : "border-border opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
}

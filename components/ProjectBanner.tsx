import type { BannerPattern } from "@/lib/banner";

type ProjectBannerProps = {
  /** Unique per page; used to namespace the SVG pattern/gradient ids. */
  id: string;
  color: string;
  initials: string;
  pattern: BannerPattern;
  /** Absolutely fill the nearest positioned parent instead of sizing via className. */
  fill?: boolean;
  className?: string;
  initialsClassName?: string;
};

const line = "rgb(255 255 255 / 0.2)";

function Pattern({ id, pattern }: { id: string; pattern: BannerPattern }) {
  switch (pattern) {
    case "stripes":
      return (
        <>
          <defs>
            <pattern
              id={id}
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="14"
                stroke={line}
                strokeWidth="5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </>
      );
    case "dots":
      return (
        <>
          <defs>
            <pattern
              id={id}
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="8" cy="8" r="2" fill={line} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </>
      );
    case "hex":
      return (
        <>
          <defs>
            <pattern
              id={id}
              width="28"
              height="48.5"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M14 0 L28 8.1 L28 24.2 L14 32.3 L0 24.2 L0 8.1 Z M14 32.3 L14 48.5"
                fill="none"
                stroke={line}
                strokeWidth="1.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </>
      );
    case "waves":
      return (
        <>
          <defs>
            <pattern
              id={id}
              width="48"
              height="18"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 9 Q12 0 24 9 T48 9"
                fill="none"
                stroke={line}
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </>
      );
    case "circles":
      // Concentric rings radiating from the top-right corner.
      return (
        <g fill="none" stroke={line} strokeWidth="2">
          {Array.from({ length: 30 }, (_, i) => (
            <circle key={i} cx="88%" cy="12%" r={18 + i * 22} />
          ))}
        </g>
      );
    case "triangles":
      // Layered translucent triangles; scaled to cover any aspect ratio.
      return (
        <svg
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
        >
          <polygon
            points="0,200 120,40 240,200"
            fill="rgb(255 255 255 / 0.08)"
          />
          <polygon
            points="160,200 300,20 440,200"
            fill="rgb(255 255 255 / 0.1)"
          />
          <polygon
            points="-60,200 40,90 140,200"
            fill="rgb(255 255 255 / 0.12)"
          />
          <polygon points="250,200 330,110 410,200" fill="rgb(0 0 0 / 0.08)" />
          <polygon points="60,0 150,0 105,70" fill="rgb(255 255 255 / 0.07)" />
          <polygon points="300,0 400,0 400,90" fill="rgb(0 0 0 / 0.07)" />
        </svg>
      );
  }
}

/**
 * Abstract, code-generated cover for projects without a real screenshot:
 * a geometric pattern in the project's color with its initials on top.
 */
export default function ProjectBanner({
  id,
  color,
  initials,
  pattern,
  fill = false,
  className = "",
  initialsClassName = "text-4xl",
}: ProjectBannerProps) {
  const patternId = `banner-${id}-pattern`;
  const glowId = `banner-${id}-glow`;

  return (
    <div
      aria-hidden="true"
      className={`${fill ? "absolute inset-0" : "relative"} flex items-center justify-center overflow-hidden ${className}`.trim()}
      style={{ backgroundColor: color }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Pattern id={patternId} pattern={pattern} />
        {/* Solid-color halo behind the initials keeps them readable. */}
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="45%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="50%" cy="50%" rx="30%" ry="48%" fill={`url(#${glowId})`} />
      </svg>
      <span
        className={`relative font-heading font-medium tracking-tight text-surface [text-shadow:0_1px_12px_rgb(0_0_0/0.15)] ${initialsClassName}`.trim()}
      >
        {initials}
      </span>
    </div>
  );
}

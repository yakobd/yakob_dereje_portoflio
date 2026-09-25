export type BannerPattern =
  "stripes" | "dots" | "circles" | "hex" | "waves" | "triangles";

export const bannerPatterns: BannerPattern[] = [
  "stripes",
  "dots",
  "hex",
  "waves",
  "circles",
  "triangles",
];

// Earthy tones that sit with the terracotta brand color. White initials
// clear 3:1 (large text) on all of them.
export const bannerColors = [
  "#8A4B2E",
  "#3E5C76",
  "#3B6E5E",
  "#5B4A6F",
  "#6E5A2F",
  "#7A4556",
];

const skipWords = new Set(["the", "a", "an", "&", "and", "of"]);

/** "Kenean Café & Restaurant Platform" -> "KC"; ignores text after an em dash subtitle. */
export function initialsFrom(title: string) {
  const words = title
    .split(" — ")[0]
    .split(/\s+/)
    .filter((word) => !skipWords.has(word.toLowerCase()));
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * Banner look for the Nth item of a grid. Colors and patterns cycle every 6,
 * so neighbors in a 2- or 3-column grid never share a color or pattern.
 */
export function bannerFor(
  project: { title: string; initials?: string },
  index: number,
) {
  return {
    initials: project.initials ?? initialsFrom(project.title),
    color: bannerColors[index % bannerColors.length],
    pattern: bannerPatterns[index % bannerPatterns.length],
  };
}

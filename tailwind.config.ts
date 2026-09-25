import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

// Colors are RGB triplets in CSS variables (app/globals.css) so the same
// utilities (bg-background, text-muted, …) switch with the .dark class.
const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        surface: token("surface"),
        border: token("border"),
        "border-strong": token("border-strong"),
        muted: token("muted"),
        subtle: token("subtle"),
        chip: token("chip"),
        accent: token("accent"),
        "accent-strong": token("accent-strong"),
        // Fixed near-black for text on always-light surfaces (e.g. white pills on color).
        ink: "#221F1C",
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", ...defaultTheme.fontFamily.serif],
        sans: ["var(--font-plex-sans)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;

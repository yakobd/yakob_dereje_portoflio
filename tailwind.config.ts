import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2", // ivory
        foreground: "#221F1C", // near-black
        surface: "#FFFFFF", // alternating sections
        border: "#E7E0D6",
        "border-strong": "#C9BFB0", // button outlines
        muted: "#6B655D", // secondary text
        subtle: "#756F65", // tertiary text (darkened from #8A8377 for AA contrast)
        chip: "#F0EBE2", // tag / pill background
        accent: "#B5651D", // terracotta, primary brand accent (large text, fills, borders)
        "accent-strong": "#A65E1D", // accent for small text and filled buttons (AA)
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

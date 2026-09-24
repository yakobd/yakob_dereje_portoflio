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
        muted: "#6B655D", // secondary text
        subtle: "#8A8377", // tertiary text
        chip: "#F0EBE2", // tag / pill background
        accent: "#B5651D", // terracotta, primary brand accent
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

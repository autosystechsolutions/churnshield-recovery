import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080B10",
        surface: "#0F141C",
        "surface-card": "#151B26",
        primary: "#10B981", // Emerald
        "primary-hover": "#059669",
        accent: "#6366F1", // Indigo
      },
    },
  },
  plugins: [],
};

export default config;

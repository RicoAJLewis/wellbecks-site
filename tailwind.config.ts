import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", md: "2rem" } },
    extend: {
      colors: {
        sand: {
          50: "#faf8f3",
          100: "#f4efe5",
          200: "#e8e0cf",
          300: "#d6c9ae",
          400: "#bfae89",
          500: "#a5936e",
        },
        leaf: { 50: "#eef7f1", 200: "#cfead8", 400: "#8dc79d", 600: "#3f8d5b", 700: "#2f6c46" },
        citrus: { 100: "#fff7e6", 300: "#ffe2a8", 500: "#fecf70", 600: "#f5b945" },
        beet: { 100: "#fde8ef", 300: "#f6b3c9", 600: "#b43b67", 700: "#8d2e50" },
        ink: {
          50: "#f7f7f7",
          100: "#ececec",
          200: "#dcdcdc",
          300: "#c2c2c2",
          600: "#4a4a4a",
          700: "#2d2d2d",
          900: "#121212",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"],
        display: ["Fraunces", "Georgia", "ui-serif", "serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06)",
      },
    },
  },
  future: { hoverOnlyWhenSupported: true },
};

export default config;

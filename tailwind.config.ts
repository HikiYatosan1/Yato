import type { Config } from "tailwindcss";

const config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        background: "#f4f8f8",
        foreground: "#102534",
        border: "#d4dcdc",
        avanta: {
          green: "#3AAA35",
          emerald: "#167F4A",
          navy: "#183A63",
          teal: "#083A47",
          gray: "#878787",
          graphite: "#575756",
          mist: "#eef3f4",
          pine: "#0f2c33",
        },
      },
      fontFamily: {
        sans: ["Museo Sans Cyrl", "Segoe UI", "sans-serif"],
        display: ["Museo Sans Cyrl", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        panel: "0 24px 64px rgba(10, 58, 71, 0.08)",
        float: "0 18px 40px rgba(24, 58, 99, 0.16)",
      },
      backgroundImage: {
        "avanta-gradient":
          "linear-gradient(135deg, rgba(58,170,53,1) 0%, rgba(22,127,74,1) 32%, rgba(24,58,99,1) 100%)",
        "hero-grid":
          "linear-gradient(rgba(24,58,99,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(24,58,99,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        pulseLine: {
          "0%, 100%": { opacity: "0.3", transform: "scaleX(0.94)" },
          "50%": { opacity: "0.85", transform: "scaleX(1)" },
        },
      },
      animation: {
        "pulse-line": "pulseLine 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;

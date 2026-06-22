import type { Config } from "tailwindcss";

/**
 * Sistema de design Traderisk Academy.
 * Base da marca: navy (azul profundo) + teal (verde-água). Tokens estendidos
 * para um visual corporativo/premium e didático (cor por grupo de modalidade).
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Azul institucional
        navy: {
          DEFAULT: "#0D1E3A",
          light: "#1A3055",
          950: "#060D1C",
          900: "#0A1730",
          800: "#0D1E3A",
          700: "#13294D",
          600: "#1A3055",
          500: "#274071",
        },
        // Verde-água da marca
        teal: {
          DEFAULT: "#00A693",
          light: "#00C9B1",
          dark: "#00786B",
          400: "#2DD4BF",
        },
        // Acento premium
        gold: { DEFAULT: "#F5B544", light: "#FBCB6B" },
        // Cor por grupo de modalidade (didática)
        grupo: {
          tradicional: "#00C9B1",
          judicial: "#5B9DF9",
          estruturada: "#A78BFA",
          financeira: "#F5B544",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Arial", "sans-serif"],
        display: ["Sora", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: { "2xl": "1rem", "3xl": "1.5rem" },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 12px 32px -12px rgba(0,0,0,0.55)",
        glow: "0 0 0 1px rgba(0,166,147,0.35), 0 8px 40px -8px rgba(0,166,147,0.45)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(900px 500px at 70% -10%, rgba(0,166,147,0.22), transparent 60%), radial-gradient(700px 400px at 10% 10%, rgba(91,157,249,0.12), transparent 55%)",
        "teal-grad": "linear-gradient(135deg, #00C9B1 0%, #00A693 50%, #00786B 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-up": "fade-up 0.5s ease-out both" },
    },
  },
  plugins: [],
};
export default config;

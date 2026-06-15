import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy:  { DEFAULT: "#0D1E3A", light: "#1A3055" },
        teal:  { DEFAULT: "#00A693", light: "#00C9B1" },
      },
      fontFamily: { sans: ["Inter", "Arial", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;

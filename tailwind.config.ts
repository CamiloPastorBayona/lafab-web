import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151515",
        gold: {
          DEFAULT: "#B0A080",
          light: "#CABBA0",
          dark: "#8A7B5E",
        },
        cream: "#F4F1EC",
        sale: "#C0392B",
        star: "#F4B400",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;

import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  darkMode: "media",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#e0f3ff",
              100: "#b2d7ff",
              200: "#84bdf9",
              300: "#56a2f6",
              400: "#2988f2",
              500: "#136ed9",
              600: "#0956a9",
              700: "#033d7a",
              800: "#00254c",
              900: "#000d1e",
              DEFAULT: "#0956a9",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              50: "#000d1e",
              100: "#00254c",
              200: "#033d7a",
              600: "#56a2f6",
              300: "#0956a9",
              400: "#136ed9",
              500: "#2988f2",
              700: "#84bdf9",
              800: "#b2d7ff",
              900: "#e0f3ff",
              DEFAULT: "#0956a9",
            },
          },
        },
      },
    }),
  ],
};
export default config;

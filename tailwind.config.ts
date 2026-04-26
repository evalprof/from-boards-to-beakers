import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#0F6E56",
          light: "#E1F5EE",
          mid: "#9FE1CB",
          dark: "#085041",
        },
        amber: {
          DEFAULT: "#BA7517",
          light: "#FAEEDA",
          mid: "#FAC775",
          dark: "#412402",
        },
        coral: { DEFAULT: "#993C1D", light: "#FAECE7" },
        purple: { DEFAULT: "#534AB7", light: "#EEEDFE" },
        blue: { DEFAULT: "#185FA5", light: "#E6F1FB" },
        green: { DEFAULT: "#3B6D11", light: "#EAF3DE" },
        pink: { DEFAULT: "#993556", light: "#FBEAF0" },
        ink: {
          50: "#F1EFE8",
          100: "#D3D1C7",
          200: "#B4B2A9",
          400: "#888780",
          600: "#5F5E5A",
          900: "#2C2C2A",
        },
        page: "#FFFCF7",
      },
      fontFamily: {
        display: ["var(--font-nunito)", "sans-serif"],
        body: ["var(--font-lato)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

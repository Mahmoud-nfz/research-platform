import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        primary: {
          100: "#e2d3b5",
          200: "#cec7b8",
          300: "#deb670",
          400: "#c8a57e",
          500: "#b18f6d",
          600: "#a07b5f",
          700: "#8b714f",
          800: "#7a5d41",
          900: "#6a4a33",
        },
      }
    },
  },
  plugins: [],
};
export default config;

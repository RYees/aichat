import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {fontFamily: {
      play: ["Unbounded", "sans-serif"],
    },},
  },

  plugins: [],
} satisfies Config;

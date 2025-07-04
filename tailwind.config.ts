import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        conversation: "url('/back_convo.png')", // make sure this file is in the /public directory
      },
      keyframes: {
        scrollBackground: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "15% 0" },
        },
      },
      animation: {
        "scroll-bg": "scrollBackground 60s linear infinite",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark","light"],
  },
};

export default config;

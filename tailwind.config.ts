import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--primary)",
        secondary: "var(--secondary)",
        default: "var(--primary)",
      },
      fontSize: {
        "h1": [
          "36px",
          {
            lineHeight: "30px",
            letterSpacing: "-2.5px",
            fontWeight: "600",
          },
        ],
        "h2": [
          "24px",
          {
            lineHeight: "30px",
            letterSpacing: "-2.5px",
            fontWeight: "600",
          },
        ],
      },
    },
  },
  plugins: [
  ],
} satisfies Config;

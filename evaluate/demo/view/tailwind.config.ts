import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'bg.main': 'rgb(165 243 252)',
        'bg.card': 'rgb(134 239 172)',
        'bg.pop': 'rgb(187 247 208)',
        'bg.dialog': 'rgb(31 41 55)',
        'bg.dialog.opacity': 'rgba(31 41 55 / 0.8)',
        'bg.primaryBtn': 'rgb(20 184 166)',
        'bg.normalBtn': 'rgb(240 253 250)',
        'text.primaryBtn': 'rgb(255 255 255)',
        'text.error': 'rgb(239 68 68)',
      },
      width: {
        
      }
    },
  },
  plugins: [],
};
export default config;

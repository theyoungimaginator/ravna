import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    fontFamily: {
      sans: ['Satoshi', 'ui-sans-serif', 'system-ui'],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgba(255, 255, 255, 0.05)",
        background: "#0D0D0D",
        foreground: "#FFFFFF",
        platinum: "#E5E4E2",
        'muted': {
          DEFAULT: "#1A1A1A",
          foreground: "#B3B3B3",
        },
        'primary': {
          DEFAULT: "#FFFFFF",
          foreground: "#0D0D0D",
        },
        'secondary': {
          DEFAULT: "#1A1A1A",
          foreground: "#B3B3B3",
        },
        destructive: {
          DEFAULT: "#FF4C4C",
          foreground: "#FFFFFF",
        },
        accent: "#B3B3B3",
        popover: {
          DEFAULT: "#0D0D0D",
          foreground: "#FFFFFF",
        },
        card: "#181818",
      },
      borderRadius: {
        lg: "20px",
        md: "calc(20px - 4px)",
        sm: "calc(20px - 8px)",
        card: "12px",
        button: "8px",
      },
      boxShadow: {
        glass: "0 4px 32px 0 rgba(255,255,255,0.08)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
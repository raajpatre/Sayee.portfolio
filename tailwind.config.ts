import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-error-container": "#93000a",
        "error-container": "#ffdad6",
        "surface-container-high": "#f0e7d5",
        "on-secondary-fixed": "#410005",
        "surface-container": "#f6edda",
        "on-error": "#ffffff",
        "inverse-primary": "#e9c400",
        "on-surface-variant": "#4d4632",
        "inverse-surface": "#343024",
        "on-primary-fixed": "#221b00",
        "surface-tint": "#705d00",
        "inverse-on-surface": "#f9f0dd",
        "on-secondary-container": "#60000b",
        "tertiary-fixed": "#dce1ff",
        "surface-container-lowest": "#ffffff",
        "secondary-container": "#fe5b5b",
        "secondary-fixed": "#ffdad7",
        "surface-dim": "#e1d9c7",
        "surface-container-low": "#fcf3e0",
        "on-primary-container": "#705d00",
        "on-tertiary-container": "#004dea",
        "tertiary-container": "#d0d7ff",
        "primary": "#705d00",
        "tertiary": "#004dea",
        "on-secondary": "#ffffff",
        "on-surface": "#1f1b10",
        "background": "#fff8ef",
        "outline-variant": "#d0c6ab",
        "outline": "#7f775f",
        "error": "#ba1a1a",
        "primary-fixed-dim": "#e9c400",
        "tertiary-fixed-dim": "#b7c4ff",
        "surface-variant": "#eae2cf",
        "on-primary-fixed-variant": "#544600",
        "on-tertiary-fixed-variant": "#0039b4",
        "on-background": "#1f1b10",
        "surface-container-highest": "#eae2cf",
        "surface": "#fff8ef",
        "surface-bright": "#fff8ef",
        "on-tertiary": "#ffffff",
        "primary-container": "#ffd600",
        "on-secondary-fixed-variant": "#920418",
        "primary-fixed": "#ffe170",
        "secondary": "#b4252d",
        "secondary-fixed-dim": "#ffb3af",
        "on-tertiary-fixed": "#001551",
        "on-primary": "#ffffff",
        "brand-yellow": "#FFD600",
        "brand-black": "#1A1A1A",
        "brand-coral": "#FF5C5C",
        "brand-blue": "#1B5BFF",
        "brand-offwhite": "#F5F0E8",
        "brand-cream": "#FFFBF0"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px",
        "card": "12px"
      },
      spacing: {
        "stack-sm": "16px",
        "gutter": "24px",
        "margin-desktop": "40px",
        "margin-mobile": "16px",
        "container-max": "1440px",
        "stack-lg": "80px",
        "stack-md": "40px",
        "md": "16px",
        "lg": "24px",
        "xl": "32px",
        "2xl": "48px",
        "sm": "8px",
        "sidebar-width": "260px",
        "xs": "4px",
        "unit": "4px"
      },
      fontFamily: {
        "headline-md": ["var(--font-clash-display)", "sans-serif"],
        "body-md": ["var(--font-plus-jakarta)", "sans-serif"],
        "label-accent": ["var(--font-plus-jakarta)", "sans-serif"],
        "display-xl": ["var(--font-clash-display)", "sans-serif"],
        "headline-lg": ["var(--font-clash-display)", "sans-serif"],
        "display-xl-mobile": ["var(--font-clash-display)", "sans-serif"],
        "body-lg": ["var(--font-plus-jakarta)", "sans-serif"],
        "handwriting": ["var(--font-caveat)", "cursive"]
      },
      fontSize: {
        "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "700"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "label-accent": ["24px", {"lineHeight": "24px", "fontWeight": "600"}],
        "display-xl": ["96px", {"lineHeight": "100px", "letterSpacing": "-0.04em", "fontWeight": "800"}],
        "headline-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "display-xl-mobile": ["48px", {"lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "800"}],
        "body-lg": ["20px", {"lineHeight": "32px", "fontWeight": "500"}]
      },
      boxShadow: {
        "hard-md": "4px 4px 0px 0px rgba(26, 26, 26, 1)",
        "hard-lg": "8px 8px 0px 0px rgba(26, 26, 26, 1)",
        "hard-sm": "2px 2px 0px 0px rgba(26, 26, 26, 1)"
      },
      animation: {
        "ticker": "ticker 20s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;

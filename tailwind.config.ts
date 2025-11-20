import tailwindAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
        // MongoDB Brand Colors
        mongodb: {
          green: {
            50: '#e3f9e5',
            100: '#c1eac5',
            200: '#a3d9a5',
            300: '#7bc47f',
            400: '#5ab55e',
            450: '#E3FCF7',
            500: '#00684A', // Primary MongoDB Green
            600: '#005a3f',
            700: '#004d34',
            800: '#003d29',
            900: '#002e1f',
          },
          slate: {
            50: '#f8fafb',
            100: '#f3f4f6',
            200: '#e3e6ea',
            300: '#c1c7cd',
            400: '#889397',
            500: '#5C6C75', // MongoDB Dark Slate
            600: '#495057',
            700: '#3d444a',
            800: '#2d3338',
            900: '#1C2D24', // MongoDB Forest (dark backgrounds)
          },
          white: '#FFFFFF',
          black: '#001E2B', // MongoDB Deep Navy
          yellow: '#FFE212', // MongoDB Accent Yellow
          blue: '#00A4EF', // Accent Blue
          purple: '#E91E63', // Accent Purple/Pink
          orange: '#FF6F00', // Accent Orange
          bghong: "#F9EBFF"
        },
      fontFamily: {
        heading: ['MongoDBValueSerif', 'serif'],
        body:   ['EuclidCircularA', 'sans-serif'],
        code:   ['Source Code Pro', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;

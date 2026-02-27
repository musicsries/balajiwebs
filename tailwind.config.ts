import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
extend: {

fontFamily: {

heading: ['Playfair Display', 'serif'],

body: ['DM Sans', 'sans-serif'],

},

colors: {

border: "hsl(var(--border))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",

gold: "hsl(var(--gold))",
        "gold-light": "hsl(var(--gold-light))",
        maroon: "hsl(var(--maroon))",
        emerald: "hsl(var(--emerald))",
        whatsapp: "hsl(var(--whatsapp))",
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

"fade-in": {

from: { opacity: "0", transform: "translateY(10px)" },

to: { opacity: "1", transform: "translateY(0)" },

},

},

animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;




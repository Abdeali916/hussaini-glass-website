/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "3rem" },
    },
    extend: {
      colors: {
        ink: "#12161C",        // near-black charcoal-navy, primary text / dark sections
        navy: "#1B2534",       // deep navy, secondary dark
        steel: "#5E7285",      // muted glass-blue, accents / links / icons
        "steel-light": "#8FA3B3",
        mist: "#EEF1F3",       // pale cool grey for section backgrounds
        paper: "#F7F5F0",      // warm off-white
        line: "#DCDFE2",       // hairline border color
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["\"Fraunces\"", "serif"],
        sans: ["\"Inter\"", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1320px",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(18,22,28,0.06)",
        panel: "0 12px 40px rgba(18,22,28,0.10)",
      },
      borderRadius: {
        sm2: "3px",
      },
      keyframes: {
        reveal: {
          "0%": { opacity: 0, transform: "translateY(14px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        reveal: "reveal 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};

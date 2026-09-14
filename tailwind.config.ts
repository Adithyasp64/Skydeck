import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        char: "#0B0B0C",
        char2: "#121214",
        line: "#29292D",
        bone: "#F4F2ED",
        smoke: "#9A9AA2",
        gold: "#D9B36C",
        goldSoft: "#F0D49B",
        ember: "#D97955",
        neonBlue: "#4C7FFF",
        neonViolet: "#9B5EE0",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "radial-gold": "radial-gradient(circle at 50% 30%, rgba(217,179,108,0.13), transparent 60%)",
        "radial-violet": "radial-gradient(circle at 80% 20%, rgba(155,94,224,0.13), transparent 55%)",
        "radial-blue": "radial-gradient(circle at 20% 80%, rgba(76,127,255,0.11), transparent 55%)",
        grain: "url('/images/noise.png')",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;

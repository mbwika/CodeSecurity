/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "ink-900": "#06141f",
        "ink-800": "#0c2332",
        "brand-cyan": "#29d6ff",
        "brand-lime": "#a3f07c",
        "brand-amber": "#ffb347",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
      },
      boxShadow: {
        panel: "0 20px 40px -28px rgba(6, 20, 31, 0.7)",
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 10% 20%, rgba(41, 214, 255, 0.16), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255, 179, 71, 0.18), transparent 42%), linear-gradient(145deg, #06141f 0%, #0c2332 46%, #123246 100%)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 👈 مهم
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          lg: "1024px",
          xl: "1120px",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15,23,42,0.10)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "float-main": "float-main 7s ease-in-out infinite",
        "float-soft": "float-soft 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

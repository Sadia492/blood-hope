/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#ef4136",
        primary: "#9e2817",
        secondary: "#ff563d",
        accent: "#f28575",
      },
    },
  },
  plugins: [require("daisyui")],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "Back-color": "#1B1D1F",
        "Back-modal": "#282B30",
        "Text-color": "#D2D5DA",
        "Check-color": "#4E80EE",
        "Back-buttons": "#6C727F",
      },
    },
  },
  plugins: [],
}

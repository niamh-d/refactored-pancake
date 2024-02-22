/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "false",
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter"],
  },
};

// npx tailwindcss -i src/index.css -o src/output.css --watch

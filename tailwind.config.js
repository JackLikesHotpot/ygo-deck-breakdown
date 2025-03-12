/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Add file extensions where Tailwind will search for class names
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

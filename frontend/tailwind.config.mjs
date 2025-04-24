export default {
  darkMode: "class", // optional if always dark
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        card: "#1f242c",
        background: "#181d22",
        foreground: "#f5f5f5",
        highlight: "#b8860b",
        projects: "#2a9d8f",
        blog: "#50c878",
      },
    },
  },
  plugins: [],
}

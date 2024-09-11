/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        "footer-texture": "url('/src/images/footer-texture.png')",
      },
      colors: {
        maple: "#c1170c",
      },
    },
  },
  plugins: [],
};

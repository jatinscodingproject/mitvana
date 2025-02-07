/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    './src/pages/**/*.{js,ts,jsx,tsx}',  // Include all pages
    './src/components/**/*.{js,ts,jsx,tsx}',
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors:{
        customPrimary: "#193a43"
      },
      margin: {
        sectionMargin: "30px 0",
        headingMargn: "0 0 10px"
      },
      fontFamily: {
        playfair: "Playfair Display"
      }
    },
  },
  plugins: [],
}
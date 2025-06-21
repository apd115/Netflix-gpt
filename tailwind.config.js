// import { defineConfig } from "vite";
// import tailwindcss from "@tailwindcss/vite";
// export default defineConfig({
//   content: ["./src/**/*.{js,jsx,ts,tsx}"], // adjust based on your project structure
//   theme: {
//     extend: {},
//   },
//   plugins: [tailwindcss()],
// });

// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"], // adjust based on your project structure
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('tailwind-scrollbar-hide') // 👈 Add this
//   ],
// };

import plugin from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [plugin], // 👍 Correct ESM usage
};

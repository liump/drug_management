//tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // gridTemplateColumns: {
      //   'responsive':repeat(autofill,minmax('300px',1fr))
      // }
    }
  },
  // plugins: [],
  corePlugins: {
    preflight: false
  }
}

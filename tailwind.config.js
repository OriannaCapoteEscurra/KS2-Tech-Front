/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A", // Azul Medianoche
        accent: "#10B981", // Verde Esmeralda Suave
        background: "#F8FAFC", // Gris Ultra-claro
        surface: "#FFFFFF", // Blanco puro
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}

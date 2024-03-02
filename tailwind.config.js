import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui:{
    themes: [
      {
        mytheme: {
          primary: "#7c3aed",
          secondary: "#db2777",
          accent: "#37cdbe",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
          "base-200": "#E2E8F0",
          "base-300": "#CBD5E1",
        },
      },
    ],
  }
};

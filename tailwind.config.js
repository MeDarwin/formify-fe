import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    ...["info", "success", "warning", "error"].map((type) => `bg-${type}`),
    ...["info", "success", "warning", "error"].map((type) => `border-${type}`),
    ...["info", "success", "warning", "error"].map((type) => `text-${type}`),
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
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
          error: "#ff5861",
          "base-200": "#E2E8F0",
          "base-300": "#CBD5E1",
        },
      },
    ],
  },
};

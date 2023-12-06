module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0035B2",
          secondary: "#4f46e5",
          accent: "#A400B2",
          neutral: "#2b3440",
          "base-100": "#ffffff",
          info: "#00b5ff",
          success: "#4ade80",
          warning: "#ffbe00",
          error: "#ff5861",
        },
      },
    ],
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};

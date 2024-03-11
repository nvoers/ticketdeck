module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0035B2",
          secondary: "#F0F9FF",
          accent: "#A400B2",
          neutral: "#2B3440",
          info: "#00b5ff",
          success: "#22C55E",
          warning: "#FFBE00",
          error: "#EF4444",
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

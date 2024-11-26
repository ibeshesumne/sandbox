module.exports = {
  darkMode: 'class', // Ensure 'class' mode is set for dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zenGray: "#F3F4F6",
        zenBlue: "#A7C7E7",
        zenDark: "#1E293B",
        zenAccent: "#3B82F6",
        zenLight: "#FFFFFF",
        zenDarkText: "#E2E8F0",
        zenLightText: "#1E293B",
      },
      fontFamily: {
        sans: ["Inter", "Sans-serif"],
        serif: ["Lora", "Serif"],
      },
    },
  },
  plugins: [],
};
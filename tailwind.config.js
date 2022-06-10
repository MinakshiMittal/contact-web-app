module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "home-page": "url('./assets/HomePage.png')",
      },
      colors: {
        blue: "#5980e3",
        purple: "#8c79ff",
        "light-black": "#464647",
        "black-transparent": "#212121d6",
      },
      boxShadow: {
        default: " 0px 10px 21px 0 rgba(91, 130, 229, 0.37)",
        "inner-default":
          "inset -3px -3px 6px 0 rgba(255, 255, 255, 0.6), inset 2px 2px 5px 2px rgba(211, 211, 235, 0.6)",
      },
    },
  },
  plugins: [],
};

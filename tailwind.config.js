module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        dark: {
          300: "#25272C",
          400: "rgba(50,50,59,0.25)",
          500: "#1D1D1D",
          700: "#141416",
        },
      },
      textColor: {
        yellow: {
          DEFAULT: "#FCEC60",
          dark: "#FFD231",
        },
        brown: "#584D14",
      },
      borderColor: {
        dark: {
          400: "#1E222B",
        },
        yellow: {
          DEFAULT: "#FCEC60",
        },
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          lg: "1140px",
          xl: "1320px",
          "2xl": "1320px",
        },
      },
      fontFamily: {
        sans: ["DM Sans", " sans-serif"],
        mineCraft: "Minercraftory Regular",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

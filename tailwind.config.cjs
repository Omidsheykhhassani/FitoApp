module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  // @ts-expect-error NativeWind's preset declaration is not a TypeScript module
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ffc7c7",
          100: "#ffb7b7",
          200: "#ff9696",
          300: "#ff7676",
          400: "#ff5656",
          500: "#ff3636",
          600: "#d62d2d",
          700: "#ad2525",
          800: "#851c1c",
          900: "#5c1313",
        },

        text: {
          50: "#BCBCBC",
          100: "#A9A9A9",
          200: "#838383",
          300: "#5D5D5D",
          400: "#373737",
          500: "#111111",
          600: "#0E0E0E",
          700: "#0C0C0C",
          800: "#090909",
          900: "#060606",
        },

        background: {
          50: "#FBFBFB",
          100: "#FAFAFA",
          200: "#F8F8F8",
          300: "#F6F6F6",
          400: "#F4F4F4",
          500: "#F2F2F2",
          600: "#CBCBCB",
          700: "#A5A5A5",
          800: "#7E7E7E",
          900: "#575757",
        },
      },
    },
  },
  plugins: [],
};

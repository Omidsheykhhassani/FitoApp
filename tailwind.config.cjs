module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  // @ts-expect-error NativeWind's preset declaration is not a TypeScript module
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};

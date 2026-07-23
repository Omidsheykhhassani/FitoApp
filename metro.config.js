const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// @ts-expect-error Expo Metro and NativeWind expose incompatible Metro types
module.exports = withNativeWind(config, {
  input: "./src/app/global.css",
});

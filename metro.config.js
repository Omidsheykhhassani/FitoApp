const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(
  /** @type {import("metro-config").MetroConfig} */ (
    /** @type {unknown} */ (config)
  ),
  /** @type {Parameters<typeof withNativeWind>[1]} */ (
    /** @type {unknown} */ ({ input: "./src/app/global.css" })
  ),
);

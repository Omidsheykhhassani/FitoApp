import { Stack } from "expo-router";

import { useFonts } from "expo-font";

import "./global.css";
import { useEffect } from "react";

import { setupAlarmNotifications } from "@/services/notification";

export default function RootLayout() {
  useEffect(() => {
    setupAlarmNotifications();
  }, []);

  const [fontsLoaded] = useFonts({
    Rubik: require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Light": require("../../assets/fonts/Rubik-Light.ttf"),
    "Rubik-LightItalic": require("../../assets/fonts/Rubik-LightItalic.ttf"),
    "Rubik-Medium": require("../../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-MediumItalic": require("../../assets/fonts/Rubik-MediumItalic.ttf"),
    "Rubik-SemiBold": require("../../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-SemiBoldItalic": require("../../assets/fonts/Rubik-SemiBoldItalic.ttf"),
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-BoldItalic": require("../../assets/fonts/Rubik-BoldItalic.ttf"),
    "Rubik-Black": require("../../assets/fonts/Rubik-Black.ttf"),
    "Rubik-BlackItalic": require("../../assets/fonts/Rubik-BlackItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "FitoApp" }} />
      <Stack.Screen name="202020Clock" options={{ title: "20-20-20 Clock" }} />
    </Stack>
  );
}

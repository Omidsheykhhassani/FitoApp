import { Text, View } from "react-native";

import * as Notifications from "expo-notifications"

import "./global.css";

import MiniappCard from "@/components/MiniappCard/MiniappCard";

import { CardData } from "../../data/MiniappCardData";
import { useEffect } from "react";

export default function Index() {
  let appMenuContent = undefined;

  if (!CardData) {
    appMenuContent = <Text>No apps available.</Text>;
  } else {
    appMenuContent = (
      <>
        {CardData.map((card) => {
          return <MiniappCard name={card.name} icon={card.icon} href={card.href} key={card.name} />;
        })}
      </>
    );
  }

  useEffect(() => {
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();

      console.log("Notification permission:", status);
    }

    requestPermissions();
  }, []);

  return (
    <View className="flex-1 items-start p-4 flex-row bg-background-500">
      {appMenuContent}
    </View>
  );
}

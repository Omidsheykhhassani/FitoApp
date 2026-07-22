import { Text, View } from "react-native";

import "./global.css";

import MiniappCard from "@/components/MiniappCard/MiniappCard";

import { CardData } from "../../data/MiniappCardData";

export default function Index() {
  let appMenuContent = undefined;

  if (!CardData) {
    appMenuContent = <Text>No apps available.</Text>;
  } else {
    appMenuContent = (
      <>
        {CardData.map((card) => {
          return <MiniappCard name={card.name} icon={card.icon} key={card.name} />;
        })}
      </>
    );
  }

  return (
    <View className="flex-1 items-start p-4 flex-row bg-background-500">
      {appMenuContent}
    </View>
  );
}

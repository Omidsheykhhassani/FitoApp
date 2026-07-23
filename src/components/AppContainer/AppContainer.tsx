import { View } from "react-native";

type AppContainerProps = {
  children: React.ReactNode;
};

export default function AppContainer({ children }: AppContainerProps) {
  return <View className="flex-1 p-4 bg-background-500">{children}</View>;
}

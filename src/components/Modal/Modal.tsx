import { Modal as RNModal, Text, View } from "react-native";

type ModalTypes = {
  children: React.ReactNode;
  title: string;
};

export default function Modal({ children, title }: ModalTypes) {
  return (
    <RNModal transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/50 p-4">
        <View className="justify-center items-center w-full rounded-3xl bg-background-500 p-6">
          <Text className="text-4xl text-text-500 mb-8 mt-4" style={{
            fontFamily: "Rubik-Bold"
          }}>{title}</Text>
          {children}
        </View>
      </View>
    </RNModal>
  );
}

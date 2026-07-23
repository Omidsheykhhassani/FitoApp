import React from "react";
import { Pressable, Text } from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
};

export default function Button({ children, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mx-2 my-4 w-full items-center rounded-xl bg-primary-500 px-2 py-4"
    >
      <Text
        className="text-2xl text-white"
        style={{
          fontFamily: "Rubik-Bold",
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

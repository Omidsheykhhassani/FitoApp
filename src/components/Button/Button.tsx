import React from "react";
import { Pressable, Text, View } from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
};

export default function Button({ children, onPress }: ButtonProps) {
  return (
    <View
      className="mx-2 my-4 w-full rounded-xl"
      style={{
        overflow: "hidden",
      }}
    >
      <Pressable
        android_ripple={{
          color: "#ad2525",
          borderless: false,
        }}
        onPress={onPress}
        className="w-full items-center bg-primary-500 px-2 py-4"
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
    </View>
  );
}

import {
  Image,
  Pressable,
  Text,
  View,
  ImageSourcePropType,
} from "react-native";

type MiniappCardProps = {
  name: string;
  icon: ImageSourcePropType;
};

export default function MiniappCard({ name, icon }: MiniappCardProps) {
  return (
    <Pressable className="w-1/2 p-2">
      {({ pressed }) => (
        <View
          className="items-center justify-center rounded-3xl bg-primary-100 p-6 gap-8"
          style={{
            boxShadow: pressed
              ? [
                  {
                    inset: true,
                    offsetX: 2,
                    offsetY: 2,
                    blurRadius: 4,
                    spreadDistance: 0,
                    color: "#D99494",
                  },
                  {
                    inset: true,
                    offsetX: -2,
                    offsetY: -2,
                    blurRadius: 4,
                    spreadDistance: 0,
                    color: "#FFDADA",
                  },
                ]
              : [
                  {
                    offsetX: -2,
                    offsetY: -2,
                    blurRadius: 2,
                    spreadDistance: 0,
                    color: "#FFDADA",
                  },
                  {
                    offsetX: 2,
                    offsetY: 2,
                    blurRadius: 2,
                    spreadDistance: 0,
                    color: "#D99494",
                  },
                ],
          }}
        >
          <Image
            className="h-[92px] w-[92px]"
            resizeMode="contain"
            source={icon}
          />
          <Text
            className="text-xl text-text-500 text-center"
            style={{
              fontFamily: "Rubik-SemiBold",
            }}
          >
            {name}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

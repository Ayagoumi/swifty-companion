import { View, Text } from "react-native";

export default function BlackHole({ remaining, Bgcolor }) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: Bgcolor,
        }}
      >
        Black Hole absorption
      </Text>
      <Text
        style={{
          fontSize: 30,
          color: Bgcolor,
          fontWeight: "bold",
          paddingVertical: 7,
        }}
      >
        {remaining}&nbsp;days&nbsp;left
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: Bgcolor,
        }}
      >
        Black Hole absorption
      </Text>
    </View>
  );
}
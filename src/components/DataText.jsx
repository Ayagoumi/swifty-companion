import { View, Text } from "react-native";

export default function DataText({ color, text, dataName }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 10, }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          color: color ? color : "#00babc",
        }}
      >
        {text}
      </Text>
      <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
        {dataName}
      </Text>
    </View>
  );
}

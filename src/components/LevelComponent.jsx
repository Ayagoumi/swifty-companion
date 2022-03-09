import { View, Text } from "react-native";

export default function LevelComponent({ level, Bgcolor, data, selected }) {
  return (
    <View
      style={{
        width: "100%",
        height: 50,
        justifyContent: "center",
        backgroundColor: "rgba(32,32,38,0.85)",
        borderRadius: 12,
        marginTop: 15,
      }}
    >
      <View
        style={{
          width: `${level}%`,
          backgroundColor: Bgcolor,
          height: "100%",
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
      <Text
        style={{
          position: "absolute",
          width: "100%",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {data?.cursus_users[selected]?.level
          ? data?.cursus_users[selected]?.level.toFixed(2)
          : 0}
        &nbsp;%
      </Text>
    </View>
  );
}

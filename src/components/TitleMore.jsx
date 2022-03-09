import { View, Text, TouchableOpacity } from "react-native";

export default function TitleMore({ title, setMore, more, bgStyle }) {
  return (
    <View
      style={{
        paddingVertical: 12,
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={() => setMore(!more)} color="black">
        <Text
          style={{
            fontSize: 12,
            color: bgStyle,
            fontWeight: "bold",
          }}
        >
          {more ? "Show Less" : "Show More"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

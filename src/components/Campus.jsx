import Icon from "react-native-vector-icons/Feather";
import { View, Text } from "react-native";

export function Campus({ campus }) {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Icon name="map" size={18} color="white" />
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          paddingLeft: 10,
          color: "white",
        }}
      >
        {campus}
      </Text>
    </View>
  );
}

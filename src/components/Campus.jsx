import Icon from "react-native-vector-icons/Feather";
import { View, Text, StyleSheet } from "react-native";

export default function Campus({ campus }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Icon name="map" size={18} color="white" />
      <Text style={styles.campusText}>{campus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  campusText: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
    color: "white",
    marginBottom: 13,
  },
});

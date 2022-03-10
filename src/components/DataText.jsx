import { View, Text, StyleSheet } from "react-native";

export default function DataText({ color, text, dataName }) {
  return (
    <View style={styles.Container}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          color: color ? color : "#00babc",
        }}
      >
        {text}
      </Text>
      <Text style={styles.dataText}>{dataName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    width: "100%",
  },
  dataText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});

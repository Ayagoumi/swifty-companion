import { View, Text, StyleSheet } from "react-native";

export default function BlackHole({ remaining, Bgcolor }) {
  return (
    <View style={styles.blackholeContainer}>
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

const styles = StyleSheet.create({
  blackholeContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
});

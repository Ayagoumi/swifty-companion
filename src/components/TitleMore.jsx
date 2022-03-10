import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TitleMore({ title, setMore, more, bgStyle }) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleStyle}>{title}</Text>
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

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

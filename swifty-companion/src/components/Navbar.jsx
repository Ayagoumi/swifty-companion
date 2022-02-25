import { Text, View, StyleSheet } from "react-native";
import React from "react";

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <Text>42 logo</Text>
      <Text>nightMode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    // backgroundColor: "#00ff00",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 70,
  },
});

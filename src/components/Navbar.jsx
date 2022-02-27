import { Text, View, StyleSheet, Image } from "react-native";
import React from "react";

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <Image
        style={{ width: 60, height: 33 }}
        source={require("../../assets/42.png")}
      />
      <Text>nightMode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 60,
  },
});

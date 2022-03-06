import { View, StyleSheet, Image } from "react-native";
import React from "react";

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <Image style={styles.logo} source={require("../../assets/42.png")} />
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
  logo: { width: 60, height: 33 },
  darkModeStyle: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 15,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});

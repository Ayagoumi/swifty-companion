import { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.navbar}>
      <Image style={styles.logo} source={require("../../assets/42.png")} />
      <TouchableOpacity
        onPress={() => {
          setDarkMode(!darkMode);
          console.log(darkMode);
        }}
      >
        <View style={styles.darkModeStyle}>
          {darkMode ? (
            <Icon name="sun" size={23} color="black" />
          ) : (
            <Icon name="moon" size={23} color="black" />
          )}
        </View>
      </TouchableOpacity>
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

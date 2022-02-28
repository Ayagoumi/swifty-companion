import { Text, View, StyleSheet, Image } from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/Feather';

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <Image
        style={{ width: 60, height: 33 }}
        source={require("../../assets/42.png")}
      />
      <View
        style={{
          backgroundColor: "#fff",
          width: 50,
          height: 50,
          borderRadius: 15,
          shadowColor: "rgb(0 0 0 / 0.25)",
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 15,
        }}
      >
        <Icon name="sun" size={20} color="black" />
      </View>
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

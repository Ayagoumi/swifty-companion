import * as React from "react";
import { View, TouchableOpacity } from "react-native";

export default function UserCard({ navigation, children }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("MyModal")}>
      <View
        style={{
          backgroundColor: "#fff",
          width: "100%",
          height: "100%",
          borderRadius: 15,
          paddingHorizontal: 30,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}

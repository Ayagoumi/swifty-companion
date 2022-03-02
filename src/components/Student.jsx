import React from "react";
import { Text, View } from "react-native";

export default function Student({ staff, color }) {
  return (
    <View>
      {staff === false ? (
        <View
          style={{
            backgroundColor: color ? color : "#00babc",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            STUDENT
          </Text>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "#E05757",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            STAFF
          </Text>
        </View>
      )}
    </View>
  );
}

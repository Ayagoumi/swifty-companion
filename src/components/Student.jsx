import React from "react";
import { Text, View, StyleSheet } from "react-native";

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
          <Text style={styles.staffText}>STUDENT</Text>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "#E05757",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text style={styles.staffText}>STAFF</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  staffText: {
    fontWeight: "bold",
    color: "white",
  },
});

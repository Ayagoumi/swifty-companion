import { View, Text, StyleSheet, Fragment } from "react-native";
import { SvgCssUri } from "react-native-svg";

export default function Coalition({ color, name, imageURL }) {
  return (
    <View style={styles.banner}>
      <SvgCssUri
        style={{ backgroundColor: color }}
        width="30px"
        height="50px"
        uri={imageURL}
        fill="#fff"
      />
      <Text style={{ color: color, fontSize: 16, marginLeft: 5, fontWeight: "bold", }}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
  },
});

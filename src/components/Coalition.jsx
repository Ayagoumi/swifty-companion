import { View, Text, StyleSheet } from "react-native";
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
      <Text style={(styles.coalName, { color: color, marginLeft: 10, })}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "center",
  },
  coalName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 6,
    // marginLeft: 5,
  },
});

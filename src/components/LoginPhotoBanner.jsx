import { View, Text, StyleSheet } from "react-native";
import UserAvatar from "react-native-user-avatar";
import Student from "./Student";

export default function LoginPhotoBanner({
  login,
  Bgcolor,
  name,
  imageStatus,
  image_url,
  staff,
}) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          color: "white",
          textTransform: "capitalize",
        }}
      >
        {login}
      </Text>
      <Student staff={staff} color={Bgcolor} />
      <View
        style={{
          backgroundColor: Bgcolor,
          width: 43,
          height: 43,
          borderRadius: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <UserAvatar
          size={40}
          name={name}
          src={
            imageStatus === 200
              ? image_url
              : "https://cdn.intra.42.fr/users/default.png"
          }
          style={{ width: 40, height: 40 }}
          bgColor="white"
          textColor="white"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "rgba(32,32,38,0.85)",
    borderRadius: 12,
    marginBottom: 15,
  },
});

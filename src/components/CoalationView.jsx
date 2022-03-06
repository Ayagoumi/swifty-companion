import { View, Text, ImageBackground, StyleSheet } from "react-native";
import Coalition from "./Coalition";
import Icon from "react-native-vector-icons/Feather";
import Student from "./Student";

export default function CoalationView({
  coalitions,
  cover_url,
  name,
  staff,
  bgstyle,
}) {
  return (
    <ImageBackground
      source={
        cover_url
          ? { uri: `${cover_url}` }
          : require("../../assets/background.jpg")
      }
      resizeMode="cover"
      imageStyle={{
        opacity: 0.85,
      }}
      style={bgstyle}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        {coalitions ? (
          <Coalition
            coalition={coalitions}
            name={coalitions?.name}
            color={coalitions?.color}
            imageURL={coalitions?.image_url}
          />
        ) : (
          <View
            style={{
              width: 30,
              height: 50,
              backgroundColor: "#00babc",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="slash" size={23} color="white" />
          </View>
        )}
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: "white",
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            {name?.length <= 20 ? name : `${name.substring(0, 20)}...`}
          </Text>
          <Student color={coalitions?.color} staff={staff} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles= StyleSheet.create({
  container: {}
})
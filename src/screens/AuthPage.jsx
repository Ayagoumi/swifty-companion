import { View, Image, StyleSheet, ImageBackground } from "react-native";
import { useAuthRequest } from "expo-auth-session";
import { useEffect } from "react";
import {
  CLIENT_ID,
  CUSTOM_STATE,
  TOKEN_ENDPOINT,
  AUTHORIZATION_ENDPOINT,
} from "@env";
import { Button } from "react-native-elements";

const config = {
  authorizationEndpoint: `${AUTHORIZATION_ENDPOINT}`,
  tokenEndpoint: `${TOKEN_ENDPOINT}`,
};

export default function AuthPage({ navigation }) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: `${CLIENT_ID}`,
      scopes: ["public"],
      redirectUri: "com.ayagoumi.swifty-companion://callback",
      state: `${CUSTOM_STATE}`,
      responseType: "code",
    },
    config
  );

  useEffect(() => {
    if (
      response?.type === "success" &&
      response?.params?.state === `${CUSTOM_STATE}`
    ) {
      navigation.navigate("Home");
    }
  }, [response]);

  return (
    <ImageBackground
      source={require("../../assets/splash.jpg")}
      resizeMode="cover"
      imageStyle={{ opacity: 0.85 }}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={require("../../assets/42.png")} style={styles.logo} />
        <Button
          disabled={!request}
          title="Sign In"
          onPress={() => {
            promptAsync();
          }}
          buttonStyle={styles.connectButtonStyle}
          containerStyle={styles.connectContainerStyle}
          titleStyle={styles.connectTitleStyle}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 350,
    height: 200,
  },
  connectButtonStyle: {
    backgroundColor: "#00babc",
    borderRadius: 9,
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  connectContainerStyle: {
    marginVertical: 30,
  },
  connectTitleStyle: {
    color: "white",
    fontWeight: "bold",
  },
});

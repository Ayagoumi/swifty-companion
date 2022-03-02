import { View, Text, Button, SafeAreaView } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useEffect } from "react";
import { CLIENT_ID, CUSTOM_STATE } from "@env";
import Constants from "expo-constants";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const config = {
  authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
  tokenEndpoint: "https://api.intra.42.fr/oauth/v2/token",
};

export default function AuthPage({ navigation }) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: `${CLIENT_ID}`,
      scopes: ["public"],
      // redirectUri: "swifty-companion://callback",
      redirectUri: makeRedirectUri({
        uri: `swifty-companion://callback`,
      }),
      state: `${CUSTOM_STATE}`,
      responseType: "code",
    },
    config
  );

  useEffect(() => {
    console.log(Constants.manifest.scheme);
    if (
      response?.type === "success" &&
      response?.params?.state === `${CUSTOM_STATE}`
    ) {
      const { code } = response.params;
      // console.log(response);
    }
  }, [response]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFAF8",
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          disabled={!request}
          title="Login"
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { CLIENT_ID, CLIENT_SECRET } from "@env";

export default function App() {
  const [text, onChangeText] = useState("Search...");
  const TOKEN_ENDPOINT = "https://api.intra.42.fr/oauth/token";
  const USER_ENDPOINT = "https://api.intra.42.fr/v2/users/ayagoumi";
  const [token, setToken] = useState("");

  const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    });
    const data = await response.json();
    return data.access_token;
  };

  const getData = async () => {
    const response = await fetch(USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(async () => {
    const token = await getAccessToken();
    console.log(token);
    setToken(token);
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        onFocus={() => onChangeText("")}
        value={text}
        maxLength={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f00000",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
});

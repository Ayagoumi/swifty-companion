import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { CLIENT_ID, CLIENT_SECRET } from "@env";
import Icon from "react-native-vector-icons/FontAwesome";
import Navbar from "./src/components/Navbar";
import SearchBar from "./src/components/SearchBar";

export default function App() {
  const [text, onChangeText] = useState("Search...");
  const TOKEN_ENDPOINT = "https://api.intra.42.fr/oauth/token";
  const USER_ENDPOINT = "https://api.intra.42.fr/v2/users/ayagoumi";
  const [expires_in, setExpiresIn] = useState(0);
  const [created_at, setCreatedAt] = useState(0);
  const [token, setToken] = useState("");
  const [numb, setNumb] = useState(0);

  const getData = async () => {
    const response = await fetch(USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data.cursus_users);
  };

  useLayoutEffect(() => {
    fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.access_token);
        setCreatedAt(data.created_at);
        setExpiresIn(data.expires_in);
      })
      .catch((error) => {
        console.log(error);
      });
    // getData();
  }, []);

  const time = (Date.now() / 1000) - (created_at);
  useEffect(() => {
    if (time <= 0) {
      fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      })
        .then((response) => response.json())
        .then((data) => {
          setToken(data.access_token);
          setCreatedAt(data.created_at);
          setExpiresIn(data.expires_in);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [time]);

  // const [mintime, setMintime] = useState(0);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setMintime((Date.now() / 1000) - (created_at + expires_in));
  //   }, 1000);
  // }, [Date.now()]);

  useEffect(() => {
    setNumb(numb + 1);
  }, [token])

  return (
    <SafeAreaView style={styles.viewContainer}>
      <StatusBar />
      <View style={styles.container}>
        <Navbar />
        <SearchBar />
        <View style={styles.content}>
          <Text>token : {token}</Text>
          <Text>Number of changes : {numb}</Text>
          <Text>Expires in : {expires_in}</Text>
          <Text>Expires at : {created_at}</Text>
          <Text>Date Now : {Date.now() / 1000}</Text>
          {/* <Text>Time : {mintime}</Text> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "#f7f2f2",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f2f2",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  navbar: {
    backgroundColor: "#00ff00",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  input: {
    position: "relative",
    height: 55,
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingLeft: 30,
    paddingRight: 30,
  },
  searchBar: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
  },
  searchIcon: {
    position: "absolute",
    alignSelf: "center",
    left: 320,
    color: "#8a949e",
  },
  content: {
    backgroundColor: "#fff",
    width: "100%",
    height: 30,
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
  },
});

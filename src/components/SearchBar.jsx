import {
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { getUserInfo } from "../api/getUserInfos";

export default function SearchBar({ setLoading, loading, setStatus, setData, token, setToken }) {
  const [text, onChangeText] = useState("");
  const [oldValue, setOldValue] = useState("");

  const getUserData = (login) => {
    const getData = () => {
      getUserInfo(token, setToken, login)
        .then((res) => {
          setData(res);
          setStatus(200);
          setLoading(false);
        })
        .catch((err) => {
          setStatus(err);
          console.log(err);
          setLoading(false);
        });
    };
    if (login && login !== "") getData();
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", width: "75%" }}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            onFocus={() => {
              onChangeText("");
            }}
            placeholder="Search"
            autoCorrect={false}
            value={text}
            maxLength={30}
            submitAndClear="auto"
          />
        </View>
        <TouchableOpacity
          style={{ ...styles.searchButton, backgroundColor: (loading || text === oldValue) ? "#ccc" : "black" }}
          onPress={() => {
            if (text !== oldValue) {
              Keyboard.dismiss();
              getUserData(text);
              setLoading(true);
              setOldValue(text);
            }
          }}
          disabled={text === "" || loading === true || text === oldValue}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
  },
  input: {
    position: "relative",
    height: 50,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    fontSize: 17,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  searchButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: "black",
    marginLeft: 7,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    fontSize: 13,
  },
});

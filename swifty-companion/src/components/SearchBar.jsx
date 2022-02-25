import { Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SearchBar({ setLogin }) {
  const [text, onChangeText] = useState("");

  return (
    <View
      style={{
        width: "100%",
        // backgroundColor: "#ff0000",
        paddingVertical: 20,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", width: "75%" }}>
          <TextInput
            style={{
              position: "relative",
              height: 55,
              width: "100%",
              borderRadius: 15,
              backgroundColor: "#fff",
              paddingHorizontal: 30,
              fontSize: 17,
            }}
            onChangeText={onChangeText}
            onFocus={() => onChangeText("")}
            placeholder="Search"
            autoCorrect={false}
            value={text}
            maxLength={30}
          />
          {/* <Pressable
            style={{
              position: "absolute",
              alignSelf: "center",
              right: 30,
              // color: "#8a949e",
            }}
          >
            <Icon
              name="search"
              color="#000"
              size={20}
              style={{ color: "#8a949e" }}
            />
          </Pressable> */}
        </View>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 15,
            borderRadius: 15,
            backgroundColor: "black",
            marginLeft: 7,
          }}
          onPress={() => {
            setLogin(text);
          }}
        >
          <Text
            style={{
              fontSize: 16,
              lineHeight: 21,
              fontWeight: "bold",
              letterSpacing: 0.25,
              color: "white",
              fontSize: 13,
            }}
          >
            Search
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

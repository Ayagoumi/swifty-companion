import { Text, View, TextInput, Pressable, Keyboard } from "react-native";
import React, { useState } from "react";

export default function SearchBar({ getUserData, setLoading, loading }) {
  const [text, onChangeText] = useState("");

  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 20,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", width: "75%" }}>
          <TextInput
            style={{
              position: "relative",
              height: 50,
              width: "100%",
              borderRadius: 15,
              backgroundColor: "#fff",
              paddingHorizontal: 30,
              fontSize: 17,
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 15,
            }}
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
            Keyboard.dismiss();
            // console.log("clicked");
            getUserData(text);
            setLoading(true);
          }}
          disabled={text === "" || loading === true}
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

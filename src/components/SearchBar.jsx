import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SearchBar() {
  const [text, onChangeText] = useState("");

  return (
    <View style={styles.searchContainer}>
      <Text style={styles.searchText}>Search using username</Text>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          onFocus={() => onChangeText("")}
          placeholder="Search"
          // placeholderTextColor="#D50000"
          autoCorrect={false}
          value={text}
          maxLength={30}
        />
        <Icon name="search" color="#000" size={20} style={styles.searchIcon} />
      </View>
    </View>
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
    fontSize: 17,
  },
  searchBar: {
    flexDirection: "row",
  },
  searchIcon: {
    position: "absolute",
    alignSelf: "center",
    right: 30,
    color: "#8a949e",
  },
  searchText: {
    fontSize: 20,
    fontWeight: "700",
  },
});

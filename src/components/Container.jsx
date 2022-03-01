import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Dimensions,
} from "react-native";

const windowHeight = Dimensions.get("window").height;

export default function Container({ children }) {
  const [screenHeight, setScreenHeight] = useState(0);

  onContentSizeChange = (contentWidth, contentHeight) => {
    setScreenHeight(contentHeight);
  };

  const scrollEnabled = screenHeight > windowHeight;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFAF8",
      }}
    >
      <ScrollView
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}
        style={{
          paddingHorizontal: 20,
          flex: 1,
          marginTop: 20,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

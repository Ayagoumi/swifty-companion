import { useState } from "react";
import { ScrollView, SafeAreaView, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const windowHeight = Dimensions.get("window").height;

export default function Container({ children }) {
  const [screenHeight, setScreenHeight] = useState(0);

  onContentSizeChange = (contentWidth, contentHeight) => {
    setScreenHeight(contentHeight);
  };

  const insets = useSafeAreaInsets();
  let scrollEnabled = screenHeight > windowHeight - insets.top - insets.bottom;

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

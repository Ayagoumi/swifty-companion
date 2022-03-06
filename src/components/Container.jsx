import { useState } from "react";
import { ScrollView, SafeAreaView, Dimensions, StyleSheet } from "react-native";
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAF8",
  },
  scrollView: {
    paddingHorizontal: 20,
    flex: 1,
    marginTop: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

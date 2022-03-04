import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./src/components/Home";
import ModalScreen from "./src/components/ModalScreen";
import AuthPage from "./src/components/AuthPage";

const RootStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        style={{ textColor: "black" }}
      />
      <RootStack.Navigator>
        <RootStack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <RootStack.Screen name="Home" component={HomeScreen} />
        </RootStack.Group>
        <RootStack.Group
          screenOptions={{
            presentation: "modal",
            gestureEnabled: true,
            headerBackTitleVisible: false,
            headerTitle: "",
            hideNavigationBar: false,
            gestureEnabled: true,
            headerShadowVisible: false,
            // headerStyle: { shadowOffset: { width: 0, height: 0 } },
          }}
        >
          <RootStack.Screen name="MyModal" component={ModalScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;

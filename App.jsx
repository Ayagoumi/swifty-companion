import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./src/components/Home";

function ModalScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff0000",
      }}
    >
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const RootStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor="black"
        barStyle="light-content"
        showHideTransition="slide"
        hidden={false}
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
            headerShown: false,
          }}
        >
          <RootStack.Screen name="MyModal" component={ModalScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;

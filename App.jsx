import { useState, useEffect } from "react";
import { View, Text, Button, SafeAreaView, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import Navbar from "./src/components/Navbar";
import SearchBar from "./src/components/SearchBar";
import { getUserInfo } from "./src/api/getUserInfos";

function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState("");

  useEffect(() => {
    const getData = () => {
      getUserInfo(login.toLowerCase())
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (login && login !== "") getData();
  }, [login]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#FFFAF8",
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          paddingHorizontal: 20,
          flex: 1,
        }}
      >
        <Navbar />
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30 }}>Swifty Compation</Text>
          <Text style={{ fontSize: 20 }}>&nbsp;&nbsp;using login</Text>
        </View>
        <SearchBar style="auto" setLogin={setLogin} />
        <View
          style={{
            marginBottom: 25,
            alignItems: "center",
            flex: 1,
            backgroundColor: "white",
            width: "100%",
            borderRadius: 15,
            shadowColor: "rgb(0 0 0 / 0.25)",
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 15,
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
}

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

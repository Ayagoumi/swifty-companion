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
  const [clicked, setClicked] = useState(false);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = () => {
      getUserInfo(login.toLowerCase())
        .then((res) => {
          setData(res);
          setStatus(res.status);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setStatus(err);
          setLoading(false);
        });
    };
    if (login && login !== "") getData();
    else setLoading(true);
  }, [login]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#f7f2f2",
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
        <SearchBar
          style="auto"
          setLogin={setLogin}
          clicked={clicked}
          setClicked={setClicked}
        />
        <View
          style={{
            marginBottom: 25,
            alignItems: "center",
            flex: 1,
            backgroundColor: "white",
            width: "100%",
            borderRadius: 15,
          }}
        >
          {/* {data && status === 200 ? (
            <Text>Found</Text>
          ) : status !== 200 ? (
            <Text>Not Found</Text>
          ) : <Text>Loading</Text>} */}
        </View>
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

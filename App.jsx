import { useState, useEffect } from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import Navbar from "./src/components/Navbar";
import SearchBar from "./src/components/SearchBar";
import { getUserInfo } from "./src/api/getUserInfos";
import {AccessToken} from "./src/api/getUserInfos";

function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState("");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(null);

  // get Access token and expires in variables
  const [token, setToken] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    const accessToken = () => AccessToken().then((res) => {
      setToken(res.access_token);
      setTime(res.expires_in);
    });
    accessToken();
  }, []);
  // end of that

  const getUserData = (login) => {
    const getData = () => {
      getUserInfo(token, time, login)
        .then((res) => {
          setData(res);
          setStatus(200);
          setLoading(false);
        })
        .catch((err) => {
          setStatus(err);
          console.log(err);
          setLoading(false);
        });
    };
    if (login && login !== "") getData();
  };

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
        <SearchBar
          style="auto"
          setLogin={setLogin}
          getUserData={getUserData}
          setLoading={setLoading}
        />
        <View
          style={{
            marginBottom: 25,
            alignItems: "center",
            flex: 1,
            backgroundColor: "white",
            width: "100%",
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
            minHeight: 500,
          }}
        >
          {loading === true ? (
            <Text>loading ...</Text>
          ) : status === 200 ? (
            <Text style={{ fontSize: 20 }}> Found </Text>
          ) : (
            status !== 0 && <Text style={{ fontSize: 20 }}> No data found</Text>
          )}
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

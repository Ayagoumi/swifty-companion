import { useState, useLayoutEffect } from "react";
import { View, Text, Button, SafeAreaView, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import Navbar from "./src/components/Navbar";
import SearchBar from "./src/components/SearchBar";
import UserCard from "./src/components/UserCard";
import { getUserInfos } from "./src/api/getUserInfos";
import { getUserCoalation } from "./src/api/getUserCoalation";
import { SvgCssUri } from "react-native-svg";
import Moment from "moment";

function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [coalation, setCoalation] = useState(null);

  const getData = async () => {
    const response = await getUserInfos();
    setData(response?.cursus_users[2]);
    setUserData(response?.cursus_users[2]?.user);
  };

  const getCoalation = async () => {
    const response = await getUserCoalation(userData?.id);
    setCoalation(response[0]);
    // console.log(response[0]);
  };

  useLayoutEffect(() => {
    getData();
    getCoalation();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f7f2f2",
      }}
    >
      <Navbar />
      <SearchBar style="auto" />
      <View
        style={{
          backgroundColor: "#ececec",
          width: "100%",
          flex: 1,
          marginTop: 15,
          borderRadius: 15,
          padding: 15,
        }}
      >
        {data && userData && coalation && (
          <UserCard navigation={navigation}>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 25,
                alignItems: "center",
              }}
            >
              <SvgCssUri
                style={{ backgroundColor: coalation["color"] }}
                width="30px"
                height="50px"
                uri={coalation.image_url}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: coalation["color"],
                  fontSize: 16,
                  paddingTop: 6,
                  marginLeft: 5,
                }}
              >
                {coalation?.name}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {userData["staff?"] === false ? (
                <View
                  style={{
                    backgroundColor: coalation["color"],
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    STUDENT
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: "#E05757",
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    STAFF
                  </Text>
                </View>
              )}
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {userData.login}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                flex: 1,
                justifyContent: "space-evenly",
              }}
            >
              <Text style={{ fontSize: 23, fontWeight: "bold" }}>
                {userData?.displayname}
              </Text>
              <Image
                style={{ width: 110, height: 110, borderRadius: 100 }}
                source={{
                  uri: userData?.image_url,
                }}
              />
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "800",
                      color: coalation["color"],
                    }}
                  >
                    Wallet
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      marginTop: 5,
                    }}
                  >
                    {userData?.wallet}
                  </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "800",
                      color: coalation["color"],
                    }}
                  >
                    Evaluation points
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      marginTop: 5,
                    }}
                  >
                    {userData?.correction_point}
                  </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "800",
                      color: coalation["color"],
                    }}
                  >
                    Grade
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      marginTop: 5,
                    }}
                  >
                    {data?.grade}
                  </Text>
                </View>
              </View>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {userData?.email}
              </Text>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                {userData?.Loaction ? (
                  <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                    available
                  </Text>
                ) : (
                  <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                    unavailable
                  </Text>
                )}
                {userData?.Loaction ? (
                  <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                    {userData?.Location}
                  </Text>
                ) : (
                  <Text style={{ fontWeight: "bold", fontSize: 25 }}>-</Text>
                )}
              </View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                {Moment(userData?.anonymize_date).format("YYYY-MM-DD")}
              </Text>
            </View>
          </UserCard>
        )}
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

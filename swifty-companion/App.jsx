import { useState, useEffect } from "react";
import { View, Text, Button, SafeAreaView, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import Navbar from "./src/components/Navbar";
import SearchBar from "./src/components/SearchBar";
import UserCard from "./src/components/UserCard";
import { getUserInfos, getUserInfo } from "./src/api/getUserInfos";
import { getUserCoalation } from "./src/api/getUserCoalation";
import { SvgCssUri } from "react-native-svg";
import Moment from "moment";

function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [coalation, setCoalation] = useState(null);
  const [login, setLogin] = useState("");
  const [clicked, setClicked] = useState(false);

  const getData = async () => {
    getUserInfo(login.toLowerCase())
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // if (response) {
    //   const index = response?.cursus_users.length - 1;
    //   setData(response?.cursus_users[index]);
    //   const res = await getUserCoalation(
    //     response?.cursus_users[index]?.user?.id
    //   );
    //   if (res) setCoalation(res[0]);
    // } else {
    //   setData(null);
    //   setCoalation(null);
    // }
  };

  const clearDataStates = () => {
    setData(null);
    setCoalation(null);
  };

  useEffect(() => {
    getData();
  }, [login]);

  const [index, setIndex] = useState(0);
  useEffect(() => {
    console.log(`-------------------------------------------Data ${index}------------------------------------------`)
    console.log("data", data);
    console.log(`-------------------------------------------Data ${index}------------------------------------------`)
    setIndex(index + 1);
  }, [data]);


  // let level = data?.level.toString();
  // level = level?.split(".")[1];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f7f2f2",
      }}
    >
      <Navbar />
      <SearchBar
        style="auto"
        setLogin={setLogin}
        clicked={clicked}
        setClicked={setClicked}
      />
      {/* <View
        style={{
          backgroundColor: "#ececec",
          width: "100%",
          flex: 1,
          marginTop: 15,
          borderRadius: 15,
          padding: 15,
        }}
      >
        {clicked ? (
          data &&
          data.user &&
          coalation && (
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
                  fill="#fff"
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
                {data.user["staff?"] === false ? (
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
                  {data.user.login}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text style={{ fontSize: 23, fontWeight: "bold" }}>
                  {data.user?.displayname}
                </Text>
                <Image
                  style={{ width: 110, height: 110, borderRadius: 100 }}
                  source={{
                    uri: data.user?.image_url,
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
                      {data.user?.wallet}
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
                      {data.user?.correction_point}
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
                  {data.user?.email}
                </Text>
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  {data.user?.location ? (
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                      Available
                    </Text>
                  ) : (
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                      unavailable
                    </Text>
                  )}
                  {data.user?.location ? (
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                      {data.user?.location}
                    </Text>
                  ) : (
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>-</Text>
                  )}
                </View>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                  {Moment(data.user?.anonymize_date).format("YYYY-MM-DD")}
                </Text>
                <View
                  style={{
                    width: "100%",
                    height: 45,
                    backgroundColor: "rgba(32, 32, 38, 0.75)",
                    borderRadius: 10,
                    position: "relative",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: `${level}%`,
                      backgroundColor: coalation["color"],
                      height: "100%",
                      borderBottomLeftRadius: 10,
                      borderTopLeftRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Text
                    style={{
                      position: "absolute",
                      width: "100%",
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    level {data?.level} %
                  </Text>
                </View>
              </View>
            </UserCard>
          )
        ) : (
          <Text onLoad={() => clearDataStates()}>null</Text>
        )}
      </View> */}
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

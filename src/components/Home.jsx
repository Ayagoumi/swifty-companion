import { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { getUserInfo } from "../api/getUserInfos";
import { AccessToken } from "../api/getUserInfos";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(null);

  // get Access token and expires in variables
  const [token, setToken] = useState(null);

  useEffect(() => {
    const accessToken = () =>
      AccessToken().then((res) => {
        setToken(res.access_token);
      });
    accessToken();
  }, []);
  // end of that

  const getUserData = (login) => {
    const getData = () => {
      getUserInfo(token, login)
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
          getUserData={getUserData}
          setLoading={setLoading}
          loading={loading}
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

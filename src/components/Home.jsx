import { Campus } from "./Campus";
import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { getUserInfo } from "../api/getUserInfos";
import { AccessToken } from "../api/getUserInfos";
import Container from "./Container";
import DataText from "./DataText";
import Moment from "moment";
import CoalationView from "./CoalationView";
import UserAvatar from "react-native-user-avatar";

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

  let level =
    data?.cursus_users[data?.cursus_users.length - 1]?.level?.toString();
  level = level?.split(".")[1];

  return (
    <Container>
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
          height: "100%",
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          // minHeight: 500,
        }}
      >
        {loading === true ? (
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large" />
            <Text>Loading...</Text>
          </View>
        ) : status === 200 ? (
          <View style={{ width: "100%", flex: 1 }}>
            {data && (
              <View style={{ flex: 1 }}>
                <CoalationView
                  coalitions={data?.coalitions[0]}
                  cover_url={data?.coalitions[0]?.cover_url}
                  name={data?.name}
                  staff={data?.staff}
                />
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <UserAvatar
                    size={100}
                    name={data?.name}
                    src={data?.image_url}
                    style={{ width: 100, height: 100, marginTop: 15 }}
                    bgColor="white"
                    textColor="white"
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    paddingVertical: 15,
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(32,32,38,0.75)",
                      width: "85%",
                      borderRadius: 12,
                      paddingVertical: 30,
                      paddingHorizontal: 15,
                      marginBottom: 10,
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <DataText
                      dataName={data?.wallet + " ₳"}
                      text="Wallet"
                      color={data?.coalitions[0]?.color}
                    />
                    <DataText
                      dataName={data?.correction_points}
                      text="Evaluation points"
                      color={data?.coalitions[0]?.color}
                    />
                    {data?.cursus_users[data?.cursus_users.length - 1]?.cursus
                      ?.name && (
                      <DataText
                        dataName={
                          data?.cursus_users[data?.cursus_users.length - 1]
                            ?.cursus?.name
                        }
                        text="Cursus"
                        color={data?.coalitions[0]?.color}
                      />
                    )}
                    {data?.cursus_users[data?.cursus_users.length - 1]
                      ?.grade && (
                      <DataText
                        dataName={
                          data?.cursus_users[data?.cursus_users.length - 1]
                            ?.grade
                        }
                        text="Grade"
                        color={data?.coalitions[0]?.color}
                      />
                    )}
                    {data.anonymize_date && (
                      <DataText
                        dataName={Moment(data.anonymize_date).format(
                          "DD-MM-YYYY"
                        )}
                        text="ETEC"
                        color={data?.coalitions[0]?.color}
                      />
                    )}
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "white",
                          fontWeight: "700",
                          color: data?.coalitions[0]?.color
                            ? data.coalitions[0]?.color
                            : "#00babc",
                          paddingBottom: 10,
                        }}
                      >
                        {data?.email}
                      </Text>
                      <Campus campus={data?.campus} />
                      <Text
                        style={{
                          fontSize: 25,
                          color: "white",
                          fontWeight: "700",
                        }}
                      >
                        {data.location ? "Available" : "Unavailable"}
                      </Text>
                      <Text
                        style={{
                          fontSize: 25,
                          color: "white",
                          fontWeight: "500",
                        }}
                      >
                        {data.location ? data.location : "-"}
                      </Text>
                    </View>
                  </View>
                  {data.staff === false && (
                    <View
                      style={{
                        width: "85%",
                        height: 50,
                        justifyContent: "center",
                        backgroundColor: "rgba(32,32,38,0.75)",
                        borderRadius: 12,
                      }}
                    >
                      <View
                        style={{
                          width: `${level}%`,
                          backgroundColor: data?.coalitions[0]?.color,
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
                        {data?.cursus_users[data?.cursus_users.length - 1]
                          ?.level
                          ? data?.cursus_users[data?.cursus_users.length - 1]
                              ?.level
                          : 0}
                        &nbsp;%
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        ) : (
          status !== 0 && <Text style={{ fontSize: 20 }}> No data found</Text>
        )}
      </View>
    </Container>
  );
}

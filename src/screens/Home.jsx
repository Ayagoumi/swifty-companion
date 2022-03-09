import { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { AccessToken } from "../api/getUserInfos";
import Container from "../components/Container";
import DataText from "../components/DataText";
import Moment from "moment";
import Avatar from "../components/Avatar";
import Campus from "../components/Campus";
import CoalationView from "../components/CoalationView";
import Icon from "react-native-vector-icons/Feather";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(null);

  // get Access token at component mount
  const [token, setToken] = useState(null);

  useEffect(() => {
    const accessToken = () =>
      AccessToken().then((res) => {
        setToken(res.access_token);
      });
    accessToken();
  }, []);
  // end of that

  // get the last 2 digits of the level percents
  let level = data?.cursus_users[0]?.level
    ?.toString()
    .split(".")[1];

  return (
    <Container>
      <Navbar />
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>Swifty Compation</Text>
      </View>
      <SearchBar
        style="auto"
        setLoading={setLoading}
        loading={loading}
        setStatus={setStatus}
        setData={setData}
        token={token}
        setToken={setToken}
      />
      <View style={styles.container}>
        {loading === true ? (
          <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator size="large" />
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
                  bgstyle={styles?.bgstyle}
                />
                <View style={styles.imageContainer}>
                  <Avatar
                    name={data?.name}
                    image_url={data?.image_url}
                    data={data}
                  />
                  <TouchableOpacity
                    style={styles.openModalButton}
                    onPress={() =>
                      navigation.navigate({
                        name: "MyModal",
                        params: {
                          userData: data,
                          coalitions: data?.coalitions,
                        },
                        merge: true,
                      })
                    }
                  >
                    <Icon name="grid" size={22} color="#919191" />
                  </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                  <View style={styles.details}>
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
                    {data?.cursus_users[0]?.cursus
                      ?.name && (
                      <DataText
                        dataName={
                          data?.cursus_users[0]
                            ?.cursus?.name
                        }
                        text="Cursus"
                        color={data?.coalitions[0]?.color}
                      />
                    )}
                    {data?.cursus_users[0]
                      ?.grade && (
                      <DataText
                        dataName={
                          data?.cursus_users[0]
                            ?.grade
                        }
                        text="Grade"
                        color={data?.coalitions[0]?.color}
                      />
                    )}
                    {data?.anonymize_date && (
                      <DataText
                        dataName={Moment(data?.anonymize_date).format(
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
                            ? data?.coalitions[0]?.color
                            : "#00babc",
                          paddingBottom: 10,
                        }}
                      >
                        {data?.email}
                      </Text>
                      <Campus campus={data?.campus} />
                      <Text style={styles.availabilityText}>
                        {data?.location ? "Available" : "Unavailable"}
                      </Text>
                      <Text style={styles.locationText}>
                        {data?.location ? data?.location : "-"}
                      </Text>
                    </View>
                  </View>
                  {data?.staff === false && (
                    <View style={styles.levelContainer}>
                      <View
                        style={{
                          width: `${level}%`,
                          backgroundColor: data?.coalitions[0]?.color,
                          height: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      ></View>
                      <Text style={styles.levelText}>
                        {data?.cursus_users[0]
                          ?.level
                          ? data?.cursus_users[
                              0
                            ]?.level.toFixed(2)
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
          status !== 0 && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Icon name="frown" size={70} />
              <Text style={{ fontSize: 30 }}>No User Found</Text>
            </View>
          )
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  openModalButton: {
    position: "absolute",
    right: 30,
    top: 10,
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 15,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgstyle: {
    height: 110,
    justifyContent: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  detailsContainer: {
    alignItems: "center",
    paddingVertical: 15,
    flex: 1,
    justifyContent: "space-between",
  },
  details: {
    backgroundColor: "rgba(32,32,38,0.75)",
    width: "85%",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  levelContainer: {
    width: "85%",
    height: 50,
    justifyContent: "center",
    backgroundColor: "rgba(32,32,38,0.75)",
    borderRadius: 12,
    overflow: "hidden",
  },
  levelText: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 25,
    color: "white",
    fontWeight: "500",
  },
  availabilityText: {
    fontSize: 25,
    color: "white",
    fontWeight: "700",
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

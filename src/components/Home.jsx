import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { getUserInfo } from "../api/getUserInfos";
import { AccessToken } from "../api/getUserInfos";
import Container from "./Container";
import UserCard from "./UserCard";
import { SvgCssUri } from "react-native-svg";
import Coalition from "./Coalition";
import Icon from "react-native-vector-icons/Feather";
import DataText from "./DataText";
import Moment from "moment";

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

  let level = data?.cursus_users[0]?.level?.toString();
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
          minHeight: 500,
        }}
      >
        {loading === true ? (
          <Text style={{ fontSize: 20 }}>loading ...</Text>
        ) : status === 200 ? (
          <View style={{width: "100%", flex: 1}}>
            {data && (
              <View style={{flex: 1,}}>
                <ImageBackground source={data?.coalitions[0]?.cover_url ? {uri: `${data?.coalitions[0]?.cover_url}`} : require("../../assets/background.jpg")} resizeMode="cover" imageStyle= {{opacity:0.85}} style={{height: 110, justifyContent: "center", borderTopLeftRadius: 12, borderTopRightRadius: 12, overflow: "hidden",}}>
                  <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", paddingHorizontal: 20,}}>
                    {data.coalitions[0] ? (
                      <Coalition
                      coalition={data?.coalitions[0]}
                      name={data?.coalitions[0]?.name}
                      color={data?.coalitions[0]?.color}
                      imageURL={data?.coalitions[0]?.image_url}
                      />
                    ): (<View style={{width:30, height:50, backgroundColor: "#00babc", justifyContent: "center", alignItems: "center",}}>
                      <Icon name="zap" size={23} color="white" />
                    </View>)}
                    <Text numberOfLines={1} style={{color: "white", fontWeight: "bold"}}>
                      <Text style={{fontSize: 12}}>{data.login}&nbsp;&nbsp;</Text>
                      {data.name.length < 18 ? data.name : `${data.name.substring(0, 18)}...`}
                    </Text>
                  </View>
                </ImageBackground>
                <View style={{alignItems: "center", paddingVertical: 30, justifyContent: "space-between", flex: 1}}>
                  <View style={{backgroundColor: "rgba(32,32,38,0.75)", width: "85%", borderRadius: 12, paddingVertical: 30, paddingHorizontal: 15}}>
                    <DataText dataName={data?.name} text="Wallet" color={data?.coalitions[0]?.color} />
                    <DataText dataName={data?.correction_points} text="Evaluation points" color={data?.coalitions[0]?.color} />
                    <DataText dataName={data?.cursus_users ? data?.cursus_users[0]?.cursus?.name : "Novice"} text="Cursus" color={data?.coalitions[0]?.color} />
                    <DataText dataName={data?.cursus ? data?.cursus : "Novice"} text="Grade" color={data?.coalitions[0]?.color} />
                    {data.anonymize_date && <DataText dataName={Moment(data.anonymize_date).format("DD-MM-YYYY")} text="ETEC" color={data?.coalitions[0]?.color} />}
                  </View>
                  <View style={{width: "85%", height: 110, justifyContent: "center", backgroundColor: "rgba(32,32,38,0.75)", borderRadius: 12}}>
                    <View style={{alignItems: "center"}}>
                      <Text style={{fontSize: 25, color: "white", fontWeight: "700" }}>{data.location ? "Available" : "Unavailable"}</Text>
                      <Text style={{fontSize: 25, color: "white", fontWeight: "500" }}>{data.location ? data.location : "-"}</Text>
                    </View>
                  </View>
                  <View style={{width: "85%", height: 50, justifyContent: "center", backgroundColor: "rgba(32,32,38,0.75)", borderRadius: 12}}>
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
                      {data?.cursus_users[0]?.level} %
                    </Text>
                  </View>
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

    function TextData({data, coalitions, color}) {
      return (<View style={{
  flexDirection: "row",
  justifyContent: "space-between"
}}>
                    <Text style={{
    fontSize: 15,
    fontWeight: "bold",
    color: data?.coalitions[0]?.color ? data?.coalitions[0]?.color : "#00babc"
  }}>Wallet</Text>
                    <Text style={{
    fontSize: 15,
    fontWeight: "bold",
    color: "white"
  }}>{data.name}</Text>
                  </View>);
    }
  
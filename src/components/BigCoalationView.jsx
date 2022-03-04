import { View, Text, ImageBackground } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useState, useEffect } from "react";
import axios from "axios";
import DataText from "./DataText";
import Moment from "moment";

export default function BigCoalationView({
  coalitions,
  cover_url,
  name,
  login,
  image_url,
  bgstyle,
  data,
}) {
  const [imageStatus, setImageStatus] = useState(404);

  useEffect(() => {
    if (image_url) {
      axios
        .get(image_url)
        .then((res) => {
          if (res.status === 200) {
            setImageStatus(200);
          }
        })
        .catch((err) => {
          setImageStatus(err.response.status);
        });
    }
  }, [data]);

  return (
    <ImageBackground
      source={
        cover_url
          ? { uri: `${cover_url}` }
          : require("../../assets/background.jpg")
      }
      resizeMode="cover"
      imageStyle={{
        opacity: 0.85,
      }}
      style={bgstyle}
    >
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 25,
          paddingVertical: 10,
          backgroundColor: "rgba(32,32,38,0.75)",
          borderRadius: 12,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            textTransform: "capitalize",
          }}
        >
          {login}
        </Text>
        <View
          style={{
            backgroundColor: coalitions?.color ? coalitions?.color : "#00babc",
            width: 43,
            height: 43,
            borderRadius: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserAvatar
            size={40}
            name={name}
            src={
              imageStatus === 200
                ? image_url
                : "https://cdn.intra.42.fr/users/default.png"
            }
            style={{ width: 40, height: 40 }}
            bgColor="white"
            textColor="white"
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 25,
          paddingVertical: 10,
          backgroundColor: "rgba(32,32,38,0.75)",
          borderRadius: 12,
          flex: 1,
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
        {data?.cursus_users[data?.cursus_users.length - 1]?.cursus?.name && (
          <DataText
            dataName={
              data?.cursus_users[data?.cursus_users.length - 1]?.cursus?.name
            }
            text="Cursus"
            color={data?.coalitions[0]?.color}
          />
        )}
        {data?.cursus_users[data?.cursus_users.length - 1]?.grade && (
          <DataText
            dataName={data?.cursus_users[data?.cursus_users.length - 1]?.grade}
            text="Grade"
            color={data?.coalitions[0]?.color}
          />
        )}
        {data.anonymize_date && (
          <DataText
            dataName={Moment(data.anonymize_date).format("DD-MM-YYYY")}
            text="ETEC"
            color={data?.coalitions[0]?.color}
          />
        )}
      </View>
    </ImageBackground>
  );
}

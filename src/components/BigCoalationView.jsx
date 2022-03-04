import { View, Text, ImageBackground } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useState, useEffect } from "react";
import axios from "axios";
import DataText from "./DataText";
import Moment from "moment";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/Feather";

export default function BigCoalationView({
  cover_url,
  coalitions,
  bgstyle,
  data,
  setProjects,
  setLoading,
}) {
  const [imageStatus, setImageStatus] = useState(404);
  const [items, setItems] = useState([]);
  const [cursusId, setCursusId] = useState(0);
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState(0);
  const name = data?.name;
  const staff = data?.staff;
  const image_url = data?.image_url;
  const login = data?.login;
  const Bgcolor = data?.coalitions[selected]?.color
    ? data?.coalitions[selected]?.color
    : "#00babc";

  const cursus = () => {
    const tab = [];

    if (data?.cursus_users) {
      data?.cursus_users?.map((cursus) => {
        tab.push(cursus?.cursus?.name);
      });
    }
    return tab;
  };

  useEffect(() => {
    if (data) {
      setItems(cursus());
    }
  }, []);

  useEffect(() => {
    if (items.length >= 0) {
      setSelected(items?.length - 1);
      setCursusId(data?.cursus_users[items.length - 1]?.cursus.id);
    }
  }, [items]);

  useEffect(() => {
    setCursusId(data?.cursus_users[selected]?.cursus.id);
    setLoading(false);
    setLevel(
      data?.cursus_users[selected]?.level?.toFixed(2).toString().split(".")[1]
    );
  }, [selected]);

  useEffect(() => {
    const filtered = data?.projects_users?.filter(
      (obj) =>
        obj?.cursus_ids?.includes(cursusId) && obj?.project?.parent_id === null
    );
    setProjects(filtered);
    setLoading(true);
  }, [cursusId]);

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
      {LoginPhotoBanner(login, Bgcolor, name, imageStatus, image_url)}
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
          color={data?.coalitions[selected]?.color}
        />
        <DataText
          dataName={data?.correction_points}
          text="Evaluation points"
          color={data?.coalitions[selected]?.color}
        />
        {items.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 10,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: Bgcolor,
              }}
            >
              Cursus
            </Text>
            <SelectDropdown
              data={items}
              defaultValue={items[items.length - 1]}
              renderDropdownIcon={() => (
                <Icon name="chevron-down" size={18} color="white" />
              )}
              dropdownIconPosition="right"
              onSelect={(selectedItem, index) => {
                setSelected(index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              dropdownStyle={{
                borderRadius: 12,
                backgroundColor: "rgba(32,32,38,0.35)",
              }}
              buttonStyle={{
                width: "50%",
                backgroundColor: "transparent",
                margingVertical: 0,
                margingVertical: 0,
                paddingVertical: 0,
                paddingHorizontal: 0,
                height: 20,
                maxWidth: "50%",
              }}
              buttonTextStyle={{
                fontSize: 15,
                fontWeight: "bold",
                color: "white",
              }}
              // dropdownOverlayColor="transparent"
              rowStyle={{
                borderBottomColor: "transparent",
                borderBottomWidth: 0,
              }}
              rowTextStyle={{
                fontSize: 15,
                fontWeight: "bold",
                color: "white",
              }}
            />
          </View>
        )}
        {data?.cursus_users[selected]?.grade ? (
          <DataText
            dataName={data?.cursus_users[selected]?.grade}
            text="Grade"
            color={data?.coalitions[selected]?.color}
          />
        ) : (
          <DataText
            dataName="Novice"
            text="Grade"
            color={data?.coalitions[selected]?.color}
          />
        )}
        {data.anonymize_date && (
          <DataText
            dataName={Moment(data.anonymize_date).format("DD-MM-YYYY")}
            text="ETEC"
            color={data?.coalitions[selected]?.color}
          />
        )}
      </View>
      {data.staff === false && LevelComponent(level, Bgcolor, data, selected)}
    </ImageBackground>
  );
}
function LevelComponent(level, Bgcolor, data, selected) {
  return (
    <View
      style={{
        width: "100%",
        height: 50,
        justifyContent: "center",
        backgroundColor: "rgba(32,32,38,0.75)",
        borderRadius: 12,
        marginTop: 15,
      }}
    >
      <View
        style={{
          width: `${level}%`,
          backgroundColor: Bgcolor,
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
        {data?.cursus_users[selected]?.level
          ? data?.cursus_users[selected]?.level
          : 0}
        &nbsp;%
      </Text>
    </View>
  );
}

function LoginPhotoBanner(login, Bgcolor, name, imageStatus, image_url) {
  return (
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
          backgroundColor: Bgcolor,
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
  );
}

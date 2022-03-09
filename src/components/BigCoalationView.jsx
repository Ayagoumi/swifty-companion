import { ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import Moment from "moment";
import LevelComponent from "./LevelComponent";
import LoginPhotoBanner from "./LoginPhotoBanner";
import DataLevel from "./DataLevel";

export default function BigCoalationView({
  cover_url,
  bgstyle,
  data,
  setProjects,
  setLoading,
  selected,
  setSelected,
}) {
  const [imageStatus, setImageStatus] = useState(404);
  const [items, setItems] = useState([]);
  const [cursusId, setCursusId] = useState(0);
  const [level, setLevel] = useState(0);
  const [remaining, setRemaining] = useState(-1);
  const name = data?.name;
  const staff = data?.staff;
  const image_url = data?.image_url;
  const login = data?.login;
  const Bgcolor = data?.coalitions[selected]?.color
    ? data?.coalitions[selected]?.color
    : data?.coalitions[0]?.color
    ? data?.coalitions[0]?.color
    : "#00babc";

  const remainingDays = () => {
    if (data) {
      const blackholed_at = Moment(
        data?.cursus_users[0]?.blackholed_at
      );
      const today = Moment.now();
      return blackholed_at?.diff(today, "days");
    }
  };

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
      setRemaining(remainingDays());
    }
  }, []);

  useEffect(() => {
    if (items.length >= 0) {
      setSelected(0);
      setCursusId(data?.cursus_users[0]?.cursus.id);
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
      <LoginPhotoBanner
        login={login}
        Bgcolor={Bgcolor}
        name={name}
        imageStatus={imageStatus}
        image_url={image_url}
        staff={staff}
      />
      <DataLevel
        data={data}
        selected={selected}
        items={items}
        Bgcolor={Bgcolor}
        setSelected={setSelected}
        remaining={remaining}
      />
      {data?.staff === false && (
        <LevelComponent
          level={level}
          Bgcolor={Bgcolor}
          data={data}
          selected={selected}
        />
      )}
    </ImageBackground>
  );
}

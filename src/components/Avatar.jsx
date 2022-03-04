import { useEffect, useState } from "react";
import axios from "axios";
import UserAvatar from "react-native-user-avatar";

export default function Avatar({ data, name, image_url }) {
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
    <UserAvatar
      size={100}
      name={name}
      src={
        imageStatus === 200 && image_url
          ? image_url
          : "https://cdn.intra.42.fr/users/default.png"
      }
      style={{
        width: 100,
        height: 100,
        marginTop: 15,
      }}
      bgColor="white"
      textColor="white"
    />
  );
}

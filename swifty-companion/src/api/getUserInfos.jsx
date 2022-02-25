import { AccessToken } from "./access_token";
import { USER_ENDPOINT } from "@env";
import axios from "axios";

export const getUserInfos = async (login) => {
  if (login) {
    let res = await AccessToken();
    if (res.expires_in <= 0) {
      res = await AccessToken();
    }
    const response = await axios.get(`${USER_ENDPOINT}${login}`, {
      headers: {
        content: "application/json",
        Authorization: `Bearer ${res.access_token}`,
      },
    });

    return response.data;
  }
  else
    return null;
};

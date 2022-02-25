import { AccessToken } from "./access_token";
import { USER_ENDPOINT } from "@env";

export const getUserInfos = async (login) => {
  let res = await AccessToken();
  if (res.expires_in <= 0) {
    res = await AccessToken();
  }

  const response = await fetch(`${USER_ENDPOINT}ayagoumi`, {
    headers: {
      Authorization: `${res.token_type} ${res.access_token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
  return response;
};

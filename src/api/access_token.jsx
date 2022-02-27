import { TOKEN_ENDPOINT, CLIENT_ID, CLIENT_SECRET } from "@env";
import axios from "axios";

export const AccessToken = async () => {
  const res = await axios.post(`${TOKEN_ENDPOINT}`, {
    "Content-Type": "application/x-www-form-urlencoded",
    grant_type: "client_credentials",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });
  return res.data;
};

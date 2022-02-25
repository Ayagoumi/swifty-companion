import { TOKEN_ENDPOINT, CLIENT_ID, CLIENT_SECRET } from "@env";

export const AccessToken = async () => {
  const response = await fetch(`${TOKEN_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  return response;
};

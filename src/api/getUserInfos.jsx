// import { AccessToken } from "./access_token";
import { USER_ENDPOINT } from "@env";
import { TOKEN_ENDPOINT, CLIENT_ID, CLIENT_SECRET } from "@env";
import axios from "axios";

export const AccessToken = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${TOKEN_ENDPOINT}`, {
        "Content-Type": "application/x-www-form-urlencoded",
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      })
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.status);
      });
  });
};

export const userCoalition = (id) => {
  return new Promise((resolve, reject) => {
    AccessToken()
      .then((res) => {
        axios
          .get(`${USER_ENDPOINT}${id}/coalitions`, {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
            },
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err.response.status);
          });
      })
      .catch((err) => {
        reject(err.response.status);
      });
  });
};

export const userData = (token, login) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${USER_ENDPOINT}${login}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = {
          id: res.data.id ? res.data.id : null,
          login: res.data.login ? res.data.login : null,
          name: res.data.displayname ? res.data.displayname : null,
          staff: res.data["staff?"] ? res.data["staff?"] : false,
          correction_points: res.data.correction_points ? res.data.correction_points : 0,
          poolMonth: res.data.pool_month ? res.data.pool_month : 0,
          poolYear: res.data.pool_year ? res.data.pool_year : 0,
          location: res.data.location ? res.data.location : null,
          anonymize_date: res.data.anonymize_date ? res.data.anonymize_date : null,
          alumni: res.data.alumni ? res.data.alumni : false,
          wallet: res.data.wallet ? res.data.wallet : 0,
          isLaunched: res.data["is_launched?"] ? res.data["is_launched?"] : false,
          image_url: res.data.image_url ? res.data.image_url : null,
          campus: res.data.campus[res.data.campus.length - 1]
            ? res.data.campus[res.data.campus.length - 1].name
              ? res.data.campus[res.data.campus.length - 1].name
              : null
            : null,
          titles: res.data.titles[0]
            ? res.data.titles[0].name
              ? res.data.titles[0].name
              : null
            : null,
          // status: res.status,
          // achievements: res.data.achievements ? res.data.achievements : [],
          // projects_users: res.data.projects_users ? res.data.projects_users : [],
          // cursus_users: res.data.cursus_users ? res.data.cursus_users : [],
        };
        // console.log("----------------DATA----------------");
        // console.log("data",data);
        // console.log("----------------DATA----------------");
        resolve(data);
      })
      .catch((err) => {
        reject(err.response.status);
      });
  });
};

export const getUserInfo = (login) => {
  return new Promise((resolve, reject) => {
    AccessToken()
      .then((res) => {
        const token = res.access_token;
        userData(token, login)
          .then((userData) => {
            const b = { ...userData } ? { ...userData } : {};
            userCoalition(userData.id)
              .then((coal) => {
                const data = { ...b, coalitions: coal ? coal : {} };
                resolve(data);
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

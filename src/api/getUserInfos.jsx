import { USER_ENDPOINT } from "@env";
import {
  TOKEN_ENDPOINT,
  CLIENT_ID,
  CLIENT_SECRET,
  TOKEN_ENDPOINT_INFOS,
} from "@env";
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
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.status);
      });
  });
};

export default AccessTokenInfo = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${TOKEN_ENDPOINT_INFOS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.expires_in_seconds > 0) resolve(token);
      })
      .catch((err) => {
        console.log(token);
        alert("refetching token");
        AccessToken().then((res) => {
          console.log(res);
          resolve(res.access_token);
        });
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
      .get(`${USER_ENDPOINT}${login.toLowerCase()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = {
          id: res.data.id ? res.data.id : null,
          login: res.data.login ? res.data.login : null,
          email: res.data.email ? res.data.email : null,
          name: res.data.displayname ? res.data.displayname : null,
          staff: res.data["staff?"] ? res.data["staff?"] : false,
          correction_points: res.data.correction_point ? res.data.correction_point : 0,
          poolMonth: res.data.pool_month ? res.data.pool_month : 0,
          poolYear: res.data.pool_year ? res.data.pool_year : 0,
          location: res.data.location ? res.data.location : null,
          anonymize_date: res.data.anonymize_date ? res.data.anonymize_date : null,
          alumni: res.data.alumni ? res.data.alumni : false,
          wallet: res.data.wallet ? res.data.wallet : 0,
          isLaunched: res.data["is_launched?"] ? res.data["is_launched?"] : false,
          image_url: res.data.image_url ? res.data.image_url : null,
          campus: res.data.campus[res.data.campus.length - 1] ? res.data.campus[res.data.campus.length - 1].name ? res.data.campus[res.data.campus.length - 1].name: null : null,
          titles: res.data.titles[0] ? res.data.titles[0].name ? res.data.titles[0].name : null : null,
          status: res.status,
          achievements: res.data.achievements ? res.data.achievements : [],
          projects_users: res.data.projects_users ? res.data.projects_users : [],
          cursus_users: res.data.cursus_users ? res.data.cursus_users : [],
        };
        resolve(data);
      })
      .catch((err) => {
        alert(`User ${login} not found`);
        reject(err.response.status);
      });
  });
};

export const getUserInfo = (token, login) => {
  return new Promise((resolve, reject) => {
    AccessTokenInfo(token)
      .then((res) => {
        userData(res, login)
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

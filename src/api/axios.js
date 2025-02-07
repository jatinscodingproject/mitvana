import axios from "axios";
import { getItem } from "./localStorage";
import { getCookies, getCookie } from "cookies-next";

// export const API_ENDPOINT = `http://localhost:4000/api/v1`;
// export const API_ENDPOINT = ` http://89.116.33.140:4000/api/v1`;
export const API_ENDPOINT = ` https://api.mitvana.com/api/v1`;


// export const backendUrl = "http://localhost:4000/";
// export const backendUrl = "http://89.116.33.140:4000/";
export const backendUrl = "https://api.mitvana.com/";


export const authHeader = () => ({
  Authorization: `Bearer ${
    getItem("accessToken") || getCookie("accessToken") || getCookie("token")
  }`,
});

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

class DataService {
  static get(path = "", includeAuth = true) {
    const headers = includeAuth ? { ...authHeader() } : {};
    return client.get(path, { headers });
  }

  static post(path = "", data = {}, includeAuth = true, optionalHeader = {}) {
    const headers = includeAuth
      ? { ...authHeader(), ...optionalHeader }
      : optionalHeader;
    return client.post(path, data, { headers });
  }

  static patch(path = "", data = {}, includeAuth = true) {
    const headers = includeAuth ? { ...authHeader() } : {};
    return client.patch(path, JSON.stringify(data), { headers });
  }

  static delete(path = "", data = {}, includeAuth = true) {
    const headers = includeAuth ? { ...authHeader() } : {};
    return client.delete(path, { data: JSON.stringify(data), headers });
  }

  static put(path = "", data = {}, includeAuth = true) {
    const headers = includeAuth ? { ...authHeader() } : {};
    return client.put(path, JSON.stringify(data), { headers });
  }
}
client.interceptors.request.use((config) => {
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = {
    ...headers,
    Authorization: `Bearer ${getItem("accessToken")}`,
  };

  return requestConfig;
});

export { DataService };

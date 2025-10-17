import axios from "axios";
import { loadToken } from "./session";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
export const getStoredToken = async () => {
  const token = await loadToken();
  return token;
};

export const authAxios = axios.create({
  baseURL: `${BASE_URL}`, // Optional: set a base URL
  headers: {
    Authorization: `Bearer ${getStoredToken()}`,
  },
});

import { clearAuth } from "@/store/slices/authUserSlice";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";
import { clearToken, loadToken } from "./session";

// Create an Axios instance (optional, but recommended for specific configurations)
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL, // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
});

// Add a request interceptor to inject the authorization header
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await loadToken(); // Retrieve token from SecureStore
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Inject the token
      }
    } catch (error) {
      console.error("Error retrieving token from SecureStore:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 404)
    ) {
      // Handle 401 Unauthorized error globally
      console.log("Unauthorized: Authentication failed or expired.");
      clearToken();
      clearAuth();
      router.replace("/login");
      Alert.alert(
        "Session Expired",
        "Your session has expired. Please log in again.",
        [
          {
            text: "OK",
          },
        ]
      );
    }
    return Promise.reject(error);
  }
);

export default api;

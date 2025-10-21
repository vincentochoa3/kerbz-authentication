import { clearAuth } from "@/store/slices/authUserSlice";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";
import { clearToken, loadToken } from "./session";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 10000,
});

// Add a request interceptor to inject the authorization header
api.interceptors.request.use(
  async (config) => {
    try {
      const publicEndpoints = ["/login"];
      if (!publicEndpoints.some((url) => config.url?.includes(url))) {
        const token = await loadToken(); // Retrieve token from SecureStore
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Inject the token
        }
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

// Add a response interceptor to handle 401 Unauthorized and 404 Not Found errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle 401 Unauthorized error globally
      console.log("Unauthorized: Authentication failed or session expired.");
      clearToken();
      clearAuth();
      router.replace("/login");
      Alert.alert(
        "Session Expired",
        "Your session has expired. Please log in again."
      );
    }
    if (error.response?.status === 404) {
      // Handle 404 Not Found error globally
      console.log("Not Found: Resource not found.");
      clearToken();
      clearAuth();
      router.replace("/login");
      Alert.alert(
        "Not Found",
        "Looks like the resource you're looking for doesn't exist."
      );
    }
    return Promise.reject(error);
  }
);

export default api;

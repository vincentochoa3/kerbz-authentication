import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "user_token";

export const saveToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (e) {
    console.error("Error saving token", e);
  }
};

export const loadToken = async () => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (e) {
    console.error("Error loading token", e);
    return null;
  }
};

export const clearToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (e) {
    console.error("Error clearing token", e);
  }
};

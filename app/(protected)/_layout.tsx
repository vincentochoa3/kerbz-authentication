import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/api";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const USER_DATA = {
  name: "John Doe",
  id: "1234567890",
  unreadCount: 0,
};

export default function ProtectedLayout() {
  const { isReady, setAuthUser } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("/me");
        setAuthUser(USER_DATA);
        console.log("response", response.data);
      } catch (error) {
        console.log("error in getUser", error);
      }
    };
    getUser();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

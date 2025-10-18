import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/api";
import { loadToken } from "@/utils/session";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function ProtectedLayout() {
  const { isReady, setAuthUser } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await loadToken();
        if (token) {
          await api.get("/me").then((res) => {
            const data = res.data;
            setAuthUser({
              id: data.id,
              name: `${data.firstName} ${data.lastName}`,
              unreadCount: 0,
            });
          });
        }
      } catch (error) {
        console.log("error getting user:", error);
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

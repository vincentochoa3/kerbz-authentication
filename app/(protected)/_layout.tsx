import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function ProtectedLayout() {
  const { isReady, token } = useAuth();

  if (!isReady) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (token === null) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Home", animation: "none" }}
      />
    </Stack>
  );
}

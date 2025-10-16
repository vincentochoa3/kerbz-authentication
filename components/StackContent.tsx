import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";

export default function AppProvider() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="index" />
      </Stack.Protected>

      <Stack.Screen name="login" />
    </Stack>
  );
}

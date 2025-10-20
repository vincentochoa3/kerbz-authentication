import { store } from "@/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ animation: "none" }}>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
      </Stack>
    </Provider>
  );
}

import { useAuth } from "@/hooks/useAuth";
import UserInactivityProvider from "@/providers/UserInactivityProvider";
import api from "@/utils/api";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function TabLayout() {
  const { isReady, setAuthUser } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        await api.get("/me").then((res) => {
          const data = res.data;
          setAuthUser({
            id: data.id,
            name: `${data.firstName} ${data.lastName}`,
            unreadCount: 0,
          });
        });
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
    <UserInactivityProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#000",
          animation: "none",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",

            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="logout"
          options={{
            title: "Logout",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="logout" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </UserInactivityProvider>
  );
}

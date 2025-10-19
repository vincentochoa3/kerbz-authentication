import { useAuth } from "@/hooks/useAuth";
import UserInactivityProvider from "@/providers/UserInactivityProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { token } = useAuth();

  if (token === null) {
    return <Redirect href="/login" />;
  }

  return (
    <UserInactivityProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#000",
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

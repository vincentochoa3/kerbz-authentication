import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { logout, user, token, lastActiveAt } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kerbz Authentication</Text>
      <Text style={styles.subtitle}>Welcome Home!</Text>
      <View>
        <Text>User: {user?.name}</Text>
        <Text>ID: {user?.id}</Text>
        <Text>Unread Count: {user?.unreadCount}</Text>
      </View>
      <View>
        <Text>Token: {token}</Text>
      </View>
      <View>
        <Text>Last Active: {lastActiveAt?.toString()}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutButton}
          activeOpacity={0.8}
        >
          <Text style={{ color: "white" }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: "#007AFF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
  },
});

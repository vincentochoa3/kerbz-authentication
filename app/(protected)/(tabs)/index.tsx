import { useAuth } from "@/hooks/useAuth";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { isReady, user, token, lastActiveAt, setAuthUser } = useAuth();

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
});

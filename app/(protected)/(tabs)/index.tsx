import { useAuth } from "@/hooks/useAuth";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { isReady, user, lastActiveAt } = useAuth();

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
      <View style={styles.userInfo}>
        <View>
          <Text style={styles.label}>User:</Text>
          <Text>{user?.name}</Text>
        </View>
        <View>
          <Text style={styles.label}>ID:</Text>
          <Text>{user?.id}</Text>
        </View>
        <View>
          <Text style={styles.label}>Unread Count:</Text>
          <Text>{user?.unreadCount}</Text>
        </View>
        <View>
          <Text style={styles.label}>Last Active:</Text>
          <Text>{lastActiveAt?.toString()}</Text>
        </View>
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
  userInfo: {
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

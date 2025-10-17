import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const USER_DATA = {
  name: "John Doe",
  id: "1234567890",
  unreadCount: 0,
};

export default function Index() {
  const { isReady, user, token, lastActiveAt, logout, setAuthUser } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        await axios
          .get(`${process.env.EXPO_PUBLIC_BASE_URL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("response", response.data);
          })
          .catch((error) => {
            if (error.response) {
              console.log("error reponse code", error.response.status);
            } else {
              console.log("error in getUser", error.message);
            }
            console.log("error in getUser", error);
          });
        setAuthUser(USER_DATA);
      }
    };
    getUser();
  }, []);

  const handleLogout = () => {
    logout();
  };

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
  logoutButton: {
    backgroundColor: "#007AFF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginTop: 20,
  },
});

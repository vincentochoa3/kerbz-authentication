import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/api";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Logout() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await api.post("/logout", {
        withCredentials: true,
      });
      logout();
    } catch (error) {
      console.log("error logging out:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logout</Text>
      <Text style={styles.subtitle}>Are you sure you want to log out?</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
        activeOpacity={0.8}
      >
        <Text style={{ color: "white" }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
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

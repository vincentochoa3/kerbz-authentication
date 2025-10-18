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
    <View>
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

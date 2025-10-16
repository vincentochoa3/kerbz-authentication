import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserAuth } = useAuth();

  const handleLogin = () => {
    setUserAuth("1234567890", {
      id: "1234567890",
      name: "John Doe",
      unreadCount: 0,
    });
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Welcome to Kerbz Authentication</Text>
      <View>
        <View>
          <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            value={password}
            style={styles.input}
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
          activeOpacity={0.8}
        >
          <Text style={{ color: "white" }}>Log In</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#E0E0E0",
    padding: 10,
    backgroundColor: "#F5F5F5",
    width: "100%",
  },
});

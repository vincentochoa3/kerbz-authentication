import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kerbz Authentication</Text>
      <Text style={styles.subtitle}>Welcome to your authentication app</Text>

      <View style={styles.linkContainer}>
        <Link href="/login" style={styles.link}>
          <Text style={styles.linkText}>Go to Login →</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  linkContainer: {
    marginTop: 20,
  },
  link: {
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  linkText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

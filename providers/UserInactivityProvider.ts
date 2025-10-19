import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "expo-router";
import { ReactNode, useEffect, useRef } from "react";
import { Alert, AppState, AppStateStatus } from "react-native";

const INACTIVITY_TIMEOUT = 2 * 60 * 1000; // 2 min timeout

const UserInactivityProvider = ({ children }: { children: ReactNode }) => {
  const currentPath = usePathname();
  const { lastActiveAt, updateLastActiveAt } = useAuth();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "background") updateLastActiveAt();
      if (appState.current === "background" && nextAppState === "active") {
        if (
          Date.now() - Number(new Date(lastActiveAt || "")) >=
          INACTIVITY_TIMEOUT
        )
          Alert.alert("User has been inactive for too long!");
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, [lastActiveAt, updateLastActiveAt]);

  // Update last active time when pathname changes
  useEffect(() => {
    updateLastActiveAt();
    if (Date.now() - Number(new Date(lastActiveAt || "")) >= INACTIVITY_TIMEOUT)
      Alert.alert("User has been inactive for too long!");
  }, [currentPath, updateLastActiveAt]);

  return children;
};

export default UserInactivityProvider;

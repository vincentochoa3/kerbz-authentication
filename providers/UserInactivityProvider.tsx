import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AppState, AppStateStatus, PanResponder, View } from "react-native";

interface ReactNativeInactivityProps {
  children: React.ReactNode;
}

const TIME_FOR_INACTIVITY = 30000;

export const UserInactivityProvider = ({
  children,
}: ReactNativeInactivityProps) => {
  const { lastActiveAt, updateLastActiveAt } = useAuth();
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appState = useRef(AppState.currentState);
  const [isInactivityTimeCompleted, setIsInactivityTimeCompleted] =
    useState<boolean>(false);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setTimeout(
      () => setIsInactivityTimeCompleted(true),
      TIME_FOR_INACTIVITY
    );
  }, [stopTimer]);

  const resetTimerForPanResponder = useCallback(() => {
    updateLastActiveAt();
    resetTimer();
    return false;
  }, [resetTimer]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponderCapture: resetTimerForPanResponder,
        onMoveShouldSetPanResponderCapture: resetTimerForPanResponder,
        onPanResponderTerminationRequest: resetTimerForPanResponder,
      }),
    [resetTimerForPanResponder]
  );

  // Handles when to show inactivity alert when timer expires or app returns from background after timeout
  useEffect(() => {
    // Handle timer-based inactivity
    if (isInactivityTimeCompleted) {
      router.replace("/lock-screen");
      setIsInactivityTimeCompleted(false);
      return;
    }

    // Handle app state changes for background/foreground inactivity
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "background") {
        updateLastActiveAt();
      } else if (
        appState.current === "background" &&
        nextAppState === "active"
      ) {
        if (
          lastActiveAt &&
          Date.now() - new Date(lastActiveAt).getTime() >= TIME_FOR_INACTIVITY
        ) {
          router.replace("/lock-screen");
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, [isInactivityTimeCompleted, lastActiveAt]);

  // Starts the initial timer when component mounts and cleans up on unmount
  useEffect(() => {
    resetTimer();
    return () => stopTimer();
  }, []);

  return (
    <View style={{ flex: 1 }} collapsable={false} {...panResponder.panHandlers}>
      {children}
    </View>
  );
};

export default UserInactivityProvider;

import { clearToken, loadToken, saveToken } from "@/utils/session";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { clearAuth, setToken, setUser } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const getTokenFromStorage = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const token = await loadToken();
      if (token) {
        dispatch(setToken({ token }));
      }
      setIsReady(true);
    };

    getTokenFromStorage();
  }, [dispatch]);

  const login = (token: string) => {
    dispatch(setToken({ token }));
    saveToken(token);
    router.replace("/");
  };

  const setUserAuth = (user: {
    id: string;
    name: string;
    unreadCount: number;
  }) => {
    dispatch(setUser({ user }));
  };

  const logout = () => {
    clearToken(); // Clear token from secure storage
    dispatch(clearAuth());
    router.replace("/login");
  };

  return {
    // State
    isReady,
    token: auth.token,
    user: auth.user,
    lastActiveAt: auth.lastActiveAt,
    // Actions
    setUserAuth,
    login,
    logout,
  };
};

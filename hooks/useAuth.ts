import { clearToken, loadToken, saveToken } from "@/utils/session";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { clearAuth, setToken, setUser } from "../store/slices/authUserSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((state: RootState) => state.authUser);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const getTokenFromStorage = async () => {
      // setTimeout to simulate loading
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

  const setAuthUser = (user: {
    id: string;
    name: string;
    unreadCount: number;
  }) => {
    dispatch(setUser({ user }));
  };

  const logout = () => {
    clearToken();
    dispatch(clearAuth());
    router.replace("/login");
  };

  return {
    // State
    isReady,
    token: authUser.token,
    user: authUser.user,
    lastActiveAt: authUser.lastActiveAt,
    // Actions
    setAuthUser,
    login,
    logout,
  };
};

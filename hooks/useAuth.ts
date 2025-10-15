import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  clearAuth,
  setAuth,
  updateLastActive,
  updateUnreadCount,
  updateUser,
} from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const setUserAuth = (
    token: string,
    user: { id: string; name: string; unreadCount: number }
  ) => {
    dispatch(setAuth({ token, user }));
  };

  const updateUserData = (
    userData: Partial<{ id: string; name: string; unreadCount: number }>
  ) => {
    dispatch(updateUser(userData));
  };

  const setUnreadCount = (count: number) => {
    dispatch(updateUnreadCount(count));
  };

  const refreshLastActive = () => {
    dispatch(updateLastActive());
  };

  const logout = () => {
    dispatch(clearAuth());
  };

  return {
    // State
    token: auth.token,
    user: auth.user,
    lastActiveAt: auth.lastActiveAt,
    isAuthenticated: !!auth.token && !!auth.user,

    // Actions
    setUserAuth,
    updateUserData,
    setUnreadCount,
    refreshLastActive,
    logout,
  };
};

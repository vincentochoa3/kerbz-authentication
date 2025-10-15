import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  unreadCount: number;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  lastActiveAt: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  lastActiveAt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.lastActiveAt = new Date().toISOString();
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        state.lastActiveAt = new Date().toISOString();
      }
    },
    updateUnreadCount: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.unreadCount = action.payload;
        state.lastActiveAt = new Date().toISOString();
      }
    },
    updateLastActive: (state) => {
      state.lastActiveAt = new Date().toISOString();
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.lastActiveAt = null;
    },
  },
});

export const {
  setAuth,
  updateUser,
  updateUnreadCount,
  updateLastActive,
  clearAuth,
} = authSlice.actions;
export default authSlice.reducer;

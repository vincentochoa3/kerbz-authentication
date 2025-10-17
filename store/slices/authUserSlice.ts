import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  unreadCount: number;
}

export interface AuthUserState {
  token: string | null;
  user: User | null;
  lastActiveAt: string | null;
}

const initialState: AuthUserState = {
  token: null,
  user: null,
  lastActiveAt: null,
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.lastActiveAt = new Date().toISOString();
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.lastActiveAt = null;
    },
  },
});

export const { setToken, setUser, clearAuth } = authUserSlice.actions;
export default authUserSlice.reducer;

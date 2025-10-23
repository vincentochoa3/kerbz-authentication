import authUserReducer, { setToken } from "../store/slices/authUserSlice";

describe("setToken reducer", () => {
  const initialState = {
    token: null,
    user: null,
    lastActiveAt: null,
  };

  it("should set the token in state", () => {
    const token = "test-token-123";
    const action = setToken({ token });
    const newState = authUserReducer(initialState, action);

    expect(newState.token).toBe(token);
    expect(newState.user).toBeNull();
    expect(newState.lastActiveAt).toBeNull();
  });

  it("should update token when one already exists", () => {
    const previousState = {
      token: "old-token",
      user: { id: "user-1", name: "John", unreadCount: 5 },
      lastActiveAt: "2024-01-01T00:00:00.000Z",
    };

    const newToken = "new-token-456";
    const action = setToken({ token: newToken });
    const newState = authUserReducer(previousState, action);

    expect(newState.token).toBe(newToken);
    expect(newState.user).toEqual(previousState.user);
    expect(newState.lastActiveAt).toBe(previousState.lastActiveAt);
  });

  it("should handle empty token", () => {
    const action = setToken({ token: "" });
    const newState = authUserReducer(initialState, action);

    expect(newState.token).toBe("");
  });
});

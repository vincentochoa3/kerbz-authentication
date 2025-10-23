import { store } from "@/store";
import api from "@/utils/api";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { AxiosError } from "axios";
import { Provider } from "react-redux";
import Login from "../app/login";

// Mocks
jest.mock("@/utils/api");
const mockedApi = api as jest.Mocked<typeof api>;
jest.mock("expo-router", () => ({
  router: { replace: jest.fn() },
}));

const renderWithStore = (ui: React.ReactNode) =>
  render(<Provider store={store}>{ui}</Provider>);

describe("LoginScreen Auth Flow (Expo Router)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("logs in successfully and navigates to home", async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { accessToken: "fake_jwt_token" },
    });
    const { getByTestId } = renderWithStore(<Login />);

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "password123");
    fireEvent.press(getByTestId("login-button"));

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith("/login", {
        username: "test@example.com",
        password: "password123",
        expiresInMins: 1,
        withCredentials: true,
      });
    });
  });

  it("shows an error message on failed login", async () => {
    const error = {
      response: {
        data: {
          message: "Invalid credentials",
        },
      },
    };
    mockedApi.post.mockRejectedValueOnce(error as AxiosError);

    const { getByTestId, getByText } = renderWithStore(<Login />);

    fireEvent.changeText(getByTestId("email-input"), "emilys");
    fireEvent.changeText(getByTestId("password-input"), "badpassword");
    fireEvent.press(getByTestId("login-button"));

    await waitFor(() => {
      expect(getByText("Invalid credentials")).toBeTruthy();
    });
  });
});

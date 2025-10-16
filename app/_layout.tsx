import StackContent from "@/components/StackContent";
import { store } from "@/store";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StackContent />
    </Provider>
  );
}

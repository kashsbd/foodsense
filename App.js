import { NavigationContainer } from "@react-navigation/native";

import { GlobalContextProvider } from "./contexts/GlobalContext";
import AuthOrMainStackComponent from "./screens/AuthOrMainStackComponent";

export default function App() {
  return (
    <NavigationContainer>
      <GlobalContextProvider>
        <AuthOrMainStackComponent />
      </GlobalContextProvider>
    </NavigationContainer>
  );
}

import { createContext, useState, useMemo, useEffect, memo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CenterLoading from "../components/CenterLoading";

const GlobalContext = createContext();
export default GlobalContext;

const defaultState = { token: null, isLoading: true };
export const GlobalContextProvider = memo(function GlobalContextProvider({
  children,
}) {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const queryToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setState({ token, isLoading: false });
        } else {
          setState({ ...defaultState, isLoading: false });
        }
      } catch (error) {
        setState({ ...defaultState, isLoading: false });
      }
    };
    queryToken();
  }, []);

  const memorizedState = useMemo(() => {
    return { state, setState };
  }, [state?.token]);

  if (state.isLoading) {
    return <CenterLoading />;
  }

  return (
    <GlobalContext.Provider value={memorizedState}>
      {children}
    </GlobalContext.Provider>
  );
});

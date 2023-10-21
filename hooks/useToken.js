import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GlobalContext from "../contexts/GlobalContext";

function useToken() {
  const { state, setState } = useContext(GlobalContext);

  const setTokenAsync = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      setState({ ...state, token, isLoading: false });
    } catch (error) {
      console.log("Error saving token");
    }
  };

  const clearTokenAsync = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setState({ ...state, token: null, isLoading: false });
    } catch (error) {
      console.log("Error saving token");
    }
  };

  return { token: state?.token, setTokenAsync, clearTokenAsync };
}

export default useToken;

import MainStackComponent from "./MainStackComponent";
import AuthStackComponent from "./auth/navigation/AuthStackComponent";
import useToken from "../hooks/useToken";

export default function AuthOrMainStackComponent() {
  const { token } = useToken();
  return <>{token ? <MainStackComponent /> : <AuthStackComponent />}</>;
}

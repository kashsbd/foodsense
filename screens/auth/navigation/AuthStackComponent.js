import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../LoginScreen";
import SignUpScreen from "../SignUpScreen";

const AuthStack = createNativeStackNavigator();
function AuthStackComponent() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthStackComponent;

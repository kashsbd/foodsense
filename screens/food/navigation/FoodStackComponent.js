import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodListScreen from "../FoodListScreen";

const FoodStack = createNativeStackNavigator();
function FoodStackComponent() {
  return (
    <FoodStack.Navigator initialRouteName="FoodList">
      <FoodStack.Screen
        name="FoodList"
        component={FoodListScreen}
        options={{ headerShown: false }}
      />
    </FoodStack.Navigator>
  );
}

export default FoodStackComponent;

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodListScreen from "../FoodListScreen";
import AddFood from "../components/AddFood";
import EditFood from "../components/EditFood";

const FoodStack = createNativeStackNavigator();
function FoodStackComponent() {
  return (
    <FoodStack.Navigator initialRouteName="FoodList">
      <FoodStack.Screen
        name="FoodList"
        component={FoodListScreen}
        options={{ headerShown: false }}
      />
      <FoodStack.Screen
        name="AddFood"
        component={AddFood}
        options={{ headerShown: true , headerTitle:"Go Back" }}
      />
      <FoodStack.Screen
        name="EditFood"
        component={EditFood}
        options={{ headerShown: false }}
      />
    </FoodStack.Navigator>
  );
}

export default FoodStackComponent;

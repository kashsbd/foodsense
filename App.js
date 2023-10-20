import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import FoodStackComponent from "./screens/food/navigation/FoodStackComponent";
import NoteStackComponent from "./screens/note/navigation/NoteStackComponent";
import ProfileScreen from "./screens/profile/ProfileScreen";

const BottomTabs = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs.Navigator
        activeColor="#fff"
        inactiveColor="black"
        screenOptions={{ headerShown: false }}
      >
        <BottomTabs.Screen
          name="FoodStack"
          component={FoodStackComponent}
          options={{
            title: "Food List",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="utensils" size={24} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="NoteStack"
          component={NoteStackComponent}
          options={{
            title: "Notes",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="sticky-note" size={24} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" size={24} color={color} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import FoodStackComponent from "./food/navigation/FoodStackComponent";
import NoteStackComponent from "./note/navigation/NoteStackComponent";
import ProfileStackComponent from "./profile/navigation/ProfileStackNavigation";

const BottomTabs = createBottomTabNavigator();
export default function MainStackComponent() {
  return (
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
        name="ProfileStack"
        component={ProfileStackComponent}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

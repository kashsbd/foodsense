import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileDetailScreen from "../ProfileDetailScreen";
import EditProfileScreen from "../EditProfileScreen";

const ProfileStack = createNativeStackNavigator();
function ProfileStackComponent() {
  return (
    <ProfileStack.Navigator initialRouteName="ProfileDetail">
      <ProfileStack.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackComponent;

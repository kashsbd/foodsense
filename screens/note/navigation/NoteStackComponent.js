import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NoteListScreen from "../NoteListScreen";

const NoteStack = createNativeStackNavigator();
function NoteStackComponent() {
  return (
    <NoteStack.Navigator initialRouteName="NoteList">
      <NoteStack.Screen
        name="NoteList"
        component={NoteListScreen}
        options={{ headerShown: false }}
      />
    </NoteStack.Navigator>
  );
}

export default NoteStackComponent;

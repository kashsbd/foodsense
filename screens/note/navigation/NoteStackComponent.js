import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteListScreen from "../NoteListScreen";
import NoteDetails from "../components/NoteDetails";
import AddNote from "../components/AddNote";

const NoteStack = createNativeStackNavigator();

function NoteStackComponent() {
  return (
    <NoteStack.Navigator initialRouteName="NoteList">
      <NoteStack.Screen
        name="NoteList"
        component={NoteListScreen}
        options={{ headerShown: false }}
      />
      <NoteStack.Screen
        name="Details"
        component={NoteDetails}
        options={{ headerShown: true }}
      />
      <NoteStack.Screen
        name="add-note"
        component={AddNote}
        options={{ headerShown: true }}
      />
    </NoteStack.Navigator>
  );
}

export default NoteStackComponent;

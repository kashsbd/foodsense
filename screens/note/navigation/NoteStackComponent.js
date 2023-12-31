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
        options={{ title: "Note Detail" }}
      />
      <NoteStack.Screen
        name="add-note"
        component={AddNote}
        options={{ title: "Add Note" }}
      />
    </NoteStack.Navigator>
  );
}

export default NoteStackComponent;

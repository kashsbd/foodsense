import React from "react";
import { StyleSheet, View, FlatList, Text, TouchableHighlight } from "react-native";
import NoteListItem from "./components/NoteListItem";


const notes = [
  { id: "1", header: "header1", date: new Date(), comment: "comment1" },
  { id: "2", header: "header2", date: new Date(), comment: "comment2" }
]
export default function NoteListScreen({navigation}) {
  const addNote = () => {
    navigation.navigate('add-note')
  }
  
  return (
    <View>
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteListItem item={item} />}
        keyExtractor={item => item.id} />

      <TouchableHighlight onPress={addNote} style={styles.addButton}>
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableHighlight>
    </View>

  )
}
const styles = StyleSheet.create({
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});



import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View, FlatList, Text, TouchableHighlight } from "react-native";
import NoteListItem from "./components/NoteListItem";
import GlobalContextProvider from "../../contexts/GlobalContext";
import { getNotes } from "../../services";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-web";

export default function NoteListScreen({ navigation }) {
  const { state, setState } = useContext(GlobalContextProvider);
  const [data, setData] = useState([])
  const addNote = () => {
    navigation.navigate('add-note')
  }

  const cachedGetData = useCallback(() => {
    async function getData() {
      try {

        const data = await getNotes(state.token);
        console.log(data);
        if (data && data.success) {
          setData(data.data);
        }
      } catch (error) {
        alert('error getting the data')
      }
    }
    getData();
  }, [])

  useFocusEffect(cachedGetData);

  return (
    <ScrollView>
     <FlatList
        data={data}
        renderItem={({ item }) => <NoteListItem item={item} />}
        keyExtractor={item => item._id} />
      <TouchableHighlight onPress={addNote} style={styles.addButton}>
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableHighlight>
      </ScrollView>

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



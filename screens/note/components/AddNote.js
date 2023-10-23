import { TextInput, View, TouchableHighlight, Text, Alert, StyleSheet } from "react-native";
import { useState,useContext } from "react";
import { addNotes } from "../../../services";
import GlobalContextProvider from "../../../contexts/GlobalContext";
import { useFocusEffect } from "@react-navigation/native";
export default function AddNote({ navigation }) {
    const [note, setNote] = useState({ header: '', comment: "" });
    const { state, setState } = useContext(GlobalContextProvider);
    const addNote = async () => {
        if (note.comment === '' || note.header === '') {
            Alert.alert('all fields are requiresd');
        } else {
            try {
                const result = await addNotes(note, state.token);
                Alert.alert('Notes Successfully Added')
                navigation.navigate('NoteList');
            } catch (error) {
                alert('error adding notes');
            }
        }
    }
   
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Note</Text>
            <TextInput value={note.header} onChangeText={(text) => setNote({ ...note, header: text })} placeholder="Header" style={styles.input} />
            <TextInput value={note.comment} onChangeText={(text) => setNote({ ...note, comment: text })} placeholder="Comment" style={styles.input} />
            <TouchableHighlight onPress={addNote} style={styles.button}>
                <Text style={styles.buttonText}>Add Note</Text>
            </TouchableHighlight>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

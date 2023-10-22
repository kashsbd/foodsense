
import React, { memo } from "react";
import { Text, StyleSheet, View, TouchableHighlight } from "react-native";

import { useNavigation } from "@react-navigation/native";

function NoteListItem({ item }) {
  const navigation = useNavigation();
  const Details = () => {
    navigation.navigate('Details', { item });
  }

  return (
    <View style={styles.container}>
     
      <Text style={styles.header}>Header: {item.header}</Text>
      <Text style={styles.date}>Date: {item.date}</Text>
      <TouchableHighlight style={styles.detailsButton} onPress={Details}>
        <Text style={styles.buttonText}>Details</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
 
  header: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  detailsButton: {
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

export default memo(NoteListItem);
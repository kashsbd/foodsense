import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import useToken from "../../../hooks/useToken";
import { editFood } from "../network";

export default function EditFood({ route }) {
  const { token } = useToken();

  const { data } = route.params;
  const [editedFood, setEditedFood] = useState({
    name: data.name,
    origin: data.origin,
    price: data.price,
    id: data._id,
  });

  const handleSaveChanges = async () => {
    const res = await editFood(editedFood, token);
    console.log(res);
    if (res && res.success) {
      Alert.alert("Food edited Successfully");
      navigation.navigate("FoodList");
    } else {
      console.log("error", res.error);
    }
  };

  const inputChange = (inputName, text) => {
    setEditedFood({ ...editedFood, [inputName]: text });
  };

  return (
    <View style={styles.container}>
      <Text>Edit Food</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={editedFood.name}
        onChangeText={(text) => inputChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Origin"
        value={editedFood.origin}
        onChangeText={(text) => inputChange("origin", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={editedFood.price}
        onChangeText={(text) => inputChange("price", text)}
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
});

import { useState } from "react";
import { View, Button, Text, TextInput } from "react-native";
import { editFood } from "../network";
import { Alert } from "bootstrap";

export default function EditFood({ params }) {
  const [editedFood, setEditedFood] = useState;
  // get unique id from food data to change
  const [name, origin, price] = params.data;
  const handleInput = (input, text) => {
    setEditedFood({ ...editedFood, [input]: text });
  };
  const handleSubmit = async () => {
    try {
      const res = await editFood("userId", editedFood, token);
      if (res) {
        Alert.Alert("food successfully edited");
      } else {
        console.log("Error editing food");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={(text) => handleInput("name", text)}
      />
      <TextInput
        value={origin}
        onChangeText={(text) => handleInput("origin", text)}
      />
      <TextInput
        value={price}
        onChangeText={(text) => handleInput("price", text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

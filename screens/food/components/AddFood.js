import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { addFood } from "../network";
import useToken from "../../../hooks/useToken";

export default function AddFood() {
  const { token } = useToken();
  const [food, setFood] = useState({
    name: "",
    origin: "",
    price: "",
    date: "",
  });

  const handleInputChange = (inputName, text) => {
    setFood({
      ...food,
      [inputName]: text,
    });
  };
  const handleSubmit = async () => {
    const res = await addFood(food, token);
    if (res) {
      Alert.alert("Food Added Successfully");
    } else {
      console.log("Error adding food");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={food.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <TextInput
        placeholder="Origin"
        value={food.origin}
        onChangeText={(text) => handleInputChange("origin", text)}
      />
      <TextInput
        placeholder="Price"
        value={food.price}
        onChangeText={(text) => handleInputChange("price", text)}
      />
      <TextInput
        placeholder="Date"
        value={food.date}
        onChangeText={(text) => handleInputChange("date", text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

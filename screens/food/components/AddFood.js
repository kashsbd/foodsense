import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { addFood } from "../network";
import useToken from "../../../hooks/useToken";
import { useNavigation } from "@react-navigation/native";

export default function AddFood({ route }) {
  const reload = route.params;
  const navigation = useNavigation();
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
  const currentDate =
    new Date().getMonth() +
    1 +
    "-" +
    new Date().getDate() +
    "-" +
    new Date().getFullYear() +
    " ";
  const handleSubmit = async () => {
    const res = await addFood(food, token);
    if (res) {
      Alert.alert("Food Added Successfully");
      navigation.navigate("FoodList");
      reload();
      setFood({ ...food, date: currentDate });
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
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

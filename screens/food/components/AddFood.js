import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { addFood } from "../network";
import useToken from "../../../hooks/useToken";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function AddFood({ route }) {
  const reload = route.params;
  const navigation = useNavigation();
  const { token } = useToken();
  const [food, setFood] = useState({
    name: "",
    origin: "",
    price: "",
    date: "",
    image: null,
  });

  const handleInputChange = (inputName, text) => {
    setFood({
      ...food,
      [inputName]: text,
    });
  };

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission to access the image library was denied.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setFood({
        ...food,
        image: result.uri,
      });
    }
  };

  const handleSubmit = async () => {
    const currentDate =
      new Date().getMonth() +
      1 +
      "-" +
      new Date().getDate() +
      "-" +
      new Date().getFullYear() +
      " ";

    const updatedFood = { ...food, date: currentDate };
    const res = await addFood(updatedFood, token);

    if (res) {
      Alert.alert("Food Added Successfully");
      navigation.navigate("FoodList");
      console.log(updatedFood);
      reload();
      setFood({ name: "", origin: "", price: "", date: "", image: null });
    } else {
      console.log("Error adding food");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={food.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Origin"
        value={food.origin}
        onChangeText={(text) => handleInputChange("origin", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={food.price}
        onChangeText={(text) => handleInputChange("price", text)}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={selectImage} style={styles.imgBut}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {food.image && (
        <Image source={{ uri: food.image }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 4,
  },
  input: {
    fontSize: 18,
    padding: 10,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#5398DC",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 5,
  },
  imgBut: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

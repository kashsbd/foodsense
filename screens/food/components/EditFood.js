import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
} from "react-native";
import useToken from "../../../hooks/useToken";
import { editFood } from "../network";
import * as ImagePicker from "expo-image-picker";

export default function EditFood({ route }) {
  const { token } = useToken();
  const { data } = route.params;

  const [editedFood, setEditedFood] = useState({
    name: data.name,
    origin: data.origin,
    price: data.price,
    date: data.date,
    id: data._id,
    image: data.image,
  });

  const handleSaveChanges = async () => {
    const res = await editFood(editedFood, token);
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

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission to access the image library was denied.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setEditedFood({ ...editedFood, image: result.uri });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Food</Text>
      {editedFood.image && (
        <Image source={{ uri: editedFood.image }} style={styles.image} />
      )}
      <Button title="Change Image" onPress={selectImage} />
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    margin: 10,
  },
});

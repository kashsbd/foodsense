import React, { useState } from "react";
import { Alert } from "react-native";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { deleteFood } from "../network";
import useToken from "../../../hooks/useToken";

const FoodListItem = ({ data, reload }) => {
  const { token } = useToken();
  const { _id, name, origin, price } = data;

  const navigation = useNavigation();

  //use this to check on computer browser otherwise comment this below code if you
  // are using on mobile device
  // const handleDeleteItem = async () => {
  //   try {
  //     const res = await deleteFood(_id, token);
  //     if (res) {
  //       Alert.alert("Food Successfully Deleted");
  //       console.log("Item deleted");
  //       reload();
  //     } else {
  //       console.log("Error deleting food");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // mobile version 
  const handleDeleteItem = async () => {
    Alert.alert(
      "Delete Food",
      "Are you sure you want to delete this food?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const res = await deleteFood(_id, token);
              if (res) {
                Alert.alert("Food Successfully Deleted");
                console.log("Item deleted");
                reload();
              } else {
                console.log("error deleting food");
              }
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.foodName}>{name}</Text>
        <Text style={styles.foodDescription}>
          {origin} - ${price}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditFood", { data });
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeleteItem}
          style={styles.deleteButton} // Apply the deleteButton style here
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 4,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  foodDescription: {
    fontSize: 18,
    color: "gray",
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#5398DC",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 5,
  },
  deleteButton: {
    backgroundColor: "#e73040",
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

export default FoodListItem;

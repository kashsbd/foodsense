import React, { useState } from "react";
import { Alert } from "react-native";

import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { deleteFood } from "../network";

const FoodListItem = ({ data }) => {
  // get userId from Global context

  // need some unique value to delete food
  const { name, origin, price } = data;

  const navigation = useNavigation();

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
              const res = await deleteFood(
                "GlobalContext.userId , foodId, token"
              );
              if (res) {
                Alert.alert("Food Successfully Deleted");
                console.log("Item deleted");
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
    <View style={{ backgroundColor: "white" }}>
      <View style={styles.food}>
        <Text>{name}</Text>
        <Text style={styles.foodDescription}>
          {origin} - ${price}
        </Text>
      </View>

      <View style={styles.edges}>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("/editFood", data);
          }}
          style={styles.button}
          underlayColor="#5398DC"
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={handleDeleteItem}
          style={styles.button}
          underlayColor="#5398DC"
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  edges: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    minWidth: 50,
  },
  food: {
    flexDirection: "column",
    flex: 8,
  },
  foodDescription: {
    color: "grey",
  },
  button: {
    borderWidth: 1,
    borderColor: "#0066CC",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#0066CC",
    fontSize: 12,
    textAlign: "center",
  },
  info: {
    marginHorizontal: 40,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
});

export default FoodListItem;

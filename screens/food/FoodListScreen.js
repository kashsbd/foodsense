import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, FlatList, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FoodListItem from "./components/FoodListItem";
import { getData } from "./network";

export default function FoodListScreen() {
  const [data, setData] = useState();
  const navigation = useNavigation();
  async function fetchData() {
    // pass userId, token inside getData
    try {
      const res = await getData("pass userId and token here ");
      if (res) {
        setData(res);
      } else {
        console.log("Error fetching data from server");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const AddFood = () => {
    navigation.navigate("/AddFood");
  };
  return (
    <View>
      <TextInput style={styles.input} placeholder="Live Search" />
      <Button title="Add Product" onPress={AddFood} />
      <FlatList
        data={data}
        renderItem={({ item }) => <FoodListItem data={item} />}
        keyExtractor={(item) => item.something.toString()} //have to store some unique value
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5",
  },
});

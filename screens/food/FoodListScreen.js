import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import FoodListItem from "./components/FoodListItem";
import useToken from "../../hooks/useToken";
import { getData } from "./network";

export default function FoodListScreen() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const { token } = useToken();

  async function fetchData() {
    try {
      const res = await getData(token);
      if (res && res.success) {
        setData(res.data);
      } else {
        console.log("Cannot get data from the server");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const AddFood = () => {
    navigation.navigate("AddFood", fetchData);
  };

  const filteredData = data?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food List</Text>
      <TextInput
        style={styles.input}
        placeholder="Live Search"
        onChangeText={(text) => setSearchQuery(text)}
      />
      <TouchableOpacity onPress={AddFood} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Food</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <FoodListItem data={item} reload={fetchData} />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontStyle: "italic",
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5",
    padding: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: 140,
    alignSelf: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

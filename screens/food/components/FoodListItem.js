import { Alert } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { deleteFood } from "../network";
import useToken from "../../../hooks/useToken";

const FoodListItem = ({ data, reload }) => {
  const { token } = useToken();
  const { _id, name, origin, price, date, image } = data;

  const navigation = useNavigation();

  //use this to check on computer browser otherwise comment this below code if you
  // are using on mobile device
  const handleDeleteItem = async () => {
    try {
      const res = await deleteFood(_id, token);
      if (res) {
        Alert.alert("Food Successfully Deleted");
        console.log("Item deleted");
        reload();
      } else {
        console.log("Error deleting food");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // mobile version
  // const handleDeleteItem = async () => {
  //   Alert.alert(
  //     "Delete Food",
  //     "Are you sure you want to delete this food?",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel",
  //       },
  //       {
  //         text: "Delete",
  //         onPress: async () => {
  //           try {
  //             const res = await deleteFood(_id, token);
  //             if (res) {
  //               Alert.alert("Food Successfully Deleted");
  //               console.log("Item deleted");
  //               reload();
  //             } else {
  //               console.log("error deleting food");
  //             }
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.foodName}>{name}</Text>
        <Text style={styles.foodDescription}>
          {origin} - ${price}
        </Text>
        <Text style={styles.dateText}>Date Posted: {date}</Text>
      </View>
      <View style={styles.imageContainer}>
        {image === null ? (
          <Image
            source={require("../../../../resources/noImage.jpg")}
            style={styles.image}
          />
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}
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
          style={styles.deleteButton}
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
    flexDirection: "column",
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
  dateText: {
    fontSize: 16,
    color: "green",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    alignContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
});

export default FoodListItem;

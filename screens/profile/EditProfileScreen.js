import { useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import CenterLoading from "../../components/CenterLoading";
import { editProfile } from "../../services";
import useToken from "../../hooks/useToken";

function EditProfileScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { token } = useToken();

  const [state, setState] = useState({
    fullname: params?.fullname,
    phno: params?.phno,
    address: params?.address,
    isLoading: false,
  });

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const onSubmitBtnPressed = async () => {
    if (state.fullname.trim().length === 0) {
      alert("Please key in fullname.");
    } else if (state.phno.trim().length !== 10) {
      alert("Phone number length should be 10.");
    } else if (state.address.trim().length === 0) {
      alert("Please key in address.");
    } else {
      try {
        setState((pre) => ({ ...pre, isLoading: true }));
        const json = await editProfile(token, {
          fullname: state.fullname,
          phno: state.phno,
          address: state.address,
        });

        if (json?.success) {
          navigation.goBack();
        } else {
          setState((pre) => ({ ...pre, isLoading: false }));
          alert(json?.error);
        }
      } catch (error) {
        setState((pre) => ({
          ...pre,
          isLoading: false,
        }));
        alert(error?.message);
      }
    }
  };

  if (state.isLoading) {
    return <CenterLoading />;
  }

  return (
    <View>
      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={state?.fullname}
        onChangeText={(text) => handleChange("fullname", text)}
      />
      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        value={state?.phno}
        onChangeText={(text) => handleChange("phno", text)}
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        value={state?.address}
        onChangeText={(text) => handleChange("address", text)}
      />
      <Pressable style={styles.submitButton} onPress={onSubmitBtnPressed}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: "#444",
    textAlign: "center",
    margin: 20,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 3,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default EditProfileScreen;

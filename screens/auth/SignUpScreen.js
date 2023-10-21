import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CenterLoading from "../../components/CenterLoading";
import { signup } from "../../services";

function SignUpScreen() {
  const navigation = useNavigation();
  const [state, setState] = useState({
    email: "",
    password: "",
    fullname: "",
    phno: "",
    address: "",
    isLoading: false,
  });

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const onSubmitBtnPressed = async () => {
    if (state.email.trim().length === 0) {
      alert("Please key in email.");
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/.test(state.email)
    ) {
      alert("Please key in valid email.");
    } else if (state.password.trim().length === 0) {
      alert("Please key in password.");
    } else if (state.fullname.trim().length === 0) {
      alert("Please key in fullname.");
    } else if (state.phno.trim().length !== 10) {
      alert("Phone number length should be 10.");
    } else if (state.address.trim().length === 0) {
      alert("Please key in address.");
    } else {
      try {
        setState((pre) => ({ ...pre, isLoading: true }));
        const json = await signup({
          email: state.email,
          password: state.password,
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
      <Text style={styles.title}>SignUp</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={state?.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        style={styles.input}
        value={state?.password}
        onChangeText={(text) => handleChange("password", text)}
      />
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
      <Pressable style={styles.rowCenter} onPress={navigation.goBack}>
        <Text>
          Already have account? <Text style={styles.loginText}>Login</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {},
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
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: "#0066cc",
  },
});

export default SignUpScreen;

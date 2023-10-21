import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CenterLoading from "../../components/CenterLoading";
import { login } from "../../services";
import useToken from "../../hooks/useToken";

function LoginScreen() {
  const navigation = useNavigation();
  const [state, setState] = useState({
    email: "",
    password: "",
    isLoading: false,
  });
  const { setTokenAsync } = useToken();

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const onLoginBtnPressed = async () => {
    if (state.email.trim().length === 0) {
      alert("Please key in email.");
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/.test(state.email)
    ) {
      alert("Please key in valid email.");
    } else if (state.password.trim().length === 0) {
      alert("Please key in password.");
    } else {
      try {
        setState((pre) => ({ ...pre, isLoading: true }));
        const json = await login({
          email: state.email,
          password: state.password,
        });

        if (json?.success) {
          await setTokenAsync(json?.data);
          setState((pre) => ({ ...pre, isLoading: false }));
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

  const onSignUpBtnPressed = () => {
    navigation.navigate("SignUp");
  };

  if (state.isLoading) {
    return <CenterLoading />;
  }

  return (
    <View>
      <Text style={styles.title}>Login</Text>
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
      <Pressable style={styles.submitButton} onPress={onLoginBtnPressed}>
        <Text style={styles.submitButtonText}>Login</Text>
      </Pressable>
      <Pressable style={styles.rowCenter} onPress={onSignUpBtnPressed}>
        <Text>
          New Here? <Text style={styles.signUpText}>Sign Up</Text>
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
  signUpText: {
    color: "#0066cc",
  },
});

export default LoginScreen;

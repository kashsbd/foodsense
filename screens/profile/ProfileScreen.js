import { useState, useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import CenterLoading from "../../components/CenterLoading";
import { profile } from "../../services";
import useToken from "../../hooks/useToken";

function ProfileScreen() {
  const [state, setState] = useState({
    data: null,
    isLoading: false,
  });

  const { token, clearTokenAsync } = useToken();

  const cachedProfileMe = useCallback(() => {
    const getProfileMe = async () => {
      try {
        const json = await profile(token);
        if (json?.success) {
          setState({ data: json?.data, isLoading: false });
        } else {
          setState({ ...state, isLoading: false });
          alert(json?.error);
        }
      } catch (error) {
        setState({ ...state, isLoading: false });
        alert(error?.message);
      }
    };
    getProfileMe();
  }, []);

  useFocusEffect(cachedProfileMe);

  const onLogoutBtnPressed = async () => {
    await clearTokenAsync();
  };

  if (state.isLoading) {
    return <CenterLoading />;
  }

  return (
    <View>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.input}>{state.data?.email}</Text>
      <Text style={styles.input}>{state.data?.fullname}</Text>
      <Text style={styles.input}>{state.data?.phno}</Text>
      <Text style={styles.input}>{state.data?.address}</Text>
      <Pressable style={styles.submitButton} onPress={onLogoutBtnPressed}>
        <Text style={styles.submitButtonText}>Logout</Text>
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

export default ProfileScreen;

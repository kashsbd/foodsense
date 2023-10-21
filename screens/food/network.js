import axios from "axios";

axios.defaults.baseURL = "http://localhost:5001";

export async function getData(userId, token) {
  const url = `/users/${userId}/foodsts`;
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return null;
  }
}
export async function addFood(userId, newProd, token) {
  const url = `/users/${userId}/foods`;
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(url, newProd);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function editFood(userId, editedProd, token) {
  const url = `/users/${userId}/foods/${editProd.id}`;
  console.log(url);
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.put(url, editedProd);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function deleteFood(userId, id, token) {
  const url = `/users/${userId}/foods/${id}`;
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    return null;
  }
}

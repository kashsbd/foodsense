const baseUrl = "http://localhost:5001";

export async function getData(token) {
  const url = `${baseUrl}/users/foods`;
  const header = {
    Authentication: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  console.log("Header", header);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: header,
    });
    console.log("token", token);
    console.log(response);

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function addFood(newProd, token) {
  const url = `${baseUrl}/users/foods`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProd),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function editFood(editedProd, token) {
  const url = `${baseUrl}/users/foods/${editedProd.id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProd),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteFood(id, token) {
  const url = `${baseUrl}/users/foods/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authentication: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return { success: true };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

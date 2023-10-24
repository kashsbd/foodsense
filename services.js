const API_URL = "http://localhost:5001";

export const login = async (payload) => {
  try {
    const req = await fetch(`${API_URL}/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await req.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const signup = async (payload) => {
  try {
    const req = await fetch(`${API_URL}/signup`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await req.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const profile = async (token) => {
  try {
    const req = await fetch(`${API_URL}/users/me`, {
      headers: { Authentication: `Bearer ${token}` },
    });
    const json = await req.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const editProfile = async (token, payload) => {
  try {
    const req = await fetch(`${API_URL}/users/me`, {
      method: "put",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const json = await req.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export async function getNotes(token) {
  try {
    const response = await fetch(`${API_URL}/users/notes`, {
      headers: { Authentication: `Bearer ${token}` },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addNotes(payload, token) {
  try {
    const response = await fetch(`${API_URL}/users/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

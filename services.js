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

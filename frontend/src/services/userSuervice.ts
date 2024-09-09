import axios from "axios";

const API_URL = "http://localhost:3000/api/user";

export const register = async (
  name: string,
  email: string,
  password: string,
  image?: string
) => {
  const response = await axios.post(`${API_URL}/auth`, {
    name,
    email,
    password,
    image,
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("userToken", response.data.token);
  }
  return response.data;
};

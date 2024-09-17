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
  console.log("ログインレスポンス:", response.data);
  if (response.data.token) {
    localStorage.setItem("userToken", response.data.token);
    localStorage.setItem("userName", response.data.user.name);
    return response.data;
  } else {
    throw new Error("ログインに失敗しました。ユーザー情報が見つかりません。");
  }
};

export const updateUser = async (
  name: string,
  email: string,
  password: string,
  image?: string
) => {
  const token = localStorage.getItem("userToken");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  if (image) {
    formData.append("image", image);
  }

  const response = await axios.put(`${API_URL}/update`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteUser = async (password: string) => {
  const token = localStorage.getItem("userToken");
  const response = await axios.delete(`${API_URL}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { password },
  });
  localStorage.removeItem("userToken");
  return response.data;
};

import axios from "axios";

const API_URL = "http://localhost:3000/api/book";

export const addBook = async (
  title: string,
  author: string,
  description: string,
  image?: string
) => {
  const token = localStorage.getItem("userToken");
  const response = await axios.post(
    `${API_URL}/add`,
    { title, author, description, image },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
};

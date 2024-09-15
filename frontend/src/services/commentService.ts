import axios from "axios";
import App from "../App";

const API_URL = "http://localhost:3000/api/comment";

export const addComment = async (
  bookId: string,
  comment: string,
  rating?: number
) => {
  const token = localStorage.getItem("userToken");
  const response = await axios.post(
    `${API_URL}/add`,
    { bookId, comment, rating },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getComments = async (bookId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("コメントの取得に失敗しました。", error);
  }
};

export const deleteComment = async (commentId: string) => {
  const token = localStorage.getItem("userToken");
  const response = await axios.delete(`${API_URL}/${commentId}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateComment = async (commentId: string, newComment: string) => {
  const token = localStorage.getItem("userToken");
  const response = await axios.put(
    `${API_URL}/${commentId}/update`,
    { comment: newComment },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

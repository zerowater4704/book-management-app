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

export const getBook = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("書籍の詳細取得に失敗しました。", error);
  }
};

export const updateBook = async (
  id: string,
  title: string,
  author: string,
  description: string,
  image?: string
) => {
  const token = localStorage.getItem("userToken");
  try {
    const response = await axios.put(
      `${API_URL}/updatedbook`,
      {
        bookId: id,
        title,
        author,
        description,
        image,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("書籍更新に失敗しました。", error);
  }
};

export const toggleLike = async (
  bookId: string,
  action: string,
  userId: string
) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    throw new Error("ユーザーが認証されていません。");
  }
  try {
    const response = await axios.put(
      `${API_URL}/${bookId}/action`,
      { action, user: { id: userId } }, // リクエストボディにアクションを渡す
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.likes; // 成功時に「いいね」の数を返す
  } catch (error) {
    console.error("いいねのAPI呼び出しに失敗しました。", error);
    throw error;
  }
};

export const deleteBook = async (id: string) => {
  try {
    const token = localStorage.getItem("userToken");
    const response = await axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("書籍削除に失敗しました。", error);
  }
};

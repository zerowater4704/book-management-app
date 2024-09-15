import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook } from "../../services/bookService";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken: any = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.id);
    }

    const fetchBook = async () => {
      try {
        const data = await getBook(id!);
        setBook(data);
      } catch (error) {
        console.error("書籍の詳細取得に失敗しました。");
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>著者:{book.author}</p>
      <p>作成者:{book.addedBy.name}</p>
      {book.image && <img src={book.image} alt={book.title} />}
      {userId === book.addedBy && <button>削除</button>}
    </div>
  );
};

export default BookDetail;

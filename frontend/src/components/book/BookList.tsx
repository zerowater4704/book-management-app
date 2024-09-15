import { useState, useEffect, act } from "react";
import { getBooks, toggleLike } from "../../services/bookService";
import { Link } from "react-router-dom";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken: any = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.id);
    }

    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.log("書籍一覧取得に失敗しました。", error);
      }
    };

    fetchBooks();
  }, []);

  const handleLike = async (bookId: string, isLiked: boolean) => {
    if (!userId) {
      alert("ログインしてください。");
      return;
    }
    const action = isLiked ? "dislike" : "like";
    try {
      await toggleLike(bookId, action, userId);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId
            ? {
                ...book,
                likes: isLiked
                  ? book.likes.filter((id: string) => id !== userId)
                  : [...book.likes, userId],
              }
            : book
        )
      );
    } catch (error) {
      console.error("いいねの処理に失敗しました。", error);
    }
  };

  return (
    <div>
      <h2>書籍一覧</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h3>
              <Link to={`/books/${book._id}`}>{book.title}</Link>
            </h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p>いいね{book.likes ? book.likes.length : 0}</p>
            <button
              onClick={() =>
                handleLike(book._id, book.likes && book.likes.includes(userId))
              }
            >
              {book.likes && book.likes.includes(userId)
                ? "いいね取り消し"
                : "いいね"}
            </button>
            <p>{book.image}</p>
            <Link to={`/books/${book._id}`}>詳細を見る</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;

import { useState, useEffect } from "react";
import { getBooks, toggleLike } from "../services/bookService";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Home: React.FC = () => {
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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">書籍一覧</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full"
          >
            {/* 画像を中央に配置 */}
            {book.image && (
              <div className="flex-grow">
                <img
                  src={`http://localhost:3000${book.image}`}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

            {/* タイトルを上に配置 */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-left">
                <Link to={`/books/${book._id}`} className="hover:text-blue-600">
                  {book.title}
                </Link>
              </h3>
            </div>

            {/* 下部に著者、作成者、いいねを配置 */}
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">著者: {book.author}</p>
                <p className="text-sm text-gray-600">
                  作成者: {book.addedBy?.name || "不明"}
                </p>
              </div>

              {/* いいねボタン */}
              <button
                className="flex items-center justify-center p-2 rounded-full"
                onClick={() =>
                  handleLike(
                    book._id,
                    book.likes && book.likes.includes(userId)
                  )
                }
              >
                {book.likes && book.likes.includes(userId) ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-gray-500 text-xl" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

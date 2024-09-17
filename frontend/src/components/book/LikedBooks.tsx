import { useState, useEffect } from "react";
import { getBooks } from "../../services/bookService";
import { Link } from "react-router-dom";

const LikedBooks: React.FC = () => {
  const [likedBooks, setLikedBooks] = useState<any[]>([]);
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
        // ユーザーがいいねした本のみをフィルタリング
        const likedBooks = data.filter((book: any) =>
          book.likes.includes(userId)
        );
        setLikedBooks(likedBooks);
      } catch (error) {
        console.log("いいねした書籍の取得に失敗しました。", error);
      }
    };

    if (userId) {
      fetchBooks();
    }
  }, [userId]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">いいねした書籍</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedBooks.map((book) => (
          <div
            key={book._id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full"
          >
            {book.image && (
              <div className="flex-grow">
                <img
                  src={`http://localhost:3000${book.image}`}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 ">
                <Link to={`/books/${book._id}`} className="hover:text-blue-600">
                  {book.title}
                </Link>
              </h3>
            </div>
            <div className="p-4 flex flex-col justify-between">
              <p className="text-sm text-gray-600">著者: {book.author}</p>
              <p className="text-sm text-gray-600">
                作成者: {book.addedBy?.name || "不明"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedBooks;

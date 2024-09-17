import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBook, deleteBook } from "../../services/bookService";
import CommentList from "../comment/CommentList";

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

  const handleDelete = async () => {
    if (book && book.addedBy._id === userId) {
      try {
        await deleteBook(id!);
        navigate("/");
      } catch (error) {
        console.error("書籍削除に失敗しました。");
      }
    }
  };

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* 左側 - タイトル、著者、作成者、説明 */}
        <div className="md:w-2/3">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            {book.title}
          </h2>
          <p className="text-xl text-gray-600 mb-2">著者: {book.author}</p>
          <p className="text-sm text-gray-500 mb-4">
            作成者: {book.addedBy.name}
          </p>
          <p className="text-lg text-gray-700 mb-6">{book.description}</p>

          {userId === book.addedBy._id && (
            <div className="mt-6 flex space-x-4">
              <Link
                to={`/books/${book._id}/update`}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                編集
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                削除
              </button>
            </div>
          )}
        </div>

        {/* 右側 - 画像 */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src={`http://localhost:3000${book.image}`}
            alt={book.title}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      {/* コメントセクション */}
      <div className="mt-8">
        <CommentList bookId={book._id} />
      </div>
    </div>
  );
};

export default BookDetail;

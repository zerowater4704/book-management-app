import { useState, useEffect } from "react";
import { getBooks } from "../../services/bookService";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
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

  return (
    <div>
      <h2>書籍一覧</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p>{book.image}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;

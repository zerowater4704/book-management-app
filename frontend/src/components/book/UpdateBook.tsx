import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBook, updateBook } from "../../services/bookService";

const UpdateBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<any>(null);
  const [book, setBook] = useState<any>(null);
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
        setTitle(data.title);
        setAuthor(data.author);
        setDescription(data.description);
        setImage(data.image);
      } catch (error) {
        console.error("書籍更新に失敗しました。", error);
      }
    };
    fetchBook();
  }, [id]);

  const handleUpdate = async () => {
    try {
      if (book && book.addedBy._id === userId) {
        await updateBook(id!, title, author, description, image);
        navigate(`/books/${id}`);
      }
    } catch (error) {
      console.log("書籍追加に失敗しました。", error);
    }
  };

  return (
    <div>
      <h2>書籍追加</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>タイトル:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル"
            required
          />
        </div>
        <div>
          <label>著者:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="著者"
            required
          />
        </div>
        <div>
          <label>説明:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="説明"
            required
          />
        </div>
        <div>
          <label>イメージ:</label>
          <input type="file" onChange={(e) => setImage(e.target.value)} />
        </div>
        <button type="submit" onClick={handleUpdate}>
          更新
        </button>
        <Link to={`/books/${id}`}>もどる</Link>
      </form>
    </div>
  );
};

export default UpdateBook;

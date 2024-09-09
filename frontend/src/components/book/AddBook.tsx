import { useState } from "react";
import { addBook } from "../../services/bookService";
import { useNavigate } from "react-router-dom";

const AddBook: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook(title, author, description, image || undefined);
      navigate("/");
    } catch (error) {
      console.log("書籍追加に失敗しました。", error);
    }
  };

  return (
    <div>
      <h2>書籍追加</h2>
      <form onSubmit={handleSubmit}>
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
          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0].name : null)
            }
          />
        </div>
        <button type="submit">追加</button>
      </form>
    </div>
  );
};

export default AddBook;

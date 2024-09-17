import { useState } from "react";
import { addBook } from "../../services/bookService";
import { useNavigate } from "react-router-dom";

const AddBook: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };

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
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold text-center mb-6">書籍追加</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* タイトル入力フィールド */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            タイトル:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* 著者入力フィールド */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            著者:
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="著者"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* 説明入力フィールド */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            説明:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="説明"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
          />
        </div>

        {/* イメージアップロード */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            イメージ:
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {/* イメージプレビュー */}
        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="プレビュー"
              className="w-48 h-38 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        {/* 追加ボタン */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            追加
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;

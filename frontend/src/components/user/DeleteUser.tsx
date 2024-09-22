import { useState } from "react";
import { deleteUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";

interface DeleteUserProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ setIsAuthenticated }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteUser(password);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.log("ユーザー削除に失敗しました。", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          アカウント削除
        </h2>
        <p className="text-gray-700 mb-4">
          アカウントを削除するには、パスワードを入力してください。
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              パスワード:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
          >
            アカウントを削除
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteUser;

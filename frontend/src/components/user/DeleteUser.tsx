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
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">アカウントを削除</button>
    </form>
  );
};

export default DeleteUser;

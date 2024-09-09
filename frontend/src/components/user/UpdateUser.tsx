import { useState } from "react";
import { updateUser } from "../../services/userService";
import { Link } from "react-router-dom";

interface UpdateUserProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedUser = await updateUser(
        name,
        email,
        password,
        image || undefined
      );
      setIsAuthenticated(true);
      console.log("ユーザー更新に成功しました。", updatedUser);
    } catch (error) {
      console.log("ユーザー更新エラー", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前：</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="名前"
            required
          />
        </div>
        <div>
          <label>Email：</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label>パスワード：</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label>イメージ：</label>
          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0].name : null)
            }
            placeholder="Password"
          />
        </div>
        <button type="submit">更新</button>
      </form>
      <hr />
      <Link to="/delete">アカウント削除</Link>
    </div>
  );
};

export default UpdateUser;

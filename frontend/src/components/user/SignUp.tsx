import { useState } from "react";
import { register } from "../../services/userService";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handelSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userData = await register(
        name,
        email,
        password,
        image || undefined
      );
      console.log("会員登録に成功しました。", userData);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.log("会員登録に失敗しました。", error);
    }
  };

  return (
    <form onSubmit={handelSignUp}>
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
        />
      </div>
      <button type="submit">会員登録</button>
    </form>
  );
};

export default SignUp;

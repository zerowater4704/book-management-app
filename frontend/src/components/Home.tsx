import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>ホームページ</h1>
      <Link to="/signup">会員登録</Link>
    </div>
  );
};

export default Home;

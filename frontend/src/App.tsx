import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Signup from "../src/components/user/SignUp";
import Login from "./components/user/Login";
import UpdateUser from "./components/user/UpdateUser";
import DeleteUser from "./components/user/DeleteUser";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/signup">会員登録</Link>
              </li>
              <li>
                <Link to="/login">ログイン</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/update">ユーザー更新</Link>
              </li>
              <Link to="/" onClick={() => setIsAuthenticated(false)}>
                ログアウト
              </Link>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={<Signup setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/update"
          element={<UpdateUser setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/delete"
          element={<DeleteUser setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

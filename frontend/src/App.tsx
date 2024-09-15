import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Signup from "../src/components/user/SignUp";
import Login from "./components/user/Login";
import UpdateUser from "./components/user/UpdateUser";
import DeleteUser from "./components/user/DeleteUser";
import AddBook from "./components/book/AddBook";
import BookList from "./components/book/BookList";
import BookDetail from "./components/book/BookDetail";
import UpdateBook from "./components/book/UpdateBook";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const storedUserName = localStorage.getItem("userName");

    if (token) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
  }, []);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">書籍一覧</Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/books/add">書籍追加</Link>
              </li>
              <li>ようこそ、{userName}さん</li>{" "}
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    setIsAuthenticated(false);
                    localStorage.removeItem("userToken");
                    localStorage.removeItem("userName");
                  }}
                >
                  ログアウト
                </Link>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/signup">会員登録</Link>
              </li>
              <li>
                <Link to="/login">ログイン</Link>
              </li>
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
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/books/:id/update" element={<UpdateBook />} />
      </Routes>
    </Router>
  );
};

export default App;

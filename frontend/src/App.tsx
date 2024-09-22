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
import LikedBooks from "./components/book/LikedBooks";

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
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-gray-800 p-4 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold">
              <Link to="/">Book Management</Link>
            </div>

            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-yellow-400">
                  Home
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <Link to="/likes" className="hover:text-yellow-400">
                      Like
                    </Link>
                  </li>
                  <li>
                    <Link to="/books/add" className="hover:text-yellow-400">
                      書籍追加
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="hover:text-yellow-400"
                      onClick={() => {
                        setIsAuthenticated(false);
                        localStorage.removeItem("userToken");
                        localStorage.removeItem("userName");
                      }}
                    >
                      ログアウト
                    </Link>
                  </li>
                  <li>
                    <Link to="/update" className="hover:text-yellow-400">
                      <span className="font-bold">{userName}</span>さん
                    </Link>
                  </li>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <li>
                    <Link to="/signup" className="hover:text-yellow-400">
                      会員登録
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="hover:text-yellow-400">
                      ログイン
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <main className="flex-grow container mx-auto p-6">
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
            <Route path="/likes" element={<LikedBooks />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/books/:id/update" element={<UpdateBook />} />
          </Routes>
        </main>

        {/* フッター */}
        <footer className="bg-gray-800 text-white text-center p-4">
          &copy; {new Date().getFullYear()} Book Management.
        </footer>
      </div>
    </Router>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Admin from "./pages/Admin";
import Bookmarks from "./components/Bookmarks";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />

        <Route path="/bookmarks" element={<Bookmarks />} />

        <Route
          path="/"
          element={
            user ? (
              user.email === "admin@gmail.com" ? (
                <Admin />
              ) : (
                <Feed />
              )
            ) : (
              <Navigate to="/signup" />
            )
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
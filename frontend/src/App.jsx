import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import FolderView from "./components/FolderView/FolderView";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

const NotFound = () => <div>ERROR 404: Page Not Found</div>;

const App = () => {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  // Check if user is authenticated from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true" // Check localStorage for authentication status
  );

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("current_theme", theme);
      localStorage.setItem("isAuthenticated", "true"); // Persist authentication status
    } else {
      localStorage.removeItem("isAuthenticated"); // Remove from localStorage if not authenticated
    }
  }, [theme, isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Set the user as authenticated in localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Remove authentication status from localStorage
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home/*"
          element={
            isAuthenticated ? (
              <div className={`container ${theme}`}>
                <Navbar
                  theme={theme}
                  setTheme={setTheme}
                  onLogout={handleLogout}
                />
                <FolderView />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

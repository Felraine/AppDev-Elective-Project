import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import FolderView from './components/FolderView/FolderView';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup'; 

const NotFound = () => <div>ERROR 404: Page Not Found</div>; 

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  const handleLogin = () => {
    setIsAuthenticated(true); 
  };

  return (
    <Router>
      <div className={`container ${theme}`}>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/home/*" 
            element={isAuthenticated ? (
              <>
                <Navbar theme={theme} setTheme={setTheme} />
                <FolderView />
              </>
            ) : (
              <Navigate to="/" />
            )}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

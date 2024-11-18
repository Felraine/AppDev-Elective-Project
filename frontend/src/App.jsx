import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import FolderView from './components/FolderView/FolderView';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

import { RemindersProvider } from './components/context/RemindersContext'; // Correct path to context
import Notif from './components/Navbar/Notif'; // Correct path to Notif component

import Tasks from './components/FolderView/Tasks';

const NotFound = () => <div>ERROR 404: Page Not Found</div>;

const App = () => {
  
  const [theme, setTheme] = useState(localStorage.getItem('current_theme') || 'light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('current_theme', theme);
    }
  }, [theme, isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  return (
    <Router>
      <RemindersProvider> {/* Wrap your app with RemindersProvider */}
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home/*"
            element={isAuthenticated ? (
              <div className={`container ${theme}`}>
                <Navbar theme={theme} setTheme={setTheme} />
                <header>
                  <Notif /> {/* This will display the NotificationButton with the notification count */}
                </header>
                <FolderView />
                {/* Main content of the app */}
                <main>
                  <Tasks /> {/* Tasks component */}
                  {/* You can add other components here */}
                </main>
              </div>
            ) : (
              <Navigate to="/" />
            )}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RemindersProvider>
    </Router>
  );
};

export default App;

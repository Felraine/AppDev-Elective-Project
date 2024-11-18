import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "./Navbar.css";
import logo from "../../assets/images/Logo.png";
import notif from "../../assets/images/bell.png";
import lightMode from "../../assets/images/brightness.png";
import darkMode from "../../assets/images/moon.png";
import defaultProfile from "../../assets/images/JohnDoe.png";
import settingsIcon from "../../assets/images/settings.png";
import { RemindersContext } from "../context/RemindersContext"; 

const Navbar = ({ theme, setTheme, notificationsCount }) => {
  const { notificationCount } = useContext(RemindersContext); 
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

   // Use context to get notification count

  const toggleMode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen((prev) => !prev);
  };

  const showReminderPrompt = () => {
    alert("You have a reminder");
  };

  const username = localStorage.getItem("username") || "User";

  return (
    <div className={`navbar ${theme}`}>
      <div className="logoAndName">
        <Link to="/home">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <span className="appName">Taskify</span>
      </div>
      <div className="rightArea">
        <img src={defaultProfile} alt="profile" className="profilePicture" />
        <span className="accountName">{username}</span>

        <div className="notif">
        <img src="path_to_your_icon.png" alt="notification" className="notifIcon" />
        {notificationsCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "4px 8px",
              fontSize: "12px",
            }}
          >
            {notificationsCount}
          </span>
        )}
      </div>

        <div className="lightMode">
          <img
            onClick={toggleMode}
            src={theme === "light" ? lightMode : darkMode}
            alt="mode toggle"
            className="lightModeIcon"
          />
        </div>

        <div className="settings" onClick={toggleSettingsModal}>
          <img src={settingsIcon} alt="settings" className="settingsIcon" />
        </div>
      </div>

      <div
        className={`settingsModalOverlay ${
          isSettingsModalOpen ? "" : "hidden"
        }`}
        onClick={() => setIsSettingsModalOpen(false)}
      >
        <div
          className={`settingsModal ${theme}`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="settingsOptions">
            <li onClick={() => alert("Edit Account Clicked")}>Edit Account</li>
            <li onClick={() => alert("Change Password Clicked")}>
              Change Password
            </li>
            <li onClick={() => alert("Logout Clicked")}>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import "./Navbar.css";
import logo from "../../assets/images/Logo.png";
import notif from "../../assets/images/bell.png";
import lightMode from "../../assets/images/brightness.png";
import darkMode from "../../assets/images/moon.png";
import defaultProfile from "../../assets/images/JohnDoe.png"; // Import the profile picture

const Navbar = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const username = localStorage.getItem("username") || "User";

  return (
    <div className={`navbar ${theme}`}>
      <div className="logoAndName">
        <img src={logo} alt="logo" className="logo" />
        <span className="appName">Taskify</span>
      </div>

      <div className="rightArea">
        <img
          src={defaultProfile} // Use the imported profile picture
          alt="profile"
          className="profilePicture"
        />
        <span className="accountName">{username}</span>

        <div className="notif">
          <img src={notif} alt="notification" className="notifIcon" />
        </div>

        <div className="lightMode">
          <img
            onClick={toggle_mode}
            src={theme === "light" ? lightMode : darkMode}
            alt="mode toggle"
            className="lightModeIcon"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

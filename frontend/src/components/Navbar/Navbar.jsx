import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./Navbar.css";
import logo from "../../assets/images/Logo.png";
import notif from "../../assets/images/bell.png";
import lightMode from "../../assets/images/brightness.png";
import darkMode from "../../assets/images/moon.png";
import defaultProfile from "../../assets/images/JohnDoe.png";
import settingsIcon from "../../assets/images/settings.png";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = ({ theme, setTheme }) => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User"
  );
  const [profilePicture, setProfilePicture] = useState(defaultProfile);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const token = localStorage.getItem("token");

  const navigate = useNavigate(); // Initialize useNavigate for redirecting

  const toggleMode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen((prev) => !prev);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
      localStorage.setItem("profilePicture", URL.createObjectURL(file)); // Save the profile picture to localStorage
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedProfileData = {
        username: newUsername,
        email: newEmail,
      };

      if (!token) {
        throw new Error("No auth token found");
      }

      const response = await axios.put(
        "http://localhost:8080/api/users/update",
        updatedProfileData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        const updatedUser = response.data.user;
        const newToken = response.data.token;
        localStorage.setItem("username", updatedUser.username); // Update the username
        localStorage.setItem("token", newToken); // Save the new token
        setUsername(updatedUser.username); // Update the username in the UI
        setIsEditProfileModalOpen(false); // Close the modal
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    localStorage.removeItem("username"); // Optional: Remove username from localStorage
    setUsername("User"); // Reset username in the UI
    setProfilePicture(defaultProfile); // Reset profile picture
    navigate("/"); // Redirect to login page
  };

  return (
    <div className={`navbar ${theme}`}>
      <div className="logoAndName">
        <Link to="/home">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <span className="appName">Taskify</span>
      </div>
      <div className="rightArea">
        <img src={profilePicture} alt="profile" className="profilePicture" />
        <span className="accountName">{username}</span>

        <div className="notif" onClick={() => alert("You have a reminder")}>
          <img src={notif} alt="notification" className="notifIcon" />
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

      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <div className="settingsModalOverlay" onClick={toggleSettingsModal}>
          <div
            className={`settingsModal ${theme}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profileInModal">
              <img
                src={profilePicture}
                alt="profile"
                className="profileInModalImage"
              />
              <span className="profileInModalName">{username}</span>
            </div>

            <ul className="settingsOptions">
              <li onClick={() => setIsEditProfileModalOpen(true)}>
                <EditIcon className="settingsOptionIcon" />
                Edit Profile
              </li>
              <li onClick={handleLogout}>
                <LogoutIcon className="settingsOptionIcon" />
                Logout
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditProfileModalOpen && (
        <div
          className="settingsModalOverlay"
          onClick={() => setIsEditProfileModalOpen(false)}
        >
          <div
            className={`settingsModal ${theme}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profileInModal">
              <img
                src={profilePicture}
                alt="profile"
                className="profileInModalImage"
              />
              <input
                type="file"
                onChange={handleProfilePictureChange}
                className="profilePictureInput"
              />
            </div>

            <div className="profileForm">
              <input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="New Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div className="saveButton">
              <button onClick={handleUpdateProfile}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

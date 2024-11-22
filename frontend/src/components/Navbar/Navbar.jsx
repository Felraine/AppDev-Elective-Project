import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User"
  );
  const [profilePicture, setProfilePicture] = useState(defaultProfile);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

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
      localStorage.setItem("profilePicture", URL.createObjectURL(file));
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
        localStorage.setItem("username", updatedUser.username);
        localStorage.setItem("token", newToken);
        setUsername(updatedUser.username);
        setIsEditProfileModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername("User");
    setProfilePicture(defaultProfile);
    navigate("/");
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/api/users/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Password changed successfully!");
        setIsChangePasswordModalOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password.");
    }
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
              <li onClick={() => setIsChangePasswordModalOpen(true)}>
                <LockIcon className="settingsOptionIcon" />
                Change Password
              </li>
              <li onClick={handleLogout}>
                <LogoutIcon className="settingsOptionIcon" />
                Logout
              </li>
            </ul>
          </div>
        </div>
      )}

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
              <span className="profileInModalName">{username}</span>
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

      {isChangePasswordModalOpen && (
        <div
          className="settingsModalOverlay"
          onClick={() => setIsChangePasswordModalOpen(false)}
        >
          <div
            className={`settingsModal ${theme}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modalHeader">
              <h2>Change Password</h2>
            </div>
            <div className="profileForm">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="saveButton">
              <button onClick={handleChangePassword}>Change Password</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

//NOTE: DONT TOUCH CODE
import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Tasks from "./Tasks";
import Archive from "./ArchivedTasks";
import "./FolderView.css";
import Home from "./Home";

class FolderView extends React.Component {
  getActiveTab = () => {
    const path = window.location.pathname;
    if (path === "/home") return "home-tab";
    if (path === "/home/tasks") return "tasks-tab";
    if (path === "/home/archive") return "archive-tab";
    return "";
  };

  render() {
    const activeTab = this.getActiveTab();

    return (
      <div className="folder-view">
        <div className="tab-container">
          <div className="tabs">
            <Link
              to="/home"
              className={`tab ${
                activeTab === "home-tab" ? "active" : ""
              } home-tab`}
            >
              Home
            </Link>
            <Link
              to="/home/tasks"
              className={`tab ${
                activeTab === "tasks-tab" ? "active" : ""
              } tasks-tab`}
            >
              Tasks
            </Link>
            <Link
              to="/home/archive"
              className={`tab ${
                activeTab === "archive-tab" ? "active" : ""
              } archive-tab`}
            >
              Archive
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />{" "}
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </div>
    );
  }
}

export default FolderView;

import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './FolderView.css';

// NOTE: DONT CHANGE the code
// Add code here for whos assigned to home tab
const Home = () => (
  /* Dont change className */
  <div className="content home-content"> 
    <h2>Add your content here</h2>
  </div>
);

// Add code here for whos assigned to tasks tab
const Tasks = () => (
  /* Dont change className */
  <div className="content tasks-content">
    <h2>Add your content here</h2>
    <p>Hello World</p>
  </div>
);

// Add code here for whos assigned to archive tab
const Archive = () => (
  /* Dont change className */
  <div className="content archive-content">
    <h2>Add your content here</h2>
  </div>
);

class FolderView extends React.Component {
  getActiveTab = () => {
    /* Dont change code here */
    const path = window.location.pathname;
    if (path === "/home") return "home-tab";
    if (path === "/home/tasks") return "tasks-tab"; // Update path for tasks
    if (path === "/home/archive") return "archive-tab"; // Update path for archive
    return "";
  };

  render() {
    const activeTab = this.getActiveTab(); 

    return (
      <div className="folder-view">
        <div className="tab-container">
          <div className="tabs">
            <Link to="/home" className={`tab ${activeTab === "home-tab" ? "active" : ""} home-tab`}>
              Home
            </Link>
            <Link to="/home/tasks" className={`tab ${activeTab === "tasks-tab" ? "active" : ""} tasks-tab`}>
              Tasks
            </Link>
            <Link to="/home/archive" className={`tab ${activeTab === "archive-tab" ? "active" : ""} archive-tab`}>
              Archive
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </div>
    );
  }
}

export default FolderView;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './FolderView.css';


//NOTE: DONT CHANGE the code
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
    if (path === "/") return "home-tab";
    if (path === "/tasks") return "tasks-tab";
    if (path === "/archive") return "archive-tab";
    return "";
  };

  render() {
    const activeTab = this.getActiveTab(); 

    return (
      /* Dont code here */
      <Router>
        <div className="folder-view">
          <div className="tab-container">
            <div className="tabs">
              <Link to="/" className={`tab ${activeTab === "home-tab" ? "active" : ""} home-tab`}>
                Home
              </Link>
              <Link to="/tasks" className={`tab ${activeTab === "tasks-tab" ? "active" : ""} tasks-tab`}>
                Tasks
              </Link>
              <Link to="/archive" className={`tab ${activeTab === "archive-tab" ? "active" : ""} archive-tab`}>
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
      </Router>
    );
  }
}

export default FolderView;

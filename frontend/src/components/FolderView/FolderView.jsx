import React, { useState } from 'react';
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
//Reminder: Creation_date implementation that takes current date
const Tasks = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: '',
    creation_date: '',
    due_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log('Task data:', task);
    setTask({
      title: '',
      description: '',
      priority: '',
      creation_date: '',
      due_date: ''
    });
  };

  return (
    /* Dont change className */
    <div className="content tasks-content">
      <h3>Create New Task</h3>
      <form onSubmit={handleSubmit}>
        <input 
        className='taskTitle'
          type="text" 
          name="title" 
          placeholder="Title" 
          value={task.title} 
          onChange={handleChange} 
          required 
        />
        <br></br>
        <input 
          className='taskDesc'
          type="text" 
          name="description" 
          placeholder="Short description here..." 
          value={task.description} 
          onChange={handleChange} 
           
        />
        <br></br>
        <select 
         className='taskPriority'
          name="priority" 
          value={task.priority} 
          onChange={handleChange} 
          required 
        >
          <option value="" disabled>Choose Priority</option>
          <option className='high' value="high">High</option>
          <option className='medium' value="medium">Medium</option>
          <option className='low' value="low">Low</option>
        </select>
        <label for="due_date" className='dueDateLabel'>Due Date: </label>
        <input 
          className='taskDue'
          type="date" 
          name="due_date" 
          value={task.due_date} 
          onChange={handleChange} 
          required 
        />
        <br></br>
        <button className='addTask' type="submit">Add Task</button>
      </form>
    </div>
  );
};


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

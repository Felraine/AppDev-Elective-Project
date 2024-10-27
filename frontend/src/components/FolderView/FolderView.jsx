import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FolderView.css";

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
  let navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    creation_date: "",
    due_date: "",
  });

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(""); // State for error messages

  useEffect(() => {
    fetchTasks(); // Fetch initial task list on component mount
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const taskWithDate = { ...task, creation_date: currentDate };

    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/tasks/task",
        taskWithDate // Send the correct object here
      );

      console.log("Task Added successful:", response.data);
      navigate("/home/tasks"); // Navigate to the tasks tab after adding a task
      fetchTasks(); // Refresh the task list after adding
    } catch (error) {
      console.error("Error adding task", error.response || error);
      setError(
        error.response?.data?.message || "Adding Task failed. Please try again."
      );
    }
  };

  return (
    <div className="content tasks-content">
      <h3>Create New Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="taskTitle"
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          required
        />
        <br />
        <input
          className="taskDesc"
          type="text"
          name="description"
          placeholder="Short description here..."
          value={task.description}
          onChange={handleChange}
        />
        <br />
        <select
          className="taskPriority"
          name="priority"
          value={task.priority}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Choose Priority
          </option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <label htmlFor="due_date" className="dueDateLabel">
          Due Date:{" "}
        </label>
        <input
          className="taskDue"
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
          required
        />
        <br />
        <button className="addTask" type="submit">
          {"Add Task"}
        </button>
      </form>
      <h3>Task List</h3>
      {error && <p className="error">{error}</p>} {/* Display error if any */}
      <ul>
        {tasks.map((task) => (
          <li key={task.task_ID}>
            {task.title} - {task.priority}
          </li>
        ))}
      </ul>
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
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </div>
    );
  }
}

export default FolderView;

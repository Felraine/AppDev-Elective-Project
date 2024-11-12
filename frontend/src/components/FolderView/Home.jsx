import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchTasksData();
  }, []);

  const fetchTasksData = async () => {
    try {
      // Fetch completed tasks
      const archivedResponse = await axios.get(
        `http://localhost:8080/api/archive/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCompletedTasks(archivedResponse.data.length);

      // Fetch total tasks
      const tasksResponse = await axios.get(
        `http://localhost:8080/api/tasks/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTotalTasks(archivedResponse.data.length + tasksResponse.data.length); // Update this line to count all tasks
    } catch (error) {
      console.error("Error fetching tasks data:", error);
    }
  };

  // Function to mark a task as completed
  const completeTask = async (taskId) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/tasks/complete/${taskId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Increment the completed tasks count without decreasing total tasks
      setCompletedTasks((prev) => prev + 1);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  // Function to add a new task
  const addTask = async (taskData) => {
    try {
      await axios.post(`http://localhost:8080/api/tasks`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Increment the total tasks count
      setTotalTasks((prev) => prev + 1);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Calculate progress percentage
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="content home-content">
      <div className="progress-container">
        <h1 className="progress-title">Progress Tracker</h1>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="progress-details">
          <p>Tasks Completed: {completedTasks}</p>
          <p>Remaining Tasks: {totalTasks - completedTasks}</p>{" "}
          {/* Remaining tasks */}
          <p>Progress: {progress.toFixed(1)}%</p>
        </div>
        {progress === 100 ? (
          <p className="completion-message">
            🎉 Congratulations! You've completed all tasks!
          </p>
        ) : (
          <p className="incomplete-message">
            🔄 Keep going! You’re {progress.toFixed(1)}% done. Almost there!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
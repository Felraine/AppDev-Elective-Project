import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ArchivedTasks.css";

const ArchivedTasks = () => {
  const [archivedTasks, setArchivedTasks] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchArchivedTasks();
  }, []);

  const fetchArchivedTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/archive/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setArchivedTasks(response.data);
    } catch (error) {
      console.error("Error fetching archived tasks:", error);
    }
  };

  return (
    <div className="content archive-content">
      <div className="taskHeader">
        <h3 style={{ textAlign: "left", marginLeft: "10px" }}>
          Archived Tasks
        </h3>
      </div>

      <div className="scrollableTasks">
        {archivedTasks.map((task) => (
          <div className="taskCard" key={task.archivedTask_ID}>
            <div className="task-head">
              <strong style={{ color: "#514538" }}>{task.title}</strong>
              <p className="completion-date">
                Completed on: {task.completionDate}
              </p>
            </div>
            <div>
              <p className="task-desc">{task.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivedTasks;

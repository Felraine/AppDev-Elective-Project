import React, { useEffect, useState } from "react";
import axios from "axios";

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
      {" "}
      {/* Add the content and archive-content class here */}
      <h3>Archived Tasks</h3>
      <ul>
        {archivedTasks.map((task) => (
          <li key={task.archivedTask_ID}>
            <strong>{task.title}</strong>: {task.description} - Due on{" "}
            {task.due_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArchivedTasks;

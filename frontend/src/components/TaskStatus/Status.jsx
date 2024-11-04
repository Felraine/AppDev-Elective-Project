import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskStatus = () => {
  const [statuses, setStatuses] = useState([]);

  // Fetch task statuses from the backend API
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get('/api/taskStatus'); // Update with your API endpoint
        setStatuses(response.data);
      } catch (error) {
        console.error("Error fetching task statuses:", error);
      }
    };

    fetchStatuses();
  }, []);

  // Function to update the status of a task
  const updateStatus = async (statusId, newStatus) => {
    try {
      const updatedTask = {
        status: newStatus,
        last_updated: new Date().toISOString().split('T')[0], // Update last_updated date
      };

      // Send the update request to the backend
      await axios.put(`/api/taskStatus/${statusId}`, updatedTask); // Update with your API endpoint

      // Update the state locally for immediate UI response
      setStatuses((prevStatuses) =>
        prevStatuses.map((task) =>
          task.statusId === statusId ? { ...task, ...updatedTask } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div>
      <h1>Task Statuses</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((task) => (
            <tr key={task.statusId}>
              <td>{task.statusId}</td>
              <td>{task.status}</td>
              <td>{task.last_updated}</td>
              <td>
                <button onClick={() => updateStatus(task.statusId, 'To Do')}>To Do</button>
                <button onClick={() => updateStatus(task.statusId, 'On Going')}>On Going</button>
                <button onClick={() => updateStatus(task.statusId, 'Completed')}>Completed</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskStatus;

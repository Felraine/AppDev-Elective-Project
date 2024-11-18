import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, LinearProgress } from "@mui/material";
 
const Home = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [pendingCount, setPendingCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [taskStatuses, setTaskStatuses] = useState([]);
  //maybe deleted
  /*const [counts, setCounts] = useState({
    pending: 0,
    overdue: 0,
    completed: 0
  });*/
 
  useEffect(() => {
    fetchTasksData();
  }, []);
 
  const fetchTasksData = async () => {
    try {
      const archivedResponse = await axios.get(
        `http://localhost:8080/api/archive/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCompletedTasks(archivedResponse.data.length);
 
      const tasksResponse = await axios.get(
        `http://localhost:8080/api/tasks/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTotalTasks(archivedResponse.data.length + tasksResponse.data.length);
    } catch (error) {
      console.error("Error fetching tasks data:", error);
    }
  };
 
  const completeTask = async (taskId) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/tasks/complete/${taskId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCompletedTasks((prev) => prev + 1);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };
 
  const addTask = async (taskData) => {
    try {
      await axios.post(`http://localhost:8080/api/tasks`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalTasks((prev) => prev + 1);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
 
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  useEffect(() => {
    axios.get('http://localhost:8080/api/tasks/status/statuses')
      .then(response => {
        const statuses = response.data;
        setTaskStatuses(statuses);

        setPendingCount(statuses.filter(task => task.status === 'Pending').length);
        setOverdueCount(statuses.filter(task => task.status === 'Overdue').length);
        setCompletedCount(statuses.filter(task => task.status === 'Completed').length);
      })
      .catch(error => {
        console.error('Error fetching task statuses:', error);
      });
  }, []);
 
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: "#fffa9d",
        maxWidth: "100%",
        margin: "auto",
        minHeight: "calc(100vh - 160px)",
        height: "auto",
        overflow: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Progress Tracker
      </Typography>
      <Box sx={{ width: "100%", mt: 2 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 20,
            borderRadius: 1,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "blue",
            },
          }}
          
        //<Typography>Remaining Tasks: {totalTasks - completedTasks}</Typography>
        />
      </Box>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography>Tasks Completed: {completedTasks}</Typography>
        <Typography>Progress: {progress.toFixed(1)}%</Typography>
        <Typography>Pending: {pendingCount}</Typography>
        <Typography>Overdue: {overdueCount}</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        {progress === 100 ? (
          <Typography
            sx={{ color: "green", fontWeight: "bold", fontSize: "1.2em" }}
          >
            🎉 Congratulations! You've completed all tasks!
          </Typography>
        ) : (
          <Typography
            sx={{ color: "orange", fontWeight: "bold", fontSize: "1.2em" }}
          >
            🔄 Keep going! You’re {progress.toFixed(1)}% done. Almost there!
          </Typography>
        )}
      </Box>
    </Box>
  );
};
 
export default Home;
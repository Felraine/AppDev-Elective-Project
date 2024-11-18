import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, LinearProgress } from "@mui/material";

const Home = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
 
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
      setTasks(tasksResponse.data);
      setTotalTasks(archivedResponse.data.length + tasksResponse.data.length);
    } catch (error) {
      console.error("Error fetching tasks data:", error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ff0000"; // Red for high priority
      case "medium":
        return "#007bff"; // Blue for medium priority
      case "low":
        return "#28a745"; // Green for low priority
      default:
        return "#ccc"; // Gray for unknown priority
    }
  };

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
 
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 3,
        backgroundColor: "#fff9c4",
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
        />
      </Box>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography>Tasks Completed: {completedTasks}</Typography>
        <Typography>Remaining Tasks: {totalTasks - completedTasks}</Typography>
        <Typography>Progress: {progress.toFixed(1)}%</Typography>
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

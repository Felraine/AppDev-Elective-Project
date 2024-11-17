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
      }}
    >
      {/* To-Do List on the Right */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#ffe79f",
          borderRadius: 2,
          padding: 3,
          width: "40%", // Right section width
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          To Do List
        </Typography>

        {/* Task Progress */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 1,
            }}
          >
            {progress.toFixed(1)}% Completed
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 15,
              borderRadius: 1,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#ffa500",
              },
            }}
          />
        </Box>

        {/* Task List */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxHeight: "calc(100vh - 240px)",
            overflowY: "auto",
          }}
        >
          {tasks.map((task) => (
            <Box
              key={task.task_ID}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                border: "1px solid #ccc",
                padding: 2,
              }}
            >
              {/* Priority Circle */}
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: getPriorityColor(task.priority),
                  flexShrink: 0,
                }}
              ></Box>

              {/* Task Details */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1rem", fontWeight: "bold", marginBottom: 1 }}
                >
                  {task.title}
                </Typography>
                <Typography
                  sx={{ fontSize: "0.9rem", color: "#555", marginBottom: 1 }}
                >
                  {task.description}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "#888",
                    fontStyle: "italic",
                  }}
                >
                  Due Date: {task.due_date}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

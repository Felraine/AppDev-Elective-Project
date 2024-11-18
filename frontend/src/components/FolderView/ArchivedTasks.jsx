import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper } from "@mui/material";

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
      // Sort tasks by completionDate (newest first)
      const sortedTasks = response.data.sort(
        (a, b) => new Date(b.completionDate) - new Date(a.completionDate)
      );
      setArchivedTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching archived tasks:", error);
    }
  };

  return (
    <Box
      className="content"
      sx={{
        padding: 3,
        backgroundColor: "#cc915c",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        maxWidth: "100%",
        margin: "auto",
        maxHeight: "calc(100vh - 160px)",
        minHeight: "calc(100vh - 160px)",
        height: "auto",
        overflow: "hidden", // Hide scrollbar
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "start", mb: 2 }}>
        <Typography variant="h5" sx={{ color: "#514538", ml: 1 }}>
          Archived Tasks
        </Typography>
      </Box>

      <Box
        sx={{
          maxHeight: "calc(100vh - 240px)",
          minHeight: "calc(100vh - 240px)",
          overflowY: "auto",
          width: "100%",
          pb: 2,
          paddingRight: 2,
          paddingLeft: 2,
          "&::-webkit-scrollbar": {},
          msOverflowStyle: "none",
        }}
      >
        {archivedTasks.map((task) => (
          <Paper
            key={task.archivedTask_ID}
            sx={{
              borderRadius: "8px",
              padding: 2,
              backgroundColor: "#f9f9f9",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: "#514538" }}>
                {task.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#666", fontSize: "0.9em" }}
              >
                Completed on: {task.completionDate}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#666" }}>
              {task.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ArchivedTasks;

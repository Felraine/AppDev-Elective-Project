import React, { useEffect, useState } from "react";
import { Grid } from '@mui/material';
import './calendar.css';
import axios from "axios";
import { Box, Typography, LinearProgress, Checkbox } from "@mui/material";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
 
 
const Home = () => {
 
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and format it as mm
    const day = String(date.getDate()).padStart(2, '0'); // Get day and format it as dd
    const year = date.getFullYear(); // Get the full year
 
    return `${month}/${day}/${year}`; // Return in mm/dd/yyyy format
  }
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [taskStatuses, setTaskStatuses] = useState([]);
 
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
 
  useEffect(() => {
    fetchTasksData();
    fetchTaskStatuses();
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

       // Sort by priority
    const sortedTasks = tasksResponse.data.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
      setTasks(sortedTasks);
      setTotalTasks(archivedResponse.data.length + tasksResponse.data.length);
    } catch (error) {
      console.error("Error fetching tasks data:", error);
    }
  };
 
  const fetchTaskStatuses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tasks/status/statuses/count/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const statuses = response.data;
      setTaskStatuses(statuses);
 
      setPendingCount(statuses.filter((task) => task.status === "Pending").length);
      setOverdueCount(statuses.filter((task) => task.status === "Overdue").length);
      setCompletedCount(statuses.filter((task) => task.status === "Completed").length);
    } catch (error) {
      console.error("Error fetching task statuses:", error);
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
 
  // Update task counts and progress dynamically
  const archiveTask = async (taskId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/archive/${taskId}/user/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
 
      // Refetch the tasks and statuses after updating the backend
      fetchTasksData();
      fetchTaskStatuses();
    } catch (error) {
      console.error("Error archiving task:", error);
    }
  };
 
  const [date, setDate] = useState(new Date());
 
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
 
  const customHeight = '200px';
 
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
 
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 2,
        backgroundColor: "#fffa9d",
        minHeight: "calc(100vh - 160px)",
        maxHeight: "calc(100vh - 160px)",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      {/* Progress Tracker */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#FFFA9D",
          borderRadius: 2,
          padding: 2,
          width: "50%",
        }}
      >
        {/* TaskStatus count */}
        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
          <Grid
            item
            xs={3}
            sx={{
              backgroundColor: '#fff',
              color: 'black',
              padding: 1.5,
              borderRadius: 2,
              textAlign: 'center',
              height: '110px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 0.5,
              marginRight: '10px',
              fontFamily: 'Arial',
              border: '3px solid #E29D3F'
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: '1rem', fontFamily: 'Arial' }} 
            >
              Pending
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontFamily: 'Arial', fontWeight: 'bold'}}
             
            >
              {pendingCount}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              backgroundColor: '#fff',
              color: 'black',
              padding: 1.5,
              borderRadius: 2,
              textAlign: 'center',
              height: '110px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 0.5,
              fontFamily: 'Arial',
              marginRight: '10px',
              border: '3px solid #E29D3F'
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: '1rem', fontFamily: 'Arial' }} 
            >
              Overdue
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontFamily: 'Arial',  fontWeight: 'bold' }} 
            >
              {overdueCount}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              backgroundColor: '#fff',
              color: 'black',
              padding: 1.5,
              borderRadius: 2,
              textAlign: 'center',
              height: '110px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 0.5,
              fontFamily: 'Arial', // Helvetica
              border: '3px solid #E29D3F'
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: '1rem', fontFamily: 'Arial' }} 
            >
              Completed
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontFamily: 'Arial',  fontWeight: 'bold' }} 
            >
              {completedTasks}
            </Typography>
          </Grid>
        </Grid>
        <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 'auto',
              textAlign: 'center',
              paddingRight: '10px',
            }}
          >
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const formattedDate = formatDate(date);
                const hasTask = tasks.some(task => formatDate(task.due_date) === formattedDate);
            
                if (hasTask) {
                  return <span style={{ color: 'red', position: 'relative', bottom: '10px', left: '12px'}}>●</span>; // Render a red dot
                }
              }
              return null;
            }}
          />
    </Box>
 
      </Box>
 
 
{/* To-Do List */}
<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 2,
    backgroundColor: "#ffe79f",
    borderRadius: 2,
    padding: 3,
    width: "50%",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  }}
>
  <Typography
    variant="h5"
    sx={{ textAlign: "center", marginBottom: -1, fontFamily: "Arial" }}
  >
    To Do List
  </Typography>
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      maxHeight: "calc(100vh - 240px)",
      overflowY: "none",
    }}
  >
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontWeight: "bold",
            fontFamily: "Arial",
            color: progress === 0 ? "#000" : "#000",
          }}
        >
          {progress.toFixed(0)}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            flexGrow: 1,
            height: 20,
            borderRadius: 12,
            backgroundColor: "#fff",
            "& .MuiLinearProgress-bar": {
              backgroundColor: progress === 0 ? "#E29D3F" : "#E29D3F",
            },
          }}
        />
      </Box>
      {/* Completion message below the bar */}
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 1,
          fontFamily: "Arial",
          color: progress === 100 ? "#000" : "#000",
        }}
      >
        {progress === 100
    ? "Well Done! All Tasks Completed!"
    : progress === 0
    ? "Nothing done 0%"
    : `Keep going! You’re ${progress.toFixed(0)}% done. Almost there!`}
      </Typography>
      </Box>
    </Box>
    <Box sx={{display: "flex",
      flexDirection: "column",
      gap: 2,
      overflowY: 'auto',
      paddingRight: '16px',}}>
    {tasks.map((task) => (
      <Box
        key={task.task_ID}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: 2,
          border: "1px solid #ccc", // Same border
          padding: 2,
          width: "100%", // Adjust the width as needed
          minHeight: "135px", // Increase the height
        }}
      >
        {/* Priority Indicator (Oval Shape, Color Only) */}
        <Box
          sx={{
            position: "absolute",
            top: 15,
            right: 20,
            padding: "7px 14px",
            borderRadius: 12,
            backgroundColor: getPriorityColor(task.priority),
          }}
        />
 
        {/* Task Details */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            fontFamily: "Arial",
          }}
        >
          {/* Checkbox */}
          <Checkbox
            defaultChecked={false}
            onChange={() => archiveTask(task.task_ID)}
            sx={{
              padding: .1,
              color: "#E29D3F",
              borderRadius: '4px',
              "&.Mui-checked": { color: "#f8b400" }
               }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "0.9rem",
                marginBottom: 0.2,
                fontFamily: "Arial",
                marginLeft: "0px", 
                fontWeight: "bold", 
              }}
            >
            {task.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.80rem",
                color: "#555",
                marginBottom: 2,
                fontFamily: "Arial",
                marginLeft: "0px",
              }}
            >
              {task.description}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "#000000",
                fontFamily: "Arial",
                marginLeft: "0px",
              }}
            >
              Due: {formatDate(task.due_date)} {/* Format the due date */}
            </Typography>
          </Box>
        </Box>
      </Box>
    ))}
    </Box>
</Box>
 
 
    </Box>
  );
};
 
export default Home;
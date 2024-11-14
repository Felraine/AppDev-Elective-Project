import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import TaskEditDialog from "./TaskEditDialog";
import editTaskIcon from "../../assets/images/editTaskIcon.png";

const Tasks = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    creation_date: "",
    due_date: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [buttonsVisible, setButtonsVisible] = useState(true);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (username && token) {
      viewTasks();
    } else {
      setError("You need to be logged in to view tasks.");
    }
  }, []);

  const viewTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tasks/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data);
    } catch (error) {
      setError("Could not fetch tasks. Please try again later.");
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userId: userId,
          },
        }
      );

      if (response.status === 204) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.task_ID !== id)
        );
      }
    } catch (error) {
      console.error("Error in deleting a task: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const addTask = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
    const taskWithDate = { ...task, creation_date: currentDate };

    setError("");
    try {
      await axios.post(
        `http://localhost:8080/api/tasks/user/${userId}/task`,
        taskWithDate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTask({ title: "", description: "", priority: "", due_date: "" });
      viewTasks();
    } catch (error) {
      setError("Adding Task failed. Please try again.");
    }
  };

  const editTask = async (editedTask) => {
    try {
      await axios.put(
        `http://localhost:8080/api/tasks/user/${userId}/task/${editedTask.task_ID}`,
        editedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.task_ID === taskId);
    console.log("Editing task:", taskToEdit);
    setCurrentTask({ ...taskToEdit });
    setIsDialogOpen(true);
  };

  const handleSave = (editedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.task_ID === editedTask.task_ID ? editedTask : task
    );
    setTasks(updatedTasks);

    editTask(editedTask);
  };

  const sortedTasks = tasks.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.due_date) - new Date(b.due_date);
  });

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high":
        return { color: "red" };
      case "medium":
        return { color: "#0056B3" };
      case "low":
        return { color: "green" };
      default:
        return {};
    }
  };

  const priorityOptions = [
    { value: "high", label: "High", color: "red" },
    { value: "medium", label: "Medium", color: "#0056B3" },
    { value: "low", label: "Low", color: "green" },
  ];

  const archiveTask = async (taskId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/archive/${taskId}/user/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.task_ID !== taskId)
      );
    } catch (error) {
      console.error("Error archiving task:", error);
    }
  };

  return (
    <Box
      className="content tasks-content"
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#ffe79f",
        padding: 2,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        maxWidth: "100%",
        margin: "auto",
        maxHeight: "calc(100vh - 160px)",
        minHeight: "calc(100vh - 160px)", 
        height: "auto",
        overflow: "auto",
      }}
    >
      <Box
        className="create-task-form"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
        }}
      >
        <h3>Create New Task</h3>
        <form className="inputTask" onSubmit={addTask}>
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            value={task.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2, backgroundColor: "white" }}
          />
          <TextField
            label="Short description here..."
            variant="outlined"
            name="description"
            value={task.description}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2, backgroundColor: "white" }}
          />
          <TextField
            label="Set Reminder"
            type="datetime-local"
            name="set_reminder"
            value={task.set_reminder}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2, backgroundColor: "white" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                required
                sx={{ marginBottom: 2, backgroundColor: "white" }}
              >
                {priorityOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <span style={{ color: option.color }}>{option.label}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Due Date"
              type="date"
              name="due_date"
              value={task.due_date}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ marginBottom: 2, backgroundColor: "white" }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Add Task
          </Button>
        </form>
      </Box>

      <Box
        className="taskList"
        sx={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
        }}
      >
        <Box
          className="taskHeader"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Recently added tasks</h3>
          <Button
            onClick={() => setButtonsVisible(!buttonsVisible)}
            sx={{ minWidth: "auto" }}
          >
            <img
              src={editTaskIcon}
              alt="Edit"
              style={{ width: "20px", height: "20px" }}
            />
          </Button>
        </Box>

        <Box
          className="scrollableTasks"
          sx={{ maxHeight: 400, overflowY: "auto" }}
        >
          {sortedTasks.map((task) => (
            <Box
              className="taskCard"
              key={task.task_ID}
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: 2,
                marginBottom: 2,
                backgroundColor: "#fff",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <p
                    style={getPriorityStyle(task.priority)}
                  >{`Priority: ${task.priority}`}</p>
                  <p>{`Due Date: ${task.due_date}`}</p>
                </Box>
                {buttonsVisible && (
                  <Box>
                    <Button
                      onClick={() => handleEdit(task.task_ID)}
                      variant="contained"
                      color="secondary"
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteTask(task.task_ID)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </Box>
              <Button
                variant="outlined"
                onClick={() => archiveTask(task.task_ID)}
                sx={{ marginTop: 2 }}
              >
                Complete Task
              </Button>
            </Box>
          ))}
        </Box>
      </Box>

      <TaskEditDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        task={currentTask}
        onSave={handleSave}
      />
    </Box>
  );
};

export default Tasks;

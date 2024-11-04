import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tasks.css";
import editTaskIcon from "../../assets/images/editTaskIcon.png";
import TaskEditDialog from "./TaskEditDialog";

const Tasks = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    creation_date: "",
    due_date: "",
  });

  //Dialog

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [buttonsVisible, setButtonsVisible] = useState(true); //edit task button

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

  //VIEW TASKS
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
      console.log("Fetched tasks:", response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Could not fetch tasks. Please try again later.");
    }
  };

  //DELETE TASK
  const deleteTask = async (id) => {
    try {
      console.log("Current tasks before deletion:", tasks);
      console.log("Deleting task with ID:", id);
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
        console.log("Deleted Task Successfully!");
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.task_ID !== id)
        );
      }
    } catch (error) {
      console.error("Error in deleting a task: ", error.response?.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  //ADD TASK
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
      console.log("Task Added Successfully!");
      setTask({ title: "", description: "", priority: "", due_date: "" });
      viewTasks();
    } catch (error) {
      console.error("Error adding task", error.response || error);
      setError(
        error.response?.data?.message || "Adding Task failed. Please try again."
      );
    }
  };

  //UPDATE TASK
  const editTask = async (editedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/tasks/user/${userId}/task/${editedTask.task_ID}`, 
        editedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error('Error editing task:', error);
      throw error; 
    }
  };
  

  //Edit task button handling
  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.task_ID === taskId);
    setCurrentTask({ ...taskToEdit }); 
    setIsDialogOpen(true);
  };

  //saves edited task
  const handleSave = (editedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.task_ID === editedTask.task_ID ? editedTask : task
    );
    setTasks(updatedTasks);

    try {
      editTask(editedTask); 
      console.log('Task updated successfully');
    } catch (error) {
      console.error('Failed to update task in backend:', error);
    }
   
  };


  //SORTING TASK DEPENDING ON PRIORITY (temporary?)
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

 

  // Archive Task Function
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
    <div className="content tasks-content">
      <div className="create-task-form">
        <h3>Create New Task</h3>
        <form onSubmit={addTask}>
          <div>
            <input
              className="taskTitle"
              type="text"
              name="title"
              placeholder="Title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className="taskDesc"
              type="text"
              name="description"
              placeholder="Short description here..."
              value={task.description}
              onChange={handleChange}
            />
          </div>
          <div className="priorityDueContainer">
            <select
              className="taskPriority"
              name="priority"
              value={task.priority}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Priority
              </option>
              {priorityOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{ color: option.color }}
                >
                  {option.label}
                </option>
              ))}
            </select>

            <label htmlFor="due_date" className="dueDateLabel">
              Due Date:
            </label>
            <input
              className="taskDue"
              type="date"
              name="due_date"
              value={task.due_date}
              onChange={handleChange}
              required
            />
          </div>
          <button className="addTask" type="submit">
            Add Task
          </button>
        </form>
      </div>
      <div className="taskList">
        <div className="taskHeader">
          <h3>Recently added tasks</h3>
          <button
            className="editTaskButton"
            onClick={() => setButtonsVisible(!buttonsVisible)}
          >
            <img src={editTaskIcon} alt="Edit" />
            {buttonsVisible ? "" : ""}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="scrollableTasks">
          {sortedTasks.map((task) => (
            <div className="taskCard" key={task.task_ID}>
              <div className="task-head">
                <input
                  type="checkbox"
                  onChange={() => archiveTask(task.task_ID)}
                />
                <strong style={{ color: "#514538", marginLeft: "10px" }}>
                  {task.title}
                </strong>
                <span
                  style={getPriorityStyle(task.priority)}
                  className="task-priority"
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </span>
              </div>
              <div>
                <p className="task-desc">{task.description}</p>
                <div className="taskdue-final">
                  <p>Due on: {task.due_date}</p>

                  <div className="taskButtons">
                    {buttonsVisible && (
                      <>
                        <button onClick={() => handleEdit(task.task_ID)}>
                          Edit
                        </button>
                        <button onClick={() => deleteTask(task.task_ID)}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
         {/* MUI Dialog for editing tasks */}
      <TaskEditDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        task={currentTask}
      />
      </div>
    </div>
  );
};

export default Tasks;
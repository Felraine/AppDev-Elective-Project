import React, { useState } from "react";

function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const taskWithDate = {
            title,
            description,
            priority,
            due_date: dueDate, // Match the property name expected in the backend
        };

        try {
            const response = await fetch("http://localhost:8080/api/tasks/task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskWithDate),
            });

            if (response.ok) {
                const savedTask = await response.json();
                console.log("Task saved successfully:", savedTask);
                // Optionally reset form fields or handle the response
                setTitle("");
                setDescription("");
                setPriority("");
                setDueDate("");
            } else {
                console.error("Error saving task:", response.statusText);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <input
                type="text"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                placeholder="Priority"
                required
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;

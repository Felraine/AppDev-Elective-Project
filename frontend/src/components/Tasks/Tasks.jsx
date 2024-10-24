import React, { useState } from 'react';
import axios from 'axios'; 


const Tasks = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const task = {
      title,
      description,
      priority,
      creation_date: creationDate,
      due_date: dueDate,
    };

    try {
     
      await axios.post('http://localhost:5177/api/tasks', task);
      setMessage('Task added successfully!');
      
      setTitle('');
      setDescription('');
      setPriority('');
      setCreationDate('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding task:', error);
      setMessage('Failed to add task. Please try again.');
    }
  };

  return (
    /* Dont change className */
    <div className="content tasks-content">
      <h2>Add your content here</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        />
        <input
          type="date"
          value={creationDate}
          onChange={(e) => setCreationDate(e.target.value)}
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default Tasks;

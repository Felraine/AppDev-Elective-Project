import React from 'react';
import './TaskReminder.css';

const TaskReminder = () => {
  return (
    <div className="task-reminder">
      <h2 className="reminder-title">Task Reminders</h2>
      <div className="reminder-list">
        <p className="reminder-item">Meeting with team at 10 AM</p>
        <p className="reminder-item">Submit report by 5 PM</p>
        <p className="reminder-item">Check emails</p>
      </div>
      <button className="add-reminder-button">Add New Reminder</button>
    </div>
  );
};

export default TaskReminder;

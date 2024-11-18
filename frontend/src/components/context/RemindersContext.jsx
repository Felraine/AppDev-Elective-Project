// RemindersContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const RemindersContext = createContext();

export const RemindersProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Add a new reminder to the list
  const addReminder = (reminder) => {
    setReminders((prevReminders) => [...prevReminders, reminder]);
  };

  // Delete a reminder from the list
  const deleteReminder = (id) => {
    setReminders((prevReminders) => prevReminders.filter((reminder) => reminder.id !== id));
  };

  // Check if the reminder due time has passed
  useEffect(() => {
    const interval = setInterval(() => {
      const dueReminders = reminders.filter(
        (reminder) => new Date(reminder.dueTime) <= new Date() && !reminder.completed
      );
      setNotificationCount(dueReminders.length); // Update notification count when reminder is due
    }, 1000); // Check every second, or adjust the interval as needed

    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, [reminders]); // Re-run the effect if reminders change

  return (
    <RemindersContext.Provider value={{ reminders, addReminder, deleteReminder, notificationCount }}>
      {children}
    </RemindersContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const RemindersContext = createContext();

// Context provider component
export const RemindersProvider = ({ children }) => {
  // State for reminders and notification count
  const [reminders, setReminders] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // useEffect to check reminders every minute
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      // Filter reminders that are due (before the current time)
      const dueReminders = reminders.filter(
        (reminder) => new Date(reminder.set_reminder) <= now
      );

      console.log("Current Time:", now); // Debug: Check current time
      console.log("Due Reminders:", dueReminders); // Debug: See due reminders

      // Set the notification count to the number of due reminders
      setNotificationCount(dueReminders.length);
    };

    // Set an interval to check reminders every 60 seconds (1 minute)
    const interval = setInterval(checkReminders, 60000);

    // Cleanup interval when the component unmounts
    return () => clearInterval(interval);
  }, [reminders]); // Re-run the effect whenever the reminders list changes

  // Function to add reminders
  const addReminder = (newReminder) => {
    setReminders((prevReminders) => [...prevReminders, newReminder]);
  };

  return (
    <RemindersContext.Provider value={{ reminders, addReminder, notificationCount }}>
      {children}
    </RemindersContext.Provider>
  );
};

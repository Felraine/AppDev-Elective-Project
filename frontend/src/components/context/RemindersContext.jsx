import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const RemindersContext = createContext();

export const RemindersProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Dummy reminder data for testing (you can replace this with your own reminder logic)
  const dummyReminders = [
    {
      id: 1,
      text: 'Test reminder',
      dueDate: new Date().getTime() + 5000, // Set to 5 seconds from now for testing
    },
    {
      id: 2,
      text: 'Past reminder',
      dueDate: new Date().getTime() - 1000, // Set to 1 second ago (for testing)
    },
  ];

  useEffect(() => {
    // Initially set reminders (replace with your own reminder data logic)
    setReminders(dummyReminders);

    // This will be used to check reminders' due dates
    const checkReminderStatus = () => {
      let count = 0;

      reminders.forEach(reminder => {
        const currentTime = new Date().getTime();

        // Increment count if the current time is greater than or equal to the reminder's dueDate
        if (currentTime >= reminder.dueDate) {
          count += 1;
        }
      });

      setNotificationCount(count); // Update notification count based on reminders due
    };

    // Check reminders immediately when component is mounted
    checkReminderStatus();

    // Check reminders every second
    const intervalId = setInterval(() => {
      checkReminderStatus();
    }, 1000);  // Check every second (adjust as necessary)

    // Clear the interval on cleanup
    return () => clearInterval(intervalId);

  }, [reminders]); // Trigger this when reminders are updated

  return (
    <RemindersContext.Provider value={{ notificationCount }}>
      {children}
    </RemindersContext.Provider>
  );
};

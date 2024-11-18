import React, { useContext } from 'react';
import { RemindersContext } from '../context/RemindersContext';
import { Button } from '@mui/material';

const Notif = () => {
  const { notificationCount } = useContext(RemindersContext);

  return (
    <Button variant="contained" color="secondary" sx={{ position: 'relative' }}>
      Notifications
      {notificationCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '4px 8px',
            fontSize: '12px',
          }}
        >
          {notificationCount}
        </span>
      )}
    </Button>
  );
};

export default Notif;

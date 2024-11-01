import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const TaskEditDialog = ({ open, onClose, onSave, task }) => {
    const [editedTask, setEditedTask] = useState(task);
  
    useEffect(() => {
      setEditedTask(task);
    }, [task]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedTask({ ...editedTask, [name]: value });
    };
  
    const handleSave = () => {
      onSave(editedTask);
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={editedTask.title || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={editedTask.description || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="due_date"
            label="Due Date"
            type="date"
            fullWidth
            variant="outlined"
            value={editedTask.due_date || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default TaskEditDialog;
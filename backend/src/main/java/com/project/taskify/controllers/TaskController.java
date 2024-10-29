package com.project.taskify.controllers;

import com.project.taskify.models.TaskEntity;
import com.project.taskify.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import javax.naming.NameNotFoundException;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // CREATE - Add a task for a specific user
    @PostMapping("/user/{userId}/task")
    public ResponseEntity<TaskEntity> addTask(@PathVariable int userId, @RequestBody TaskEntity task) {
        try {
            TaskEntity savedTask = taskService.saveTask(userId, task);
            return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
        } catch (NameNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // READ - Get tasks by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TaskEntity>> getTasksByUserId(@PathVariable int userId) {
        List<TaskEntity> tasks = taskService.getTasksByUserId(userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    // UPDATE - Update task details
    @PutMapping("/{id}")
    public TaskEntity putTaskDetails(@PathVariable int id, @RequestBody TaskEntity newTaskDetails) throws NameNotFoundException {
        return taskService.putTaskDetails(id, newTaskDetails);
    }

    // DELETE - Delete task
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable int id) {
        String result = taskService.deleteTask(id);
        if (result.contains("successfully")) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }
    }
}

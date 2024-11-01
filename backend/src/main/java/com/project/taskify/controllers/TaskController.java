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

    // CREATE
    @PostMapping("/user/{userId}/task")
    public ResponseEntity<TaskEntity> addTask(@PathVariable int userId, @RequestBody TaskEntity task) {
        try {
            TaskEntity savedTask = taskService.saveTask(userId, task);
            return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
        } catch (NameNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // READ
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TaskEntity>> getTasksByUserId(@PathVariable int userId) {
        List<TaskEntity> tasks = taskService.getTasksByUserId(userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    // UPDATE
    @PutMapping("/user/{userId}/task/{taskId}")
    public ResponseEntity<TaskEntity> putTaskDetails( @PathVariable int userId,@PathVariable int taskId,
    @RequestBody TaskEntity newTaskDetails) throws NameNotFoundException {
        
        System.out.println("Editing task with ID: " + taskId + " for user with ID: " + userId);
        try {
            TaskEntity updatedTask = taskService.putTaskDetails(taskId, newTaskDetails);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } catch (NameNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable int id, @RequestHeader("userId") int userId) {
        try {
            taskService.deleteTask(id, userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (NameNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

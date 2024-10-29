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

    public TaskController(){
        
    }

    // CREATE
    @PostMapping("/task")
    public ResponseEntity<TaskEntity> addTask(@RequestBody TaskEntity task) {
        TaskEntity savedTask = taskService.saveTask(task);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    // READ
    @GetMapping
    public ResponseEntity<List<TaskEntity>> getAllTasks() {
        List<TaskEntity> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    //UPDATE
    @PutMapping("/{id}")
    public TaskEntity putTaskDetails(@PathVariable int id, @RequestBody TaskEntity newTaskDetails) throws NameNotFoundException{
        return taskService.putTaskDetails(id,newTaskDetails);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable int id) {
        try {
        	taskService.deleteTask(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

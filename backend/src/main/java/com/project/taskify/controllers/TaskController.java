// TaskController.java
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
    public TaskEntity putTaskDetails(@RequestParam int id, @RequestBody TaskEntity newTaskDetails) throws NameNotFoundException{
        return taskService.putTaskDetails(id,newTaskDetails);
    }

    //DELETE
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable int id){
    return taskService.deleteTask(id);
    }
}

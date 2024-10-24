package com.project.taskify.controllers;
import com.project.taskify.models.TaskEntity;
import com.project.taskify.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    //CREATE
    @PostMapping("/task")
    public ResponseEntity<TaskEntity> addTask(@RequestBody TaskEntity task) {
        TaskEntity savedTask = taskService.saveTask(task);
        return ResponseEntity.ok(savedTask);
    }

     
}

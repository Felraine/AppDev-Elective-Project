package com.project.taskify.controllers;

import com.project.taskify.models.ArchivedTaskEntity;
import com.project.taskify.services.ArchiveService;
import com.project.taskify.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/archive")
@CrossOrigin(origins = "http://localhost:5173")
public class ArchiveController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private ArchiveService archiveService;

    @PutMapping("/{taskId}/user/{userId}")
    public ResponseEntity<Void> archiveTask(@PathVariable int taskId, @PathVariable int userId) {
        try {
            taskService.archiveTask(taskId, userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ArchivedTaskEntity>> getArchivedTasksByUserId(@PathVariable int userId) {
        List<ArchivedTaskEntity> tasks = archiveService.getArchivedTasksByUserId(userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
}

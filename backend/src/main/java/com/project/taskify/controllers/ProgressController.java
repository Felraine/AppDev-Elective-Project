package com.project.taskify.controllers;

import com.project.taskify.models.ProgressEntity;
import com.project.taskify.services.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "http://localhost:5173")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<ProgressEntity> getProgressByUserId(@PathVariable Long userId) {
        ProgressEntity progress = progressService.getProgressByUserId(userId);
        return progress != null ? new ResponseEntity<>(progress, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<ProgressEntity> createProgress(@RequestBody ProgressEntity progress) {
        ProgressEntity createdProgress = progressService.createProgress(progress);
        return new ResponseEntity<>(createdProgress, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<ProgressEntity> updateProgress(@RequestBody ProgressEntity progress) {
        ProgressEntity updatedProgress = progressService.updateProgress(progress);
        return new ResponseEntity<>(updatedProgress, HttpStatus.OK);
    }
}
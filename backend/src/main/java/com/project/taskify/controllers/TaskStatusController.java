package com.project.taskify.controllers;

import java.util.Optional;
import java.util.List;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.taskify.models.TaskStatusEntity;
import com.project.taskify.services.TaskStatusService;
import com.project.taskify.repositories.*;

@RestController
@RequestMapping(method = RequestMethod.GET,path="/api/tasks/status")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskStatusController {
	
	@Autowired
	private TaskStatusService tsServ;

    @Autowired
    private TaskStatusRepository tsRepo;
	
	public TaskStatusController() {
		
	}
	
	//create task status
	@PostMapping("/add")
	public ResponseEntity<TaskStatusEntity> createTaskStatus(@RequestBody TaskStatusEntity taskStatus) {
        try {
            TaskStatusEntity createdTaskStatus = tsServ.createTaskStatus(taskStatus);
            return new ResponseEntity<>(createdTaskStatus, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}
	
	//view task status
	@GetMapping("/{statusId}")
    public ResponseEntity<TaskStatusEntity> getTaskStatusById(@PathVariable int statusId) {
        Optional<TaskStatusEntity> taskStatus = tsServ.getTaskStatusById(statusId);
        if (taskStatus.isPresent()) {
            return new ResponseEntity<>(taskStatus.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
   
    @GetMapping("/statuses")
    public ResponseEntity<List<TaskStatusEntity>> getAllTaskStatuses() {
        List<TaskStatusEntity> taskStatuses = tsServ.getAllTaskStatuses();
        return ResponseEntity.ok(taskStatuses);
    }

    @GetMapping("/statuses/count/{userId}")
    public List<TaskStatusEntity> getTaskStatuses(@PathVariable int userId) {
        return tsRepo.findAllByTask_User_UserId(userId);  // Ensure this returns a List<TaskStatusEntity>
    }

	//update task status
	@PutMapping("/update/{statusId}")
    public ResponseEntity<TaskStatusEntity> updateTaskStatus(@PathVariable int statusId, @RequestBody TaskStatusEntity taskStatus) throws NameNotFoundException{
        try {
            TaskStatusEntity updatedTaskStatus = tsServ.updateTaskStatus(statusId, taskStatus);
            return new ResponseEntity<>(updatedTaskStatus, HttpStatus.OK);
        } catch (NameNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@DeleteMapping("/delete/{statusId}")
    public ResponseEntity<HttpStatus> deleteTaskStatus(@PathVariable int statusId) {
        try {
        	tsServ.deleteTaskStatus(statusId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
}

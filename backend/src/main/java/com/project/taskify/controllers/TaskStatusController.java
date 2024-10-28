package com.project.taskify.controller;

import java.util.Optional;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

@RestController
@RequestMapping(method = RequestMethod.GET,path="/api/tasks/status")
public class TaskStatusController {
	
	@Autowired
	private TaskStatusService tsServ;
	
	public TaskStatusController() {
		
	}
	
	//create task status
	@PostMapping("/add")
	public ResponseEntity<TaskStatusEntity> createTaskStatus(@RequestBody TaskStatusEntity taskStatus) {
	     TaskStatusEntity savedTaskStatus = tsServ.saveTaskStatus(taskStatus);
	     return new ResponseEntity<>(savedTaskStatus, HttpStatus.CREATED);
	}
	
	//view task status
	@GetMapping("/{id}")
    public ResponseEntity<TaskStatusEntity> getTaskStatusById(@PathVariable int id) {
        Optional<TaskStatusEntity> taskStatus = tsServ.findById(id);
        if (taskStatus.isPresent()) {
            return new ResponseEntity<>(taskStatus.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	
	//update task status
	@PutMapping("/update/{id}")
    public ResponseEntity<TaskStatusEntity> updateTaskStatus(@PathVariable int id, @RequestBody TaskStatusEntity taskStatus) throws NameNotFoundException{
        TaskStatusEntity updatedTaskStatus = tsServ.putTaskStatusDetails(id, taskStatus);
        return new ResponseEntity<>(updatedTaskStatus, HttpStatus.OK);
    }
	
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteTaskStatus(@PathVariable int id) {
        try {
        	tsServ.deleteTaskStatus(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
}

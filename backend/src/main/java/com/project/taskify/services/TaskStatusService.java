package com.project.taskify.services;

import java.util.NoSuchElementException;
import java.util.Optional;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.taskify.models.TaskStatusEntity;
import com.project.taskify.repositories.TaskStatusRepository;

@Service
public class TaskStatusService {
	
	@Autowired
	private TaskStatusRepository tsrepo;
	
	public TaskStatusService() {
		super();
	}
	
	//create task status
	public TaskStatusEntity saveTaskStatus(TaskStatusEntity taskStat) {
		return tsrepo.save(taskStat);
	}

	//view task status
	public Optional<TaskStatusEntity> findById(int status_ID){
		return tsrepo.findById(status_ID);
	}
	
	//update task status
	public TaskStatusEntity putTaskStatusDetails(int status_ID, TaskStatusEntity newTaskStatusDetails) throws NameNotFoundException{
		TaskStatusEntity tStat = new TaskStatusEntity();
		
		try {
			tStat = tsrepo.findById(status_ID).get();
			
			tStat.setStatus(newTaskStatusDetails.getStatus());
			tStat.setLast_updated(newTaskStatusDetails.getLast_updated());
			
		}catch(NoSuchElementException nex) {
			throw new NameNotFoundException("This Task has no Status");
		}return tsrepo.save(tStat);
	}
	
	//delete task status
	public String deleteTaskStatus(int id) {
		String msg;
		
		if(tsrepo.existsById(id)) {
			tsrepo.deleteById(id);
			msg="Task Status Deleted!";
		}else {
			msg="Task Status not found!";
		}
		return msg;
	}
		
}

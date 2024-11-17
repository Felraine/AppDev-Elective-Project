package com.project.taskify.services;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Date;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.taskify.models.TaskEntity;
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
	public TaskStatusEntity createTaskStatus(TaskStatusEntity taskStatus) {
		TaskEntity task = taskStatus.getTask();
		String status = determineTaskStatus(task);
		taskStatus.setStatus(status);
		return tsrepo.save(taskStatus);
	}

	//view task status
	public Optional<TaskStatusEntity> getTaskStatusById(int statusId){
		return tsrepo.findById(statusId);
	}
	
	//update task status
	public TaskStatusEntity updateTaskStatus(int statusId, TaskStatusEntity newTaskStatus) throws NameNotFoundException{
		TaskStatusEntity tStat;
		
		try {
			tStat = tsrepo.findById(statusId).get();
			
			tStat.setStatus(newTaskStatus.getStatus());
			tStat.setLast_updated(newTaskStatus.getLast_updated());
			
		}catch(NoSuchElementException nex) {
			throw new NameNotFoundException("This Task has no Status");
		}return tsrepo.save(tStat);
	}
	
	//delete task status
	public String deleteTaskStatus(int statusId) {
		String msg;
		
		if(tsrepo.existsById(statusId)) {
			tsrepo.deleteById(statusId);
			msg="Task Status Deleted!";
		}else {
			msg="Task Status not found!";
		}
		return msg;
	}

	//Determines Task
	private String determineTaskStatus(TaskEntity task){
		Date currentDate = new Date();

		if(task.getDue_date().before(currentDate)){
			return "Overdue";
		}else{
			return "Pending";
		}
	}
		
}

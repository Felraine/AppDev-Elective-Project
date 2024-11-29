package com.project.taskify.services;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.taskify.models.TaskEntity;
import com.project.taskify.models.TaskStatusEntity;
import com.project.taskify.models.ArchivedTaskEntity;
import com.project.taskify.repositories.TaskStatusRepository;
import com.project.taskify.repositories.ArchivedTaskRepository;

@Service
public class TaskStatusService {
	
	@Autowired
	private TaskStatusRepository tsrepo;

	@Autowired
	private ArchivedTaskRepository archivedRepo;
	
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
	public String determineTaskStatus(TaskEntity task){
		Date currentDate = new Date();

		if(isTaskArchived(task.getTask_ID())){
			return "Completed";
		}else if(task.getDue_date().before(currentDate)){
			return "Overdue";
		}else{
			return "Pending";
		}
	}

	//checks if it is already in the archieve
	private boolean isTaskArchived(int task_ID){
		List<ArchivedTaskEntity> archivedTasks = archivedRepo.findByUserId(task_ID);
		return !archivedTasks.isEmpty();
	}

	//all status
	public List<TaskStatusEntity> getAllTaskStatuses() {
		return tsrepo.findAll();
	}

	public Map<String, Long> countTaskStatusesByUser(int userId) {
    List<TaskStatusEntity> userTasks = tsrepo.findAllByTask_User_UserId(userId);

    Map<String, Long> statusCounts = new HashMap<>();
    statusCounts.put("Pending", userTasks.stream().filter(task -> "Pending".equals(task.getStatus())).count());
    statusCounts.put("Overdue", userTasks.stream().filter(task -> "Overdue".equals(task.getStatus())).count());
    statusCounts.put("Completed", userTasks.stream().filter(task -> "Completed".equals(task.getStatus())).count());

    return statusCounts;
}
}

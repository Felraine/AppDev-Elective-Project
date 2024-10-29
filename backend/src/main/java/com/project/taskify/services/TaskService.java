package com.project.taskify.services;

import com.project.taskify.models.TaskEntity;
import com.project.taskify.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public TaskService() {
        super();
    }

    // CREATE
    public TaskEntity saveTask(TaskEntity task) {
        return taskRepository.save(task);
    }

    // READ
    public List<TaskEntity> getAllTasks() {
        return taskRepository.findAll();
    }

    //UPDATE
    public TaskEntity putTaskDetails(int id, TaskEntity newTaskDetails) throws NameNotFoundException{
        TaskEntity task;

        try{
            task = taskRepository.findById(id).get();

            task.setTitle(newTaskDetails.getTitle());
            task.setDescription(newTaskDetails.getDescription());
            task.setPriority(newTaskDetails.getPriority());
            task.setCreation_date(newTaskDetails.getCreation_date());
            task.setDue_date(newTaskDetails.getDue_date());
        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Task with ID " + id + " not found");
        }
        return taskRepository.save(task);
    }

    //DELETE
    public String deleteTask(int id){
        String msg;
        if(taskRepository.existsById(id)){
            taskRepository.deleteById(id);
            msg = "Task Deleted Successfully???";
        } else {
            msg = id + " not found";
        }
        return msg;
    }
}

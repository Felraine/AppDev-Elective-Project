package com.project.taskify.services;

import com.project.taskify.models.TaskEntity;
import com.project.taskify.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public TaskService(){
        super();
    }

    public TaskEntity saveTask(TaskEntity task) {
        return taskRepository.save(task);
    }

    //READ
    public List<TaskEntity> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<TaskEntity> findById(int task_ID) {
        return taskRepository.findById(task_ID);
    }
    

    public Optional<TaskEntity> findByTitle(String title) {
        return taskRepository.findByTitle(title);
    }



    public List<TaskEntity> findAllTasks() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllTasks'");
    }

   /*  public List<TaskEntity> getAllTasks() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllTasks'");
    }*/

}

package com.project.taskify.services;

import com.project.taskify.models.TaskEntity;
import com.project.taskify.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public TaskEntity saveTask(TaskEntity task) {
        return taskRepository.save(task);
    }

    public Optional<TaskEntity> findById(int task_ID) {
        return taskRepository.findById(task_ID);
    }
    

    public Optional<TaskEntity> findByTitle(String title) {
        return taskRepository.findByTitle(title);
    }

}

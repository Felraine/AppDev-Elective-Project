package com.project.taskify.services;

import com.project.taskify.models.TaskEntity;
import com.project.taskify.models.UserEntity;
import com.project.taskify.repositories.TaskRepository;
import com.project.taskify.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.naming.NameNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    // CREATE - Save task associated with a user
    public TaskEntity saveTask(int userId, TaskEntity task) throws NameNotFoundException {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new NameNotFoundException("User not found with ID: " + userId));
        task.setUser(user);
        return taskRepository.save(task);
    }

    // READ
    public List<TaskEntity> getTasksByUserId(int userId) {
        List<TaskEntity> tasks = taskRepository.findByUser_UserId(userId);
        System.out.println("Retrieved " + tasks.size() + " tasks for user " + userId);
        tasks.forEach(task -> System.out.println("Task ID: " + task.getTask_ID() + ", Title: " + task.getTitle()));
        return tasks;
    }

    // UPDATE
    public TaskEntity putTaskDetails(int id, TaskEntity newTaskDetails) throws NameNotFoundException {
        TaskEntity task;
        try {
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

    // DELETE
    public String deleteTask(int id, int userId) throws NameNotFoundException {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new NameNotFoundException("Task with ID " + id + " not found"));

        if (task.getUser().getUserId() != userId) {
            throw new NameNotFoundException("You are not authorized to delete this task.");
        }

        taskRepository.deleteById(id);
        return "Task Deleted Successfully";
    }
}

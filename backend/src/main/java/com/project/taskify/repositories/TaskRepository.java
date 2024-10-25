package com.project.taskify.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.taskify.models.TaskEntity;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<TaskEntity, Integer>{
    
    Optional<TaskEntity> findByTitle(String title);
}

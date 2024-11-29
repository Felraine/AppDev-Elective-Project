package com.project.taskify.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.taskify.models.TaskEntity;
import com.project.taskify.models.TaskStatusEntity;

@Repository
public interface TaskStatusRepository extends JpaRepository<TaskStatusEntity, Integer>{
	Optional<TaskStatusEntity> findByStatusId(int statusId);
	List<TaskStatusEntity> findAllByTask_User_UserId(int userId);
	Optional<TaskStatusEntity> findByTask(TaskEntity task);
}

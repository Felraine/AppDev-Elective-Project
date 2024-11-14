package com.project.taskify.repositories;

import com.project.taskify.models.ProgressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressRepository extends JpaRepository<ProgressEntity, Long> {
    ProgressEntity findByUserId(Long userId); // Ensure this method exists
}
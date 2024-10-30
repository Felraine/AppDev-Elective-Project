package com.project.taskify.repositories;

import com.project.taskify.models.ArchivedTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ArchivedTaskRepository extends JpaRepository<ArchivedTaskEntity, Integer> {
    List<ArchivedTaskEntity> findByUserId(int userId);
}

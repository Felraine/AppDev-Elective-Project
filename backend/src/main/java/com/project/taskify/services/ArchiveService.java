package com.project.taskify.services;

import com.project.taskify.models.ArchivedTaskEntity;
import com.project.taskify.repositories.ArchivedTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ArchiveService {

    @Autowired
    private ArchivedTaskRepository archivedTaskRepository;

    public ArchivedTaskEntity saveArchivedTask(ArchivedTaskEntity archivedTask) {
        return archivedTaskRepository.save(archivedTask);
    }

    public List<ArchivedTaskEntity> getArchivedTasksByUserId(int userId) {
        return archivedTaskRepository.findByUserId(userId);
    }
}

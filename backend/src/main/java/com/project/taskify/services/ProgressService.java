package com.project.taskify.services;

import com.project.taskify.models.ProgressEntity;
import com.project.taskify.repositories.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    public ProgressEntity getProgressByUserId(Long userId) {
        return progressRepository.findByUserId(userId);
    }

    public ProgressEntity createProgress(ProgressEntity progress) {
        return progressRepository.save(progress);
    }

    public ProgressEntity updateProgress(ProgressEntity progress) {
        return progressRepository.save(progress);
    }
}

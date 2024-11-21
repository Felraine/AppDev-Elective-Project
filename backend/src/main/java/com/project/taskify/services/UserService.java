package com.project.taskify.services;

import com.project.taskify.models.UserEntity;
import com.project.taskify.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Save a new user
    public UserEntity saveUser(UserEntity user) {
        // Check if the user already exists in the database
        Optional<UserEntity> existingUserOptional = userRepository.findById(user.getUserId());
    
        if (existingUserOptional.isPresent()) {
            UserEntity existingUser = existingUserOptional.get();
    
            // If no new password is provided, retain the old one
            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                user.setPassword(existingUser.getPassword());
            } else if (!user.getPassword().startsWith("$2a$")) { // Prevent re-hashing if already hashed
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            }
        } else if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            // Hash the password for new users
            if (!user.getPassword().startsWith("$2a$")) { // Prevent re-hashing if already hashed
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            }
        }
    
        return userRepository.save(user);
    }    
    

    // Find user by username
    public Optional<UserEntity> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Get all users
    public List<UserEntity> findAllUsers() {
        return userRepository.findAll();
    }

    // Find user by ID
    public Optional<UserEntity> findById(int id) {
        return userRepository.findById(id);
    }

    // Update user information, including username (but don't update the password unless it has been changed)
    public UserEntity updateUser(int userId, UserEntity updatedUser) {
        Optional<UserEntity> existingUserOptional = userRepository.findById(userId);
        if (existingUserOptional.isPresent()) {
            UserEntity existingUser = existingUserOptional.get();
    
            // Update username only if it's provided and not empty
            if (updatedUser.getUsername() != null && !updatedUser.getUsername().isEmpty()) {
                existingUser.setUsername(updatedUser.getUsername());
            }
    
            // Update password only if it's provided, needs to be changed, and isn't already hashed
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                if (!updatedUser.getPassword().startsWith("$2a$")) { // Avoid re-hashing already hashed passwords
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }
            }
    
            return userRepository.save(existingUser);
        }
        return null; // Or throw an exception, depending on how you want to handle it
    }    
}

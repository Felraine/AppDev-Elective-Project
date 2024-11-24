package com.project.taskify.controllers;

import com.project.taskify.models.UserEntity;
import com.project.taskify.services.UserService;

import io.jsonwebtoken.io.IOException;

import com.project.taskify.security.JwtUtil;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<UserEntity> signup(@RequestBody UserEntity user) {
        UserEntity savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity user) {
        UserEntity existingUser = userService.findByUsername(user.getUsername()).orElse(null);
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username not found");
        }

        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
        }

        String token = generateToken(existingUser);
        return ResponseEntity.ok(new LoginResponse(token, existingUser.getUsername(), existingUser.getUserId()));
    }

    private String generateToken(UserEntity user) {
        return jwtUtil.generateToken(user.getUsername());
    }

    @PutMapping("/update")
    public ResponseEntity<UpdateProfileResponse> updateUserProfile(
            @RequestBody UserEntity updatedUser,
            @RequestHeader("Authorization") String token) {
        try {
            String username = jwtUtil.extractUsername(token.substring(7));
            UserEntity existingUser = userService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (updatedUser.getUsername() != null && !updatedUser.getUsername().isEmpty()) {
                existingUser.setUsername(updatedUser.getUsername());
            }
            if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty()) {
                existingUser.setEmail(updatedUser.getEmail());
            }

            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }

            UserEntity savedUser = userService.saveUser(existingUser);
            String newToken = jwtUtil.generateToken(savedUser.getUsername());

            return ResponseEntity.ok(new UpdateProfileResponse(savedUser, newToken));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> updatePassword(
            @RequestBody PasswordChangeRequest request,
            @RequestHeader("Authorization") String token) {
        try {
            String username = jwtUtil.extractUsername(token.substring(7));
            UserEntity user = userService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Current password is incorrect.");
            }

            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userService.saveUser(user);

            return ResponseEntity.ok("Password updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating password: " + e.getMessage());
        }
    }

    private static class UpdateProfileResponse {
        private UserEntity user;
        private String token;

        public UpdateProfileResponse(UserEntity user, String token) {
            this.user = user;
            this.token = token;
        }

        public UserEntity getUser() {
            return user;
        }

        public String getToken() {
            return token;
        }
    }

    public static class PasswordChangeRequest {
        private String currentPassword;
        private String newPassword;

        public String getCurrentPassword() {
            return currentPassword;
        }

        public void setCurrentPassword(String currentPassword) {
            this.currentPassword = currentPassword;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }

    private static class LoginResponse {
        private String token;
        private String username;
        private int userId;

        public LoginResponse(String token, String username, int userId) {
            this.token = token;
            this.username = username;
            this.userId = userId;
        }

        public String getToken() {
            return token;
        }

        public String getUsername() {
            return username;
        }

        public int getUserId() {
            return userId;
        }
    }

    @PutMapping("/update-profile-picture")
    public ResponseEntity<?> updateProfilePicture(
            @RequestParam("profilePicture") MultipartFile profilePicture,
            @RequestHeader("Authorization") String token) {
        try {
            // Validate the token format
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token format");
            }

            // Extract the username from the JWT token
            String username = jwtUtil.extractUsername(token.substring(7));

            // Find the user by username
            UserEntity existingUser = userService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Update the profile picture using the service method
            UserEntity updatedUser = userService.updateProfilePicture(existingUser.getUserId(), profilePicture);

            // Return the updated user with the new profile picture (you can return only relevant fields if needed)
            return ResponseEntity.ok(updatedUser);
        } catch (IOException e) {
            // Handle IO exceptions specifically
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading the profile picture: " + e.getMessage());
        } catch (RuntimeException e) {
            // Handle user not found or other runtime exceptions
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Catch all other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating profile picture: " + e.getMessage());
        }
    }

    @GetMapping("/profile-picture/{userId}")
    public ResponseEntity<String> getProfilePicture(@PathVariable int userId) {
        UserEntity user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        byte[] profilePictureBytes = user.getProfilePicture();

        if (profilePictureBytes != null) {
            // Convert byte array to base64
            String base64Image = Base64.getEncoder().encodeToString(profilePictureBytes);
            return ResponseEntity.ok(base64Image);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile picture not found");
        }
    }   
}

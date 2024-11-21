package com.project.taskify.controllers;

import com.project.taskify.models.UserEntity;
import com.project.taskify.services.UserService;
import com.project.taskify.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    // Endpoint for user signup
    @PostMapping("/signup")
    public ResponseEntity<UserEntity> signup(@RequestBody UserEntity user) {
        // Save the user to the database and return the saved user as a response
        UserEntity savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    // Endpoint for user login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity user) {
        // Check if the user exists
        UserEntity existingUser = userService.findByUsername(user.getUsername()).orElse(null);
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username not found");
        }

        // Validate the password
        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
        }

        // Generate JWT token for the user
        String token = generateToken(existingUser);
        return ResponseEntity.ok(new LoginResponse(token, existingUser.getUsername(), existingUser.getUserId()));
    }


    // Method to generate JWT token
    private String generateToken(UserEntity user) {
        return jwtUtil.generateToken(user.getUsername());  // Ensure this uses the updated username
    }

    // Endpoint for updating user profile
    @PutMapping("/update")
    public ResponseEntity<UpdateProfileResponse> updateUserProfile(
            @RequestBody UserEntity updatedUser,
            @RequestHeader("Authorization") String token) {
        try {
            // Extract username from the JWT token
            String username = jwtUtil.extractUsername(token.substring(7));
            UserEntity existingUser = userService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Update fields only if they are provided
            if (updatedUser.getUsername() != null && !updatedUser.getUsername().isEmpty()) {
                existingUser.setUsername(updatedUser.getUsername());
            }
            if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty()) {
                existingUser.setEmail(updatedUser.getEmail());
            }
            // Update password only if it is provided
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }

            // Save the updated user
            UserEntity savedUser = userService.saveUser(existingUser);

            // Generate a new JWT token with the updated username (if it was changed)
            String newToken = jwtUtil.generateToken(savedUser.getUsername());

            // Return the updated user and new token
            return ResponseEntity.ok(new UpdateProfileResponse(savedUser, newToken));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    // Response structure for profile update
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

    // Response structure for login
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
}

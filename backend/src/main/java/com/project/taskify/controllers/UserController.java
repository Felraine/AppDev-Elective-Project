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

    @PostMapping("/signup")
    public ResponseEntity<UserEntity> signup(@RequestBody UserEntity user) {
        UserEntity savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity user) {
        UserEntity existingUser = userService.findByUsername(user.getUsername()).orElse(null);
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        String token = generateToken(existingUser);
        return ResponseEntity.ok(new LoginResponse(token, existingUser.getUsername(), existingUser.getUserId())); // Include userId
    }
    
    private String generateToken(UserEntity user) {
        return jwtUtil.generateToken(user.getUsername());
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
}

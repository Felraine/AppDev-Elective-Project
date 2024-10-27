package com.project.taskify.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/signup", "/api/users/login").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/users/all").permitAll() 
                .requestMatchers(HttpMethod.GET, "/api/users/**").permitAll() 
                .requestMatchers(HttpMethod.POST, "/api/tasks/task").permitAll()
                .anyRequest().authenticated() 
            );

        return http.build();
    }
}

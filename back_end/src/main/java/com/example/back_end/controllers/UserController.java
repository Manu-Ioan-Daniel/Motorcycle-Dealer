package com.example.back_end.controllers;


import com.example.back_end.models.UserAccount;
import com.example.back_end.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserAccount>> findAll() {
        List<UserAccount> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{userId}/suspend")
    public ResponseEntity<?> suspendUser(@PathVariable Long userId) {
        userService.suspendUser(userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{userId}/activate")
    public ResponseEntity<?> activateUser(@PathVariable Long userId) {
        userService.activateUser(userId);
        return ResponseEntity.noContent().build();
    }

}

package com.example.back_end.controllers;

import com.example.back_end.models.TestRide;
import com.example.back_end.repositories.TestRideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test-ride")
public class TestRideController {

    private final TestRideRepository testRideRepository;

    @GetMapping
    public ResponseEntity<List<TestRide>> getAll() {
        return ResponseEntity.ok(testRideRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody TestRide testRide) {
        return ResponseEntity.ok(testRideRepository.save(testRide));
    }


}

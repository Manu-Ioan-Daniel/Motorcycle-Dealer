package com.example.back_end.controllers;

import com.example.back_end.models.MotorcycleListing;
import com.example.back_end.services.MotorcycleListingService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/catalog")
@RequiredArgsConstructor
public class CatalogController {

    private final MotorcycleListingService motorcycleListingService;

    @GetMapping("/bikes")
    public ResponseEntity<@NonNull List<MotorcycleListing>> getAllBikes() {
        return ResponseEntity.ok(motorcycleListingService.findAll());
    }
}
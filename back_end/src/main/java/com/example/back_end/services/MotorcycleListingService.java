package com.example.back_end.services;

import com.example.back_end.models.MotorcycleListing;
import com.example.back_end.repositories.MotorcycleListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MotorcycleListingService {

    private final MotorcycleListingRepository motorcycleListingRepository;

    public List<MotorcycleListing> findAll() {
        return motorcycleListingRepository.findAll();
    }

}

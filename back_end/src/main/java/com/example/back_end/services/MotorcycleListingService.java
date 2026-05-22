package com.example.back_end.services;

import com.example.back_end.models.MotorcycleListing;
import com.example.back_end.repositories.MotorcycleListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MotorcycleListingService {

    private final MotorcycleListingRepository motorcycleListingRepository;

    public List<MotorcycleListing> findAll() {
        return motorcycleListingRepository.findAll();
    }

    public Optional<MotorcycleListing> findById(Long id) {
        return motorcycleListingRepository.findById(id);
    }

    public void addListing(MotorcycleListing motorcycleListing) {
        motorcycleListingRepository.save(motorcycleListing);
    }
}

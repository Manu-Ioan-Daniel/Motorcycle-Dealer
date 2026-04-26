package com.example.back_end.repositories;

import com.example.back_end.models.MotorcycleListing;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MotorcycleListingRepository extends JpaRepository<@NonNull MotorcycleListing, @NonNull Long> {

}

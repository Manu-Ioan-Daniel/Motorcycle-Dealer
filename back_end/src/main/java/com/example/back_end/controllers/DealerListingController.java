package com.example.back_end.controllers;

import com.example.back_end.models.DealerListing;
import com.example.back_end.models.DealerListingId;
import com.example.back_end.repositories.DealerListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/dealer-listings")
@RequiredArgsConstructor
public class DealerListingController {

    private final DealerListingRepository dealerListingRepository;

    @GetMapping
    public ResponseEntity<List<DealerListing>> findAll() {
        List<DealerListing> listings = dealerListingRepository.findAll();
        return ResponseEntity.ok(listings);
    }

    @GetMapping("/{dealerId}")
    public ResponseEntity<List<DealerListing>> findByDealerId(@PathVariable Long dealerId) {
        List<DealerListing> listings = dealerListingRepository.findByIdDealerId(dealerId);
        return ResponseEntity.ok(listings);
    }

    @PostMapping
    public ResponseEntity<DealerListing> save(@RequestBody DealerListingId dealerListingId) {
        DealerListing dealerListing = new DealerListing();
        dealerListing.setId(dealerListingId);
        DealerListing saved = dealerListingRepository.save(dealerListing);
        return ResponseEntity.ok(saved);
    }

}


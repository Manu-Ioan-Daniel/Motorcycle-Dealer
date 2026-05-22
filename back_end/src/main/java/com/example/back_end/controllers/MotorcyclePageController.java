package com.example.back_end.controllers;


import com.example.back_end.dtos.PurchaseRequest;
import com.example.back_end.models.MotorcycleListing;
import com.example.back_end.models.PurchaseInquiry;
import com.example.back_end.services.InquiryService;
import com.example.back_end.services.MotorcycleListingService;
import com.example.back_end.services.WishlistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/motorcycle")
@RequiredArgsConstructor
public class MotorcyclePageController {

    private final WishlistService wishlistService;
    private final InquiryService inquiryService;
    private final MotorcycleListingService motorcycleListingService;


    @DeleteMapping("/{listingId}/wishlist/{userId}")
    public ResponseEntity<?> deleteWishlistItem(@PathVariable Long userId, @PathVariable Long listingId) {
        wishlistService.deleteWishlistItem(userId, listingId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{listingId}/wishlist/{userId}")
    public ResponseEntity<?> addWishlistItem(@PathVariable Long userId, @PathVariable Long listingId) {
        wishlistService.addWishlistItem(userId, listingId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{listingId}/wishlist/{userId}")
    public ResponseEntity<Boolean> isInWishlist(@PathVariable Long userId, @PathVariable Long listingId) {
        boolean inWishlist = wishlistService.isInWishlist(userId, listingId);
        return ResponseEntity.ok(inWishlist);
    }

    @PostMapping("/{listingId}/purchase-inquiry")
    public ResponseEntity<?> sendPurchaseInquiry(@PathVariable Long listingId, @RequestBody @Valid PurchaseRequest request, @AuthenticationPrincipal Jwt jwt) {
        Long userId = Long.parseLong(jwt.getSubject());
        inquiryService.addInquiry(userId, listingId, request);
        return ResponseEntity.ok("Purchase inquiry sent successfully");
    }

    @DeleteMapping("/{listingId}/purchase-inquiry/{inquiryId}")
    public ResponseEntity<?> deletePurchaseInquiry(@PathVariable Long inquiryId) {
        inquiryService.deleteInquiry(inquiryId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{listingId}")
    public ResponseEntity<MotorcycleListing> getMotorcycleDetails(@PathVariable Long listingId) {
        return ResponseEntity.ok(motorcycleListingService.findById(listingId).orElseThrow());
    }

    @GetMapping("/purchase-inquiries")
    public ResponseEntity<List<PurchaseInquiry>> getUserInquiries() {
        return ResponseEntity.ok(inquiryService.findAll());
    }

    @PostMapping("/listings")
    public ResponseEntity<?> addListing(@RequestBody @Valid MotorcycleListing listing) {
        motorcycleListingService.addListing(listing);
        return ResponseEntity.ok("Listing created successfully");
    }

}

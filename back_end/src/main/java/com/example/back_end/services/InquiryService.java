package com.example.back_end.services;


import com.example.back_end.dtos.PurchaseRequest;
import com.example.back_end.models.PurchaseInquiry;
import com.example.back_end.repositories.PurchaseInquiriesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InquiryService {

    private final PurchaseInquiriesRepository purchaseInquiriesRepository;

    public void deleteInquiry(Long inquiryId) {
        purchaseInquiriesRepository.deleteById(inquiryId);
    }

    public void addInquiry(Long userId, Long listingId, PurchaseRequest purchaseRequest) {
        PurchaseInquiry purchaseInquiry = new PurchaseInquiry();
        purchaseInquiry.setUserId(userId);
        purchaseInquiry.setMotorcycleListingId(listingId);
        purchaseInquiry.setFullName(purchaseRequest.getFullName());
        purchaseInquiry.setEmail(purchaseRequest.getEmail());
        purchaseInquiry.setPhoneNumber(purchaseRequest.getPhoneNumber());
        purchaseInquiry.setAddress(purchaseRequest.getAddress());
        purchaseInquiry.setMessage(purchaseRequest.getMessage());
        purchaseInquiriesRepository.save(purchaseInquiry);
    }

    public List<PurchaseInquiry> findAll(){
        return purchaseInquiriesRepository.findAll();
    }

}

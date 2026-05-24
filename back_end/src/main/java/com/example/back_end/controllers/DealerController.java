package com.example.back_end.controllers;

import com.example.back_end.dtos.DealerRequest;
import com.example.back_end.enums.DealerStatus;
import com.example.back_end.repositories.DealerRepository;
import com.example.back_end.repositories.DealerRequestRepository;
import com.example.back_end.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dealers")
@RequiredArgsConstructor
public class DealerController {

    private final DealerRequestRepository dealerRequestRepository;
    private final DealerRepository dealerRepository;
    private final UserRepository userRepository;

    @PostMapping("/request")
    public ResponseEntity<?> requestDealer(@RequestBody DealerRequest dealerRequest) {
        DealerRequest savedRequest = dealerRequestRepository.save(dealerRequest);
        return ResponseEntity.ok(savedRequest);
    }

    @GetMapping("/requests")
    public ResponseEntity<?> getAllDealerRequests() {
        return ResponseEntity.ok(dealerRequestRepository.findAll());
    }


    @PutMapping("/requests/{id}")
    public ResponseEntity<?> updateDealerRequestStatus(@PathVariable Integer id, @RequestParam String status) {
        DealerRequest request = dealerRequestRepository.findById(id).orElseThrow();
        DealerStatus eStatus = DealerStatus.valueOf(status);
        request.setRequestStatus(eStatus);
        if(eStatus.equals(DealerStatus.APPROVED)){
            dealerRepository.insertDealer(
                    request.getUserId(),
                    request.getTaxId(),
                    request.getAddress(),
                    DealerStatus.APPROVED.name()
            );
            userRepository.deleteById(request.getUserId());
        }
        DealerRequest updatedRequest = dealerRequestRepository.save(request);
        return ResponseEntity.ok(updatedRequest);
    }

}

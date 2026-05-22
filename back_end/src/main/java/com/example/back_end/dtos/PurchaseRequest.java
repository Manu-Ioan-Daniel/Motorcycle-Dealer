package com.example.back_end.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PurchaseRequest {

    @NotBlank
    private String fullName;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String address;

    private String message;
}

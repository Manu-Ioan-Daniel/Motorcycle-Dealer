package com.example.back_end.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "purchase_inquiries")
@NoArgsConstructor
@Getter
@Setter
public class PurchaseInquiry extends BaseEntity {

    @Column(nullable = false, name = "user_id")
    private Long userId;

    @Column(nullable = false, name = "motorcycle_listing_id")
    private Long motorcycleListingId;

    @Column(nullable = false, name = "full_name")
    private String fullName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, name = "phone_number")
    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    @Column
    private String message;

}

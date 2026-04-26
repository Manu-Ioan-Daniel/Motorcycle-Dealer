package com.example.back_end.models;

import com.example.back_end.enums.ListingStatus;
import com.example.back_end.enums.MotorcycleType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "motorcycle_listings")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MotorcycleListing extends BaseEntity {

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer mileage;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private Integer stockQty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ListingStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MotorcycleType type;

}

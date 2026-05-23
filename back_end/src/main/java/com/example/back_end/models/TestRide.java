package com.example.back_end.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TestRide extends BaseEntity{

    @Column(nullable = false, name = "user_id")
    private Long userId;

    @Column(nullable = false, name = "motorcycle_listing_id")
    private Long motorcycleListingId;

    @Column(nullable = false, name = "scheduled_date")
    private LocalDateTime scheduledDate;
}

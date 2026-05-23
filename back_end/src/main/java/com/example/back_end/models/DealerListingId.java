package com.example.back_end.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DealerListingId implements Serializable {

    @Column(name = "dealer_id")
    private Long dealerId;

    @Column(name = "motorcycle_listing_id")
    private Long motorcycleListingId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DealerListingId that)) return false;
        return Objects.equals(dealerId, that.dealerId) &&
                Objects.equals(motorcycleListingId, that.motorcycleListingId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dealerId, motorcycleListingId);
    }
}


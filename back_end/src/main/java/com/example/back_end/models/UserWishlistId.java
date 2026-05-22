package com.example.back_end.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class UserWishlistId implements Serializable {

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "motorcycle_listing_id")
    private Long motorcycleId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserWishlistId)) return false;
        UserWishlistId that = (UserWishlistId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(motorcycleId, that.motorcycleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, motorcycleId);
    }
}
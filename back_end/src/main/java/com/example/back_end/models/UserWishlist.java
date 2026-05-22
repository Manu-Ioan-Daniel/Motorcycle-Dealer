package com.example.back_end.models;

import jakarta.persistence.*;
import lombok.Setter;

@Entity
@Table(name = "user_wishlists")
@Setter
public class UserWishlist {

    @EmbeddedId
    private UserWishlistId id;
}
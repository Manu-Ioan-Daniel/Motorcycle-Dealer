package com.example.back_end.repositories;

import com.example.back_end.models.UserWishlist;
import com.example.back_end.models.UserWishlistId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserWishlistRepository extends JpaRepository<UserWishlist, UserWishlistId> {

}
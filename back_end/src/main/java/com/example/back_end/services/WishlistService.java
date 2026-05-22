package com.example.back_end.services;


import com.example.back_end.models.UserWishlist;
import com.example.back_end.models.UserWishlistId;
import com.example.back_end.repositories.UserWishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class WishlistService {

    private final UserWishlistRepository userWishlistRepository;

    public void deleteWishlistItem(Long userId, Long listingId) {
        userWishlistRepository.deleteById(new UserWishlistId(userId, listingId));
    }

    public void addWishlistItem(Long userId, Long listingId) {
        UserWishlist wishlistItem = new UserWishlist();
        wishlistItem.setId(new UserWishlistId(userId, listingId));
        userWishlistRepository.save(wishlistItem);
    }

    public boolean isInWishlist(Long userId, Long listingId) {
        return userWishlistRepository.existsById(new UserWishlistId(userId, listingId));
    }
}

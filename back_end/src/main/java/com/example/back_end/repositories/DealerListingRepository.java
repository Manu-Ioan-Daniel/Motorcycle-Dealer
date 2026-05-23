package com.example.back_end.repositories;

import com.example.back_end.models.DealerListing;
import com.example.back_end.models.DealerListingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DealerListingRepository extends JpaRepository<DealerListing, DealerListingId> {

    List<DealerListing> findByIdDealerId(Long dealerId);
}


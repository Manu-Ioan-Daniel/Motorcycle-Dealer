package com.example.back_end.repositories;

import com.example.back_end.models.Dealer;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface DealerRepository extends JpaRepository<Dealer, Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO dealers (id, tax_id, address, dealer_status) VALUES (:id, :taxId, :address, :dealerStatus)", nativeQuery = true)
    void insertDealer(@Param("id") Long id,
                      @Param("taxId") String taxId,
                      @Param("address") String address,
                      @Param("dealerStatus") String dealerStatus);
}
